const FAQ = require('../models/FAQSchema');

exports.addFAQ = async (req, res) => {
    try {
        const newFAQ = new FAQ(req.body);
        await newFAQ.save();
        res.status(201).json({ message: 'FAQ added successfully', faq: newFAQ });
    } catch (error) {
        res.status(500).json({ message: 'Error adding FAQ', error });
    }
};

exports.getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching FAQs', error });
    }
};

