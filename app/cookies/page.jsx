'use client';
import React from 'react';

const CookiePolicy = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 text-gray-800 dark:text-gray-100 font-sans leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">Cookie Policy</h1>

      <p className="mb-6">
        This Cookie Policy explains how <strong>TrustPadi</strong> uses cookies and similar technologies to recognize
        you when you visit our website. It explains what these technologies are and why we use them, as well as your
        rights to control our use of them.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">1. What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small data files stored on your device (computer, tablet, smartphone) when you visit a website.
        They help us remember your preferences and improve your overall experience.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">2. Types of Cookies We Use</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Essential Cookies:</strong> Necessary for the website to function. They allow you to navigate and use
          features securely.
        </li>
        <li>
          <strong>Performance Cookies:</strong> Help us analyze how users interact with the site (e.g., Google Analytics)
          so we can improve functionality.
        </li>
        <li>
          <strong>Functional Cookies:</strong> Remember your preferences (e.g., dark mode or language selection).
        </li>
        <li>
          <strong>Targeting/Advertising Cookies:</strong> May be used in the future to show relevant ads or
          recommendations, based on your browsing behavior.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">3. Third-Party Cookies</h2>
      <p className="mb-4">
        Some cookies may be set by trusted third-party services we use for analytics, content delivery, or integrations
        (e.g., Google Analytics, YouTube embeds, or chatbot services).
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">4. How You Can Control Cookies</h2>
      <p className="mb-4">
        You have the right to accept or reject cookies. Most browsers allow you to manage your cookie preferences
        through their settings. Please note that disabling certain cookies may affect the functionality of the site.
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>
          To disable cookies, check your browser’s help section for instructions.
        </li>
        <li>
          You can opt-out of Google Analytics tracking by installing the{' '}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-300 underline"
          >
            Google Analytics Opt-Out Add-on
          </a>.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">5. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Cookie Policy from time to time to reflect changes in technology, law, or our services.
        Updates will be posted on this page with the Last Updated date.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">6. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about our use of cookies or this policy, please contact us at:{' '}
        <a href="/contact" className="text-blue-500 dark:text-blue-300 underline">
         trustpadi@gmail.com
        </a>.
      </p>

      <p className="mt-12 text-sm text-gray-500 dark:text-gray-400 text-center">
        Last updated: July 15, {new Date().getFullYear()} TrustPadi. All rights reserved.
      </p>
    </section>
  );
};

export default CookiePolicy;
