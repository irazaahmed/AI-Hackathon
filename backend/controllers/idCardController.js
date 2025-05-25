const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Asset paths
const logoPath = path.join(__dirname, '../assets/smit-logo.png');
// const defaultPhotoPath = path.join(__dirname, '../assets/default-photo.png');

const generateIDCardPDF = async (user) => {
    return new Promise(async (resolve, reject) => {
        const doc = new PDFDocument({ size: [350, 200], margin: 10 });
        const buffers = [];

        try {
            const qrCode = await QRCode.toDataURL(user.idNumber || user._id.toString());
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));

            // Background
            doc.rect(0, 0, 350, 200).fill('#ffffff');

            // Left: Logo
            doc.image(logoPath, 15, 10, { width: 80 });


            // Right Side Info
            const rightStart = 110;
            doc.font('Helvetica-Bold').fontSize(10).fillColor('black');
            doc.text(`Name: ${user.fullName}`, rightStart, 20);
            doc.font('Helvetica').fontSize(9);
            doc.text(`Program: ${user.course}`, rightStart, 40);
            doc.text(`ID: ${user.idNumber}`, rightStart, 80);
            doc.text(`CNIC: ${user.cnic}`, rightStart, 60);
            doc.text(`Email: ${user.email}`, rightStart, 100);
            doc.text(`Phone: ${user.phone}`, rightStart, 120);
            doc.text(`Address: ${user.address}`, rightStart, 140);

            // QR Code
            doc.image(qrCode, 20, 100, { width: 70 });

            // Footer Note
            doc.fontSize(6).fillColor('#555').text(
                'Note: This card is for SMIT premises only. If found, please return to SMIT.',
                20, 180
            );

        

            doc.end();
        } catch (err) {
            reject(err);
        }
    });
};

// Send email
const sendIDCardEmail = async (user, pdfBuffer) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hafizahmedraza12345@gmail.com',
            pass: 'rnua cflk wrgc phft'
        }
    });

    const mailOptions = {
        from: 'Saylani SMIT <hafizahmedraza12345@gmail.com>',
        to: user.email,
        subject: 'Your Saylani ID Card',
        text: `Dear ${user.fullName},\n\nAttached is your official SMIT ID card.\n\nRegards,\nSaylani Team`,
        attachments: [{
            filename: 'SMIT-IDCard.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf'
        }]
    };

    await transporter.sendMail(mailOptions);
};

// Main function
exports.generateAndSendIDCard = async (user) => {
    const pdfBuffer = await generateIDCardPDF(user);
    await sendIDCardEmail(user, pdfBuffer);
};
