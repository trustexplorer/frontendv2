'use client';
import React from 'react';
import { Header } from "@/components/header";
import { FaExclamationTriangle, FaSearchDollar, FaGraduationCap } from 'react-icons/fa';

const ScamEducation = () => {
  return (
    <>
    <Header />
    <section className="bg-white dark:bg-gray-900 py-20 px-6 text-gray-800 dark:text-gray-100 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-blue-700 dark:text-blue-300">
          Scam Education & Awareness
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-16 text-gray-600 dark:text-gray-300">
          Knowledge is your greatest defense. Learn to identify, avoid, and report scams with actionable guidance from TrustPadi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Recognize Scams */}
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 dark:bg-red-900 rounded-full mb-6">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Recognize Scams</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Learn how to identify common tactics used by scammers — including phishing, fake investment offers, and impersonation.
            </p>
          </div>

          {/* Prevent Financial Loss */}
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full mb-6">
              <FaSearchDollar className="text-green-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Prevent Financial Loss</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Get practical tips to protect your bank accounts, digital wallets, and personal identity from fraud attempts.
            </p>
          </div>

          {/* Continuous Learning */}
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
              <FaGraduationCap className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Stay Updated</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Access real stories, expert insights, and scam alerts to stay ahead of evolving threats in the digital world.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ScamEducation;
