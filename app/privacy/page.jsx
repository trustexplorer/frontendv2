'use client';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 text-gray-800 dark:text-gray-100 font-sans leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">Privacy Policy</h1>

      <p className="mb-6">
        At <strong>TrustPadi</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we
        collect, use, store, and protect your information when you use our platform to report scams, access educational
        materials, or engage with the community.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">1. Information We Collect</h2>
      <p className="mb-4">We may collect the following types of information:</p>
      <ul className="list-disc list-inside mb-4">
        <li className="whitespace-normal">
            <span className='font-semibold'>Personal Information:</span> such as your name, email address, and contact details when you create an account or contact us.
        </li>
        <li><strong>Scam Reports:</strong> including details of incidents you report and any uploaded evidence.</li>
        <li><strong>Usage Data:</strong> such as pages visited, device information, and IP address for analytics and security.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">2. How We Use Your Information</h2>
      <p className="mb-4">We use the information we collect to:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Provide and improve our services</li>
        <li>Analyze and prevent scam trends</li>
        <li>Respond to user inquiries and reports</li>
        <li>Send notifications or updates, only with your consent</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">3. Data Sharing and Disclosure</h2>
      <p className="mb-4">We do not sell your personal data. We may share data with:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Law enforcement or regulatory bodies if required by law</li>
        <li>Third-party tools we use for analytics, hosting, or customer support (under confidentiality agreements)</li>
        <li>Community moderators or admins, only as needed to investigate reports</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">4. Data Security</h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your information, including encryption,
        authentication, and secure storage. However, no system is 100% secure, so we encourage safe online practices.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">5. Cookies & Tracking</h2>
      <p className="mb-4">
        We use cookies and similar technologies to personalize content, analyze usage, and enhance user experience.
        You may control cookies through your browser settings. For more details, refer to our{' '}
        <strong>Cookie Policy</strong>.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">6. Your Rights</h2>
      <p className="mb-4">Depending on your region, you may have rights to:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Access, update, or delete your personal data</li>
        <li>Withdraw consent for data use</li>
        <li>Request a copy of your data</li>
      </ul>
      <p className="mb-4">
        To exercise these rights, contact us at{' '}
        <a href="/contact" className="text-blue-500 dark:text-blue-300 underline">
           trustpadi@gmail.com
        </a>.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">7. Children’s Privacy</h2>
      <p className="mb-4">
        TrustPadi is not intended for children under 13. We do not knowingly collect personal information from children.
        If you believe we have, please contact us to have it removed.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">8. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy to reflect changes in law or our practices. Significant changes will be
        communicated via email or prominent notices on our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, reach out at{' '}
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

export default PrivacyPolicy;
