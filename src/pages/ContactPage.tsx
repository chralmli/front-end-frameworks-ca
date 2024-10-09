import React, { useState } from 'react'
import styled from 'styled-components';

const FormContainer = styled.div`
    background-color: ${(props) => props.theme.colors.background};
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 20px auto;
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
    background-color: ${(props) => props.theme.colors.secondary};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px;

    &:hover {
        background-color: #E95C2A;
    }
`;

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
        <FormContainer>
            <h1>Contact Us</h1>
            <Form>
                <Label htmlFor="fullName">Full Name:</Label>
                <Input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                <Label htmlFor="subject">Subject:</Label>
                <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required />
                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                <Label htmlFor="body">Message:</Label>
                <TextArea id="body" name="body" value={formData.body} onChange={handleInputChange} required />

                <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
        </FormContainer>
    );
};

export default ContactPage;