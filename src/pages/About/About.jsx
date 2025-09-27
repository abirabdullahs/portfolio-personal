import teacherImg from '../../assets/images/teacher.png';
import buetLogo from '../../assets/images/buet_logo.png';

export default function About() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full py-12 px-4 flex justify-center items-center overflow-hidden">
      {/* Background Space Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#1e3a8a33,_transparent),radial-gradient(circle_at_bottom_right,_#9333ea22,_transparent)]"></div>

      {/* Main Content */}
      <div className="relative max-w-5xl w-full bg-gray-900/70 dark:bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10 border border-gray-700 dark:border-gray-300">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-6 md:w-1/3">
          <img
            src={teacherImg}
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full shadow-lg border-4 border-blue-500"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 flex flex-col gap-6 text-gray-200 dark:text-gray-900">
          {/* About Article */}
          <div>
            <h2 className="text-3xl font-bold text-blue-400 dark:text-blue-600 mb-3">
              About Me
            </h2>
            <p className="text-gray-300 dark:text-gray-800 leading-relaxed text-justify">
              Hello! I am <span className="font-semibold text-white dark:text-black">Abir Hossain Abdullah</span>, a dedicated and passionate individual driven by curiosity, knowledge, and a strong ethical foundation. My journey in the world of technology began at a young age when I discovered my love for problem-solving and creating digital solutions. Today, I am a Competitive Programmer, Web Developer, and Educator, constantly pushing my limits to integrate modern technology with meaningful purpose.<br/><br/>

              Currently, I am pursuing <span className="text-blue-300 dark:text-blue-600 font-medium">Computer Science & Engineering at BUET</span>, where I immerse myself in challenging projects, research, and learning opportunities. My aim is not just to acquire knowledge but to utilize it to inspire, educate, and contribute to the community. Over the years, I have cultivated strong skills in logical reasoning, application development, and teaching, helping others grasp complex concepts with clarity and creativity.<br/><br/>

              Beyond the technical realm, I take pride in upholding values rooted in integrity, teamwork, and continuous learning. Whether I am mentoring students, developing applications, or solving algorithmic challenges, I strive to combine innovation with ethics. I envision a future where technology empowers individuals and communities positively, and I am committed to being a part of that transformative journey.
            </p>
          </div>

          {/* Education Card */}
          <div className="bg-gradient-to-r from-blue-900/80 to-blue-700/80 dark:from-blue-100/50 dark:to-blue-200/50 rounded-lg p-5 shadow flex items-start gap-4 border border-gray-700 dark:border-gray-300">
            <img src={buetLogo} className="h-10 w-10 rounded-full" alt="BUET Logo" />
            <div>
              <div className="font-semibold text-white dark:text-black">
                Bangladesh University of Engineering & Technology (BUET)
              </div>
              <div className="text-gray-400 dark:text-gray-700 text-sm">
                B.Sc. in Computer Science & Engineering (Currently Studying)
              </div>
            </div>
          </div>

          {/* Instructor Card */}
          <div className="bg-gradient-to-r from-green-900/80 to-green-700/80 dark:from-green-100/50 dark:to-green-200/50 rounded-lg p-5 shadow flex items-start gap-4 border border-gray-700 dark:border-gray-300">
            <svg className="h-10 w-10 text-green-400 dark:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-semibold text-white dark:text-black">Instructor</div>
              <div className="text-gray-400 dark:text-gray-700 text-sm">Radiance & Biopark</div>
            </div>
          </div>

          {/* Executive Member Card */}
          <div className="bg-gradient-to-r from-purple-900/80 to-purple-700/80 dark:from-purple-100/50 dark:to-purple-200/50 rounded-lg p-5 shadow flex items-start gap-4 border border-gray-700 dark:border-gray-300">
            <svg className="h-10 w-10 text-purple-400 dark:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0M12 14v7m-6-3h12" />
            </svg>
            <div>
              <div className="font-semibold text-white dark:text-black">Executive Member</div>
              <div className="text-gray-400 dark:text-gray-700 text-sm">Radiance</div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 dark:text-blue-600 mb-2">Skills & Highlights</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-900/80 dark:bg-blue-200/50 text-blue-300 dark:text-blue-800 rounded-full text-sm font-medium">Problem Solving</span>
              <span className="px-3 py-1 bg-green-900/80 dark:bg-green-200/50 text-green-300 dark:text-green-800 rounded-full text-sm font-medium">Teaching</span>
              <span className="px-3 py-1 bg-purple-900/80 dark:bg-purple-200/50 text-purple-300 dark:text-purple-800 rounded-full text-sm font-medium">Teamwork</span>
              <span className="px-3 py-1 bg-pink-900/80 dark:bg-pink-200/50 text-pink-300 dark:text-pink-800 rounded-full text-sm font-medium">Web Development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
