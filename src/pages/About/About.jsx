import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Code, Users, BookOpen, Target } from 'lucide-react';
import teacherImg from '../../assets/images/teacher.png';
import SEO from '../../components/SEO';
import buetLogo from '../../assets/images/buet_logo.png';

const skillsData = [
  { category: 'Problem Solving', skills: ['Competitive Programming', 'Data Structures', 'Algorithms', 'System Design'] },
  { category: 'Web Development', skills: ['React', 'Node.js', 'JavaScript', 'Tailwind CSS', 'Firebase', 'MongoDB'] },
  { category: 'Teaching & Mentoring', skills: ['Course Creation', 'Student Mentoring', 'Content Development', 'Technical Writing'] },
  { category: 'Other Skills', skills: ['Git', 'Rest APIs', 'Database Design', 'Teamwork', 'Communication'] },
];

const educationData = [
  {
    degree: 'B.Sc. in Computer Science & Engineering',
    institution: 'Bangladesh University of Engineering & Technology (BUET)',
    duration: 'Ongoing',
    logo: buetLogo,
    details: ['Focused on competitive programming', 'Full-stack web development', 'Software architecture & design patterns'],
    color: 'from-blue-900 to-blue-700',
  },
];

const experienceData = [
  {
    title: 'Instructor',
    organization: 'Radiance & Biopark',
    duration: '2023 - Present',
    icon: BookOpen,
    details: ['Teach programming and web development', 'Mentor students in problem-solving', 'Develop curriculum and learning materials'],
    color: 'from-green-900 to-green-700',
  },
  {
    title: 'Executive Member',
    organization: 'Radiance',
    duration: '2023 - Present',
    icon: Users,
    details: ['Lead technical initiatives', 'Organize workshops and events', 'Community engagement and outreach'],
    color: 'from-purple-900 to-purple-700',
  },
];

