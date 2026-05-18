'use client';
import React from 'react';
import Image from 'next/image';
import img1 from '@/public/lead frontend.jpg'
import img2 from '@/public/lead full stack.jpg'
import { Header } from "@/components/header";

const teamMembers = [
  {
    name: 'Ismaheel Abdulmaleeq',
    title: 'Founder & CEO',
    image: '/ceo.jpg', // Replace with your actual image path
    bio: 'Visionary behind TrustPadi, passionate about digital safety and community empowerment.',
  },
  {
    name: 'Yahya Godiwa',
    title: 'Lead Fullstack Engineer',
    image: img2,
    bio: 'Leads both backend and frontend architecture with a focus on scalable, innovative platform solutions.',
  },
  {
    name: 'Abdulkadir Ridwan',
    title: 'Lead Frontend Engineer',
    image: img1,
    bio: 'Specializes in crafting seamless user experiences and leading frontend development initiatives.',
  },
  {
    name: 'Mukhtar Oladipo Ayinla',
    title: 'Product Manager',
    image: '/ayinla.jpg',
    bio: 'Product Manager and Customer Relations Specialist',
  },
];

const Team = () => {
  return (
    <>
    <Header />
    <section className="w-full bg-white dark:bg-gray-900 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-300 mb-6">
          Meet the Team
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          Our dedicated team is on a mission to combat scams and protect individuals through technology, research, and community outreach.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  />
              </div>
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">{member.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{member.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Team;
