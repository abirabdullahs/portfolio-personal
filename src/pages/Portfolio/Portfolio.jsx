import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Download, Terminal, ExternalLink, Sparkles, Code2 } from 'lucide-react';
// Official brand icons
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiExpress, SiFirebase, SiCplusplus, SiC, SiMongodb } from 'react-icons/si';

// Typewriter Effect Component
const TypeWriter = ({ text, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

// Floating Particles Background
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 overflow-hidden opacity-30 pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-[#00ff41] to-[#00d9ff]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Matrix Rain Background
const MatrixRain = () => {
  return (
    <div className="fixed inset-0 overflow-hidden opacity-10 pointer-events-none">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(transparent 0%, #0a0a0a 100%),
          repeating-linear-gradient(90deg, transparent, transparent 2px, #00ff41 2px, #00ff41 4px)`,
        backgroundSize: '100% 100%, 50px 50px'
      }}></div>
    </div>
  );
};

// Animated Gradient Background
const AnimatedGradientBG = () => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none opacity-20"
      animate={{
        background: [
          'radial-gradient(circle at 0% 0%, #00ff41 0%, transparent 50%)',
          'radial-gradient(circle at 100% 100%, #00d9ff 0%, transparent 50%)',
          'radial-gradient(circle at 0% 100%, #00ff41 0%, transparent 50%)',
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: 'loop'
      }}
    />
  );
};

// Circular Progress Bar Component with Enhanced Animation
const CircularProgress = ({ percentage, icon: Icon, label, color }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="flex flex-col items-center group cursor-pointer"
    >
      <div className="relative w-28 h-28">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ boxShadow: [`0 0 20px ${color}`, `0 0 40px ${color}`, `0 0 20px ${color}`] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <svg className="transform -rotate-90 w-28 h-28 relative z-10">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#1a1a1a"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="56"
            cy="56"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              strokeDasharray: circumference,
              filter: `drop-shadow(0 0 8px ${color})`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Icon className={`w-10 h-10`} style={{ color }} />
          </motion.div>
        </div>
      </div>
      <motion.p 
        className="mt-3 text-sm font-mono text-gray-300 text-center"
        whileHover={{ color }}
      >
        {label}
      </motion.p>
      <motion.p 
        className="text-xs font-mono" 
        style={{ color }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {percentage < 20 ? (percentage < 15 ? 'Initializing...' : 'Loading...') : `${percentage}%`}
      </motion.p>
    </motion.div>
  );
};

// Skills Section Component with Enhanced Animations
const SkillsSection = () => {
  const webSkills = [
    { name: 'HTML', percentage: 95, icon: FaHtml5, color: '#ff6b00' },
    { name: 'CSS', percentage: 90, icon: FaCss3Alt, color: '#0099ff' },
    { name: 'TailwindCSS', percentage: 92, icon: SiTailwindcss, color: '#00ffd5' },
    { name: 'ReactJS', percentage: 88, icon: FaReact, color: '#00e5ff' },
    { name: 'Next.js', percentage: 40, icon: SiNextdotjs, color: '#ffffff' },
    { name: 'Express', percentage: 82, icon: SiExpress, color: '#9d4dff' },
    { name: 'Node.js', percentage: 83, icon: FaNodeJs, color: '#00ff41' },
    { name: 'MongoDB', percentage: 80, icon: SiMongodb, color: '#00ff7f' },
    { name: 'Firebase', percentage: 78, icon: SiFirebase, color: '#ffae00' },
  ];

  const coreSkills = [
    { name: 'C++', percentage: 75, icon: SiCplusplus, color: '#00d9ff' },
    { name: 'Java', percentage: 70, icon: FaJava, color: '#00d9ff' },
  ];

  return (
    <section className="py-20 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2 
          className="text-4xl font-bold font-mono mb-12 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#00ff41]">{'<'}</span>
          Skills Dashboard
          <span className="text-[#00ff41]">{' />'}</span>
        </motion.h2>

        <div className="mb-16">
          <motion.h3 
            className="text-2xl font-mono text-[#00ff41] mb-8 text-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Web Technologies
          </motion.h3>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            viewport={{ once: false, margin: "-100px" }}
          >
            {webSkills.map((skill, index) => (
              <motion.div 
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <CircularProgress {...skill} label={skill.name} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div>
          <motion.h3 
            className="text-2xl font-mono text-[#00d9ff] mb-8 text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Core Concepts
          </motion.h3>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-md mx-auto"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            viewport={{ once: false, margin: "-100px" }}
          >
            {coreSkills.map((skill, index) => (
              <motion.div 
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <CircularProgress {...skill} label={skill.name} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Projects Section Component with Enhanced Animations
const ProjectsSection = () => {
  const projects = [
    {
      name: 'HomeHero',
      description: 'A comprehensive home service platform connecting users with trusted service providers.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'TailwindCSS'],
      link: '#'
    },
    {
      name: 'SkillSwap',
      description: 'Platform for exchanging skills and knowledge within a community-driven ecosystem.',
      tech: ['Firebase', 'React', 'TailwindCSS'],
      link: '#'
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2 
          className="text-4xl font-bold font-mono mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#00ff41]">{'<'}</span>
          Projects
          <span className="text-[#00ff41]">{' />'}</span>
        </motion.h2>

        {/* Local animation variants for projects */}
        {(() => {
          const containerVariants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
              },
            },
          };

          const itemVariants = {
            hidden: { opacity: 0, y: 50, scale: 0.9 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          };

          return (
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -15, transition: { duration: 0.3 } }}
                  className="relative group"
                >
              {/* Animated gradient background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#00ff41]/20 to-[#00d9ff]/20 rounded-lg blur-xl"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <motion.div className="relative bg-black/40 backdrop-blur-md border border-[#00ff41]/30 rounded-lg p-6 hover:border-[#00ff41] transition-all duration-300 overflow-hidden">
                {/* Animated light effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  style={{ opacity: 0.1 }}
                />
                
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <motion.h3 
                    className="text-2xl font-mono font-bold text-[#00ff41]"
                    whileHover={{ letterSpacing: "0.1em" }}
                  >
                    {project.name}
                  </motion.h3>
                  <motion.div
                    whileHover={{ rotate: 45, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExternalLink className="w-5 h-5 text-[#00d9ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
                
                <p className="text-gray-300 mb-4 font-mono text-sm">{project.description}</p>
                
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 text-xs font-mono bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] rounded-full"
                      whileHover={{ 
                        backgroundColor: "#00ff41",
                        color: "#000000",
                        scale: 1.1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
              ))}
            </motion.div>
          );
        })()}
      </motion.div>
    </section>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden" style={{ fontFamily: "'Fira Code', monospace" }}>
      <MatrixRain />
      <AnimatedGradientBG />
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative animated circles */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#00ff41]/5 blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "-10%", top: "20%" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#00d9ff]/5 blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ right: "-10%", bottom: "20%" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          {/* Animated sparkle icon */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-8 h-8 text-[#00ff41]" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 font-mono relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="text-[#00ff41]"
              animate={{ color: ["#00ff41", "#00d9ff", "#00ff41"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {'> '}
            </motion.span>
            <motion.span
              animate={{ textShadow: [
                "0 0 20px #00ff41",
                "0 0 40px #00d9ff",
                "0 0 20px #00ff41"
              ]}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              MD Abir Hossen Abdullah
            </motion.span>
          </motion.h1>
          
          <motion.div
            className="text-xl md:text-2xl text-gray-300 mb-8 h-16 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <TypeWriter text="BUET CSE Undergrad | MERN Stack Developer | Competitive Programmer" delay={50} />
          </motion.div>

          {/* Staggered buttons and links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <motion.a
              href="https://drive.google.com/file/d/1UFm2R6Ij1yDCt63Dg-LDa8T1HWR9YeYi/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 30px #00ff41',
                backgroundColor: '#00ff4122'
              }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  "0 0 10px #00ff41",
                  "0 0 20px #00ff41",
                  "0 0 10px #00ff41"
                ]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity }
              }}
              className="px-6 py-3 bg-[#00ff41]/10 border-2 border-[#00ff41] text-[#00ff41] font-mono rounded-lg flex items-center gap-2 hover:bg-[#00ff41]/20 transition-all"
            >
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Download className="w-5 h-5" />
              </motion.div>
              Download Resume
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.5 }}
            className="flex gap-6 justify-center"
          >
            {[
              { icon: Github, link: 'https://github.com/abirabdullahs', color: '#00ff41' },
              { icon: Linkedin, link: 'https://www.linkedin.com/in/abirabdullah', color: '#00d9ff' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.2, 
                  filter: `drop-shadow(0 0 15px ${social.color})`,
                  rotate: 10
                }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity, delay: index * 0.1 }
                }}
                className="transition-all"
              >
                <social.icon className="w-8 h-8" style={{ color: social.color }} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-4xl font-bold font-mono mb-8 text-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#00ff41]">{'<'}</span>
            About Me
            <span className="text-[#00ff41]">{' />'}</span>
          </motion.h2>
          <motion.div 
            className="bg-black/40 backdrop-blur-md border border-[#00ff41]/30 rounded-lg p-8 hover:border-[#00ff41] transition-all duration-300"
            whileHover={{ boxShadow: "0 0 30px #00ff4144" }}
          >
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Currently studying CSE at BUET (2025 - Present). Passionate about Web Development and Problem Solving. 
              Also serving as a Chemistry & ICT Educator, bridging the gap between technology and education.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Problem Solving Stats */}
      <section className="py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-4xl font-bold font-mono mb-12 text-center"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#00d9ff]">{'<'}</span>
            Problem Solving Stats
            <span className="text-[#00d9ff]">{' />'}</span>
          </motion.h2>
          
          <motion.div 
            className="bg-[#1a1a1a] border-2 border-[#00d9ff]/50 rounded-lg overflow-hidden hover:border-[#00d9ff] transition-all duration-300"
            whileHover={{ boxShadow: "0 0 30px #00d9ff44" }}
          >
            <div className="bg-[#00d9ff]/10 px-4 py-2 border-b border-[#00d9ff]/30 flex items-center gap-2">
              <motion.div 
                className="flex gap-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              </motion.div>
              <motion.span 
                className="text-[#00d9ff] font-mono text-sm ml-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                terminal.sh
              </motion.span>
            </div>
            <motion.div 
              className="p-6 font-mono text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.p 
                className="text-[#00d9ff] mb-2"
                animate={{ letterSpacing: [0, 2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                $ cat problem_solving_stats.txt
              </motion.p>
              <motion.p 
                className="text-gray-300 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-[#00ff41]">Languages:</span> 
                <div className="mt-2 flex gap-4 items-center flex-wrap">
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <SiC size={24} color="#00d9ff" />
                    <span className="text-gray-300">C</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <SiCplusplus size={24} color="#00d9ff" />
                    <span className="text-gray-300">C++</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaJava size={24} color="#00d9ff" />
                    <span className="text-gray-300">Java</span>
                  </motion.div>
                </div>
              </motion.p>
              <motion.p 
                className="text-gray-300 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-[#00ff41]">Total Problems Solved:</span> 500+
              </motion.p>
              <motion.p 
                className="text-gray-300 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-[#00ff41]">Platforms:</span>
              </motion.p>
              <motion.ul 
                className="text-gray-400 ml-4 space-y-1"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
              >
                {['Codeforces', 'LeetCode', 'CodeChef'].map((platform, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    whileHover={{ x: 10, color: '#00ff41' }}
                  >
                    → {platform}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.p 
                className="text-[#00d9ff] mt-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                █
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <section className="py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-4xl font-bold font-mono mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#00ff41]">{'<'}</span>
            Contact
            <span className="text-[#00ff41]">{' />'}</span>
          </motion.h2>

          <motion.div 
            className="bg-black/40 backdrop-blur-md border border-[#00ff41]/30 rounded-lg p-8 hover:border-[#00ff41] transition-all duration-300"
            whileHover={{ boxShadow: "0 0 30px #00ff4144" }}
          >
            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              {[
                { href: "mailto:abirabdullah3491@gmail.com", icon: Mail, color: "#00ff41", text: "abirabdullah3491@gmail.com" },
                { href: "tel:+8801406751374", icon: Phone, color: "#00d9ff", text: "+880 1406 751374" },
                { href: "https://www.linkedin.com/in/abirabdullah", icon: Linkedin, color: "#00ff41", text: "LinkedIn Profile" },
                { href: "https://github.com/abirabdullahs", icon: Github, color: "#00d9ff", text: "GitHub Profile" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={idx}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: `${item.color}15`,
                      borderColor: item.color
                    }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-[#00ff41]/5 border border-[#00ff41]/30 rounded-lg hover:border-[#00ff41] transition-all"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Icon className="w-6 h-6" style={{ color: item.color }} />
                    </motion.div>
                    <span className="font-mono text-gray-300 hover:text-white transition-colors">{item.text}</span>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-8 text-center border-t border-[#00ff41]/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p 
          className="font-mono text-gray-500"
          animate={{ color: ["#808080", "#00ff41", "#808080"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-[#00ff41]">{'>'}</span> Built with Next.js, TailwindCSS & Framer Motion
        </motion.p>
        <motion.p 
          className="font-mono text-gray-600 text-sm mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          © 2024 MD Abir Hossen Abdullah
        </motion.p>
      </motion.footer>
    </div>
  );
};

export default Portfolio;