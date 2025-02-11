'use client'

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';import type { Metadata } from 'next'
 
// either Static metadata
export const metadata: Metadata = {
  title: 'Contact Me Page',
}

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e :any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
  
    // Safely parse localStorage value with a fallback
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push(formData);
    localStorage.setItem('messages', JSON.stringify(messages));
  
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };
  return (
    <div className="flex justify-center items-center mt-10 p-10  min-h-screen">
      <Card className="w-full max-w-md shadow-2xl rounded-xl bg-glassmorphism ">
    <CardContent>
      <h1 className="text-3xl font-semibold mb-6 text-center mt-5">Contact Us</h1>
      
      {submitted && (
        <div className="p-4 mb-6 text-green-600 bg-green-100 rounded-lg text-sm font-medium">
          Thank you! Your message has been sent.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message"
            rows={5}
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button
          type="submit"
          className="w-full p-3  font-semibold rounded-lg duration-200"
        >
          Submit
        </Button>
      </form>
    </CardContent>
      </Card>
</div>

  );
};

export default ContactPage;