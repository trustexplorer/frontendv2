'use client';
import React from 'react';

const Disclaimer = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 text-gray-800 dark:text-gray-100 font-sans leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">Disclaimer</h1>

      <p className="mb-6">
        The information provided on <strong>TrustPadi</strong> is for general informational and educational purposes only.
        While we strive to keep all information accurate, trustworthy, and up-to-date, we make no guarantees or warranties of any kind.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">1. No Professional Advice</h2>
      <p className="mb-4">
        The content available on TrustPadi is not intended to replace legal, financial, cybersecurity, or professional advice.
        Always consult a qualified expert for your specific situation. We are not responsible for decisions you make based on the information shared here.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">2. User-Generated Content</h2>
      <p className="mb-4">
        Some content on our platform, including scam reports, comments, or shared experiences, is submitted by users.
        TrustPadi does not guarantee the accuracy, completeness, or authenticity of such submissions.
        We do moderate for quality, but cannot verify every claim.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">3. No Liability</h2>
      <p className="mb-4">
        Under no circumstances will TrustPadi, its creators, team members, or affiliates be liable for any direct, indirect, incidental,
        consequential, or punitive damages arising from your access to or use of the platform, including but not limited to reliance on any
        information provided.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">4. External Links</h2>
      <p className="mb-4">
        Our website may contain links to external websites for reference or resources.
        We are not responsible for the content, accuracy, or practices of third-party sites and encourage you to review their policies independently.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">5. Platform Changes</h2>
      <p className="mb-4">
        We reserve the right to modify or discontinue any aspect of the site at any time without prior notice.
        This includes altering, removing, or restricting features, content, or services.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">6. Acceptance of This Disclaimer</h2>
      <p className="mb-4">
        By using TrustPadi, you agree to this Disclaimer and our Terms of Service.
        If you do not agree, please refrain from using our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600 dark:text-blue-400">7. Contact Us</h2>
      <p className="mb-4">
        For questions regarding this disclaimer, reach out to us at:{' '}
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

export default Disclaimer;

