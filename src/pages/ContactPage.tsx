import React, { useState } from 'react'

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        subject: '',
        email: '',
        body: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />

            <label>Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />

            <label>Body</label>
            <textarea name="body" value={formData.body} onChange={handleInputChange} />

            <button type="submit">Submit</button>
        </form>
    );
};

export default ContactPage;