const StatCard = ({ icon: Icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-blue-900/80 to-blue-700/80 dark:from-blue-100/50 dark:to-blue-200/50 rounded-xl p-6 text-center border border-blue-700 dark:border-blue-300"
  >
    <Icon className="mx-auto mb-3 text-blue-400 dark:text-blue-600" size={28} />
    <div className="text-2xl font-bold text-white dark:text-black">{value}</div>
    <div className="text-sm text-gray-400 dark:text-gray-700">{label}</div>
  </motion.div>
);

export default function About() {
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <div className="relative min-h-screen w-full py-16 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-gray-100 via-white dark:to-gray-100">
      <SEO title="About — Abir Hossen Abdullah" description="About Abir Hossen Abdullah — Competitive Programmer, Web Developer, and Educator. Learn about background, education, and skills." url="https://abirabdullah.web.app/about" />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#1e3a8a33,_transparent),radial-gradient(circle_at_bottom_right,_#9333ea22,_transparent)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 mb-4">
            About Me
          </h1>
          <p className="text-gray-400 dark:text-gray-600 text-lg max-w-2xl mx-auto">
            Passionate about technology, education, and creating meaningful solutions
          </p>
        </motion.div>

        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 dark:from-white/50 dark:to-gray-100/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 mb-12 border border-gray-700 dark:border-gray-300 flex flex-col md:flex-row gap-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <img
              src={teacherImg}
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full shadow-2xl border-4 border-blue-500 dark:border-blue-400"
            />
          </motion.div>

          <div className="flex-1 flex flex-col justify-center text-gray-300 dark:text-gray-800">
            <h2 className="text-3xl font-bold text-blue-400 dark:text-blue-600 mb-4">Abir Hossen Abdullah</h2>
            <p className="leading-relaxed mb-4 text-justify">
              I am a passionate <span className="font-semibold text-blue-300 dark:text-blue-600">Competitive Programmer, Full-Stack Web Developer, and Educator</span> dedicated to solving complex problems and inspiring the next generation of tech enthusiasts. My journey began with a curiosity about how things work, which evolved into a career driven by continuous learning and meaningful contributions.
            </p>
            <p className="leading-relaxed mb-4 text-justify">
              Currently studying <span className="font-semibold text-blue-300 dark:text-blue-600">Computer Science & Engineering at BUET</span>, I combine theoretical knowledge with practical application. My expertise spans competitive programming, web development, and technical mentoring. I believe in the power of education to transform lives and am committed to making complex concepts accessible and engaging.
            </p>
            <p className="leading-relaxed text-justify">
              Beyond code, I value integrity, teamwork, and continuous growth. Whether architecting scalable applications, mentoring students, or competing on platforms like Codeforces and LeetCode, I strive to maintain excellence and contribute positively to the tech community.
            </p>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <StatCard icon={Code} label="Years of Coding" value="5+" />
          <StatCard icon={BookOpen} label="Students Mentored" value="100+" />
          <StatCard icon={Target} label="Problems Solved" value="800+" />
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 mb-6 flex items-center gap-2">
            <BookOpen size={32} />
            Education
          </h2>
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className={`bg-gradient-to-r ${edu.color} dark:from-blue-100/50 dark:to-blue-200/50 rounded-xl p-6 md:p-8 mb-4 border border-gray-700 dark:border-gray-300 flex items-start gap-6`}
            >
              <img src={edu.logo} alt={edu.institution} className="h-16 w-16 rounded-lg shadow-lg flex-shrink-0" />
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-bold text-white dark:text-black">{edu.degree}</h3>
                  <span className="text-sm text-gray-300 dark:text-gray-700 bg-black/30 dark:bg-white/30 px-3 py-1 rounded-full mt-2 md:mt-0">
                    {edu.duration}
                  </span>
                </div>
                <p className="text-blue-200 dark:text-blue-700 font-medium mb-3">{edu.institution}</p>
                <ul className="space-y-1">
                  {edu.details.map((detail, i) => (
                    <li key={i} className="text-gray-300 dark:text-gray-800 flex items-center gap-2">
                      <span className="text-blue-300 dark:text-blue-600">▸</span> {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 dark:from-green-600 dark:to-blue-600 mb-6 flex items-center gap-2">
            <Briefcase size={32} />
            Experience & Roles
          </h2>
          <div className="space-y-4">
            {experienceData.map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                  className={`bg-gradient-to-r ${exp.color} dark:from-opacity-50 dark:to-opacity-50 rounded-xl p-6 md:p-8 border border-gray-700 dark:border-gray-300 cursor-pointer transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <Icon className="text-white dark:text-black flex-shrink-0 mt-1" size={28} />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                        <h3 className="text-xl font-bold text-white dark:text-black">{exp.title}</h3>
                        <span className="text-sm text-gray-300 dark:text-gray-800 bg-black/30 dark:bg-white/30 px-3 py-1 rounded-full mt-2 md:mt-0">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-gray-200 dark:text-gray-900 font-medium mb-2">{exp.organization}</p>
                      {expandedSection === idx && (
                        <motion.ul className="space-y-1 mt-3">
                          {exp.details.map((detail, i) => (
                            <li key={i} className="text-gray-300 dark:text-gray-800 flex items-center gap-2 text-sm">
                              <span className="text-yellow-300 dark:text-yellow-600">★</span> {detail}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 mb-6 flex items-center gap-2">
            <Code size={32} />
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsData.map((skillGroup, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 dark:from-white/50 dark:to-gray-100/50 rounded-xl p-6 border border-gray-700 dark:border-gray-300"
              >
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-900/80 to-purple-900/80 dark:from-blue-200/50 dark:to-purple-200/50 text-blue-300 dark:text-blue-800 rounded-full text-sm font-medium border border-blue-700 dark:border-blue-300 hover:border-blue-500 transition-all"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 dark:from-blue-100/30 dark:to-purple-100/30 rounded-2xl p-8 md:p-12 border border-gray-700 dark:border-gray-300 text-center"
        >
          <h2 className="text-2xl font-bold text-blue-400 dark:text-blue-600 mb-6 flex items-center justify-center gap-2">
            <Award size={28} />
            My Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-white dark:text-black mb-2">Integrity</h3>
              <p className="text-gray-400 dark:text-gray-700">Honest, transparent, and ethical in all endeavors</p>
            </div>
            <div>
              <h3 className="font-bold text-white dark:text-black mb-2">Continuous Learning</h3>
              <p className="text-gray-400 dark:text-gray-700">Always growing, adapting, and mastering new skills</p>
            </div>
            <div>
              <h3 className="font-bold text-white dark:text-black mb-2">Teamwork</h3>
              <p className="text-gray-400 dark:text-gray-700">Collaborative, supportive, and empowering to others</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
