

'use client';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "@/components/header";

const Forms = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  async function fetchApi(e) {
    e.preventDefault();
    setSending(true);
    try {
      const baseurl = 'https://forms-io.onrender.com/submit-form/e42cabb3-88fd-42e8-817b-9f7c2608d152';
      const response = await fetch(baseurl, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const resData = await response.json();
      setSending(false);
      toast.success('Message sent successfully');
      
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setSending(false);
      toast.error('Unable to send. Please check your internet connection.');
      
    }
  }

  return (
    <>
    <Header />
    <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-20 px-4" id="contact">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold font-mono">Contact Us</h2>
          <p className="text-lg mt-2">We&apos;d love to hear from you!</p>
        </div>

        <form onSubmit={fetchApi} method="post" className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 px-6 rounded-md w-full sm:w-auto"
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        <ToastContainer position="top-right" />
      </div>
    </section>
    </>
  );
};

export default Forms;
