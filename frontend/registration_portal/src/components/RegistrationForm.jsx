import React, { useState } from 'react';
import { registerUser } from '../services/api'; // ✅ make sure this points to your backend

const SaylaniForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cnic: '',
    course: [],
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseChange = (e) => {
    const selectedCourses = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prev => ({
      ...prev,
      course: selectedCourses
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      alert('User registered successfully! Check email for ID card.');
      console.log(response.data);
    } catch (err) {
      alert('Registration failed. Check console for error.');
      console.error(err);
    }

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      cnic: '',
      course: [],
      address: '',
    });
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      padding: '0',
      margin: '0'
    },
    formWrapper: {
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'white',
      padding: '30px',
      marginTop: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderRadius: '8px'
    },
    formTitle: {
      textAlign: 'center',
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      margin: '0 0 10px 0'
    },
    formSubtitle: {
      textAlign: 'center',
      color: '#666',
      fontSize: '14px',
      marginBottom: '30px'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    fullWidth: {
      gridColumn: '1 / -1'
    },
    label: {
      fontSize: '14px',
      color: '#4A90E2',
      fontWeight: '500',
      marginTop: '10px'
    },
    formInput: {
      padding: '12px',
      border: '2px solid #7CB342',
      borderRadius: '4px',
      fontSize: '14px',
      outline: 'none',
      backgroundColor: 'white'
    },
    submitBtn: {
      backgroundColor: '#4A90E2',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '20px',
      width: '100%'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <img src="./headinglogo.jpg" alt="SMIT Logo" style={{ width: '200px', display: 'block', margin: '0 auto 20px' }} />
        <h1 style={styles.formTitle}>Registration Form - SMIT</h1>
        <p style={styles.formSubtitle}>Services - Education - Registration</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full name"
                style={styles.formInput}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                style={styles.formInput}
              />
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                style={styles.formInput}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>CNIC</label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleInputChange}
                placeholder="CNIC"
                style={styles.formInput}
              />
            </div>
          </div>

         <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
  <label style={styles.label}>Select course or event</label>
  <select
    name="course"
    value={formData.course}
    onChange={handleInputChange}
    style={styles.formInput}
  >
    <option value="" disabled hidden>Select a course</option>
    <option value="Web Development">Web Development</option>
    <option value="Mobile App Development">Mobile App Development</option>
    <option value="Generative AI and Chatbot">Generative AI and Chatbot</option>
    <option value="AI and Data Science">AI and Data Science</option>
    <option value="Python Programming">Python Programming</option>
    <option value="Graphic Design">Graphic Design</option>
  </select>
</div>


          <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
            <label style={styles.label}>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              style={styles.formInput}
            />
          </div>

          <button type="submit" style={styles.submitBtn}>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default SaylaniForm;
