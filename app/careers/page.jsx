'use client';
import { Briefcase, Users, Lightbulb } from 'lucide-react';
import { Header } from "@/components/header";

const jobOpenings = [
  {
    title: 'Frontend Developer',
    location: 'Remote - Nigeria',
    type: 'Full-time',
    icon: <Lightbulb className="text-blue-600 dark:text-blue-300 w-6 h-6" />,
    description: 'Build intuitive and responsive UI for our scam education platform using React and Tailwind CSS.',
  },
  {
    title: 'Content Researcher',
    location: 'Remote - Africa',
    type: 'Part-time',
    icon: <Users className="text-blue-600 dark:text-blue-300 w-6 h-6" />,
    description: 'Help create and verify accurate scam-related articles, guides, and educational material.',
  },
  {
    title: 'Cybersecurity Intern',
    location: 'Hybrid - Ilorin, Nigeria',
    type: 'Internship',
    icon: <Briefcase className="text-blue-600 dark:text-blue-300 w-6 h-6" />,
    description: 'Work alongside experts to investigate scam trends and protect community data.',
  },
];

const Careers = () => {
  return (
    <>
    <Header />
    <section className="w-full bg-white dark:bg-gray-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 dark:text-blue-300 mb-4">
          Join the TrustPadi Team
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto mb-12">
          We&apos;re on a mission to make the internet safer by exposing scams and empowering users. Join our team and help
          shape the future of digital trust.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {jobOpenings.map((job, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  {job.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">{job.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {job.location} • {job.type}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{job.description}</p>
              <button className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400">
            Don’t see a role that fits?{' '}
            <a href="mailto:trustpadi@gmail.com" className="text-blue-600 dark:text-blue-300 underline">
              Send us your resume
            </a>{' '}
            and let us know how you can help.
          </p>
        </div>
      </div>
    </section>
    </>
  );
};

export default Careers;
