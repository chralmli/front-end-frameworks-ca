import React, { useState } from 'react'
import styled from 'styled-components';

const FormContainer = styled.div`
    background-color: ${(props) => props.theme.colors.background};
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 20px auto;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.text};
`;

const Input = styled.input`
padding: 10px;
margin-bottom: 15px;
border: 1px solid #ddd;
border-radius: 5px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    height: 150px;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px;

    &:hover {
        background-color: #f93946;
    }
`;

const ErrorMessage = styled.p`
    color: ${(props) => props.theme.colors.primary};
    font-size: 14px;
    margin: 5px 0 15px;
`;


const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        subject: '',
        email: '',
        body: ''
    });

    const [errors, setErrors] = useState({
        fullName: '',
        subject: '',
        email: '',
        body: ''
    });

    const validateForm = () => {
        const newErrors = { fullName: '', subject: '', email: '', body: '' };
        let isValid = true;

        // Full name validation
        if (formData.fullName.trim().length < 3) {
            newErrors.fullName = 'Full name must be at least 3 characters long';
            isValid = false;
        }

        // Subject validation
        if (formData.subject.trim().length < 3) {
            newErrors.subject = 'Subject must be at least 3 characters long';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Body validation
        if (formData.body.trim().length < 3) {
            newErrors.body = 'Message must be at least 3 characters long';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(validateForm()) {
            alert('Form submitted successfully');

            // Reset form data and errors after successful submission
            setFormData({ fullName: '', subject: '', email: '', body: '' });
            setErrors({ fullName: '', subject: '', email: '', body: '' });
        }
    };

    return (
        <FormContainer>
            <h1>Contact Us</h1>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="fullName">Full Name:</Label>
                <Input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}

                <Label htmlFor="subject">Subject:</Label>
                <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} />
                {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}

                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

                <Label htmlFor="body">Message:</Label>
                <TextArea id="body" name="body" rows={5} value={formData.body} onChange={handleInputChange} />
                {errors.body && <ErrorMessage>{errors.body}</ErrorMessage>}

                <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
        </FormContainer>
    );
};

export default ContactPage;