'use client';
import React from 'react';
import { Header } from "@/components/header";
import { FaBug, FaUserShield, FaChartLine } from 'react-icons/fa';

const ScamStatistics = () => {
  return (
    <>
    <Header />
    <section className="bg-white dark:bg-gray-900 py-20 px-6 text-gray-800 dark:text-gray-100 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-blue-700 dark:text-blue-300">
          Scam Statistics
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-16 text-gray-600 dark:text-gray-300">
          A snapshot of online scam activity to help raise awareness and encourage action.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Total Reported Scams */}
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 dark:bg-red-900 rounded-full mb-6">
              <FaBug className="text-red-500 text-3xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">18,245+</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Total scams reported on TrustPadi</p>
          </div>

          {/* Users Protected */}
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full mb-6">
              <FaUserShield className="text-green-600 text-3xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">7,950+</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Users educated and protected</p>
          </div>

          {/* Monthly Scam Increase */}
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-900 rounded-full mb-6">
              <FaChartLine className="text-yellow-500 text-3xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">+12%</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Rise in reported scams this month</p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ScamStatistics;
