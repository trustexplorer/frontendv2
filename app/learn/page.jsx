

'use client';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import React from 'react';
import { FaShieldAlt, FaLightbulb, FaHandsHelping } from 'react-icons/fa';

const Learn = () => {
  return (
    <>
   <Header />
    <section className="w-full py-20 px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-300 mb-6">
          About TrustPadi
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-700 dark:text-blue-100">
          At <strong>TrustPadi</strong>, we believe knowledge is the most powerful defense against scams.
          Our mission is to equip individuals and communities with the tools and insights needed to identify and prevent fraud.
        </p>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <FaShieldAlt className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Protect Yourself</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Scams are evolving. We offer timely alerts and smart tools to help you spot and stop suspicious activity.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <FaLightbulb className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Stay Informed</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our research team monitors scam trends and delivers actionable insights to keep you ahead of the curve.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <FaHandsHelping className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Community Support</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Join a community of vigilant users who share tips, stories, and support to build a safer digital world.
            </p>
          </div>
        </div>

        {/* Mission Box */}
        <div className="bg-blue-700 dark:bg-blue-600 text-white rounded-xl p-10 shadow-lg max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
          <p className="text-lg leading-relaxed">
            We aim to reduce the impact of online scams by spreading awareness, encouraging reporting, and providing trusted resources for digital safety.
          </p>
        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} TrustPadi. All rights reserved.
        </p>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Learn;

