'use client';
import React from 'react';

const TermsOfService = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 text-gray-800 dark:text-gray-100 font-sans leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">Terms of Service</h1>

      <p className="mb-6">
        Welcome to <strong>TrustPadi</strong>. These Terms of Service (“Terms”) govern your access to and use of our
        website, services, content, and technology solutions designed to report, prevent, and educate users about online
        scams. By using our platform, you agree to be bound by these Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing or using TrustPadi, you confirm that you are at least 13 years old and agree to these Terms. If you
        do not agree, you may not use the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">2. Platform Purpose</h2>
      <p className="mb-4">TrustPadi is intended to:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Provide education and awareness about common scams</li>
        <li>Enable users to report scams and suspicious behavior</li>
        <li>Promote safer online practices through community support</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">3. User Responsibilities</h2>
      <p className="mb-4">You agree to use TrustPadi responsibly and ethically. You must not:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Submit false or malicious scam reports</li>
        <li>Violate the privacy or rights of others</li>
        <li>Upload harmful, illegal, or offensive content</li>
      </ul>
      <p className="mb-4">
        You are solely responsible for the content you submit, including reports, comments, and uploads.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">4. Content Ownership</h2>
      <p className="mb-4">
        All content on TrustPadi (excluding user-submitted reports) is the intellectual property of TrustPadi and may
        not be copied, distributed, or modified without permission.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">5. Reporting and Moderation</h2>
      <p className="mb-4">
        To maintain integrity and trust, all scam reports submitted are subject to moderation. We reserve the right to
        remove any content that violates these Terms or is deemed harmful, false, or inappropriate.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">6. Limitation of Liability</h2>
      <p className="mb-4">
        TrustPadi provides educational information and tools on an “as-is” basis. We do not guarantee the accuracy or
        outcomes of information shared on our platform. We are not liable for any loss, damage, or harm resulting from
        your use of our services.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">7. Privacy & Data</h2>
      <p className="mb-4">
        We value your privacy. Please review our <strong>Privacy Policy</strong> for details on how we collect, use,
        and protect your data.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">8. Account Termination</h2>
      <p className="mb-4">
        We may suspend or terminate your access to the platform if you violate these Terms or engage in abusive,
        fraudulent, or harmful behavior.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">9. Updates to Terms</h2>
      <p className="mb-4">
        We may revise these Terms periodically. Continued use of TrustPadi after any changes constitutes your acceptance
        of the updated Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">10. Contact</h2>
      <p className="mb-4">
        For questions or concerns about these Terms, please contact us at{' '}
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

export default TermsOfService;
