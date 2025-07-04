import './App.css'
import React, { useState } from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Starfield from './Starfield';

// About Me Card Component
const AboutMeCard = () => (
  <div className="w-full max-w-4xl rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8 border border-white/20 transition-transform duration-300 hover:scale-[1.02]">
    {/* Profile Picture */}
    <div className="flex-shrink-0">
      <div className="w-128 h-128 rounded-2xl overflow-hidden bg-neutral-800 flex items-center justify-center">
        {/* Replace src with your image */}
        <img
          src="/kozik.jpg"
          alt="Profile"
          className="object-cover object-center w-full h-full"
        />
      </div>
    </div>
    {/* About Me Section */}
    <div className="flex-1 text-gray-300">
      <h2 className="text-4xl font-bold mb-4 flex items-center gap-2">
        <span role="img" aria-label="About">👤</span> About Me
      </h2>
      <p className="mb-2 text-xl">
        Hi! I'm Alex, a first-generation college student studying CS and math at Cornell University.
        
        I'm passionate about machine learning and software engineering.

        I'm always eager to learn, collaborate, and take on new challenges—both in and out of the classroom.
      </p>
      {/* Add more about you here if desired */}
    </div>
  </div>
);

// Education Section Component
const educationData = [
  
  {
    name: 'Cornell University',
    logo: '/cornell-logo.png',
    degree: "Bachelor of Arts, Honors",
    major: 'Double Major: Computer Science & Mathematics',
    gpa: 'GPA: 4.1/4.0 (Top 1%)',
    date: 'Aug 2022 - May 2026',
    courses: [
      // CS
      'CS 2112 - Honors Object Oriented Design and Data Structures (A)',
      'CS 2800 - Discrete Math (A-)',
      'CS 3110 - Data Structures and Functional Programming (A)',
      'CS 3410 - Computer System Organization and Programming (A)',
      'CS 4110 - Programming Languages and Logics (A+)',
      'CS 4414 - Systems Programming (A)',
      'CS 4701 - AI Practicum (A+)',
      'CS 4780 - Machine Learning (A+)',
      'CS 4782 - Deep Learning (A+)',
      'CS 4820 - Analysis of Algorithms (A)',
      'CS 4998 x 2 - Team Projects (A+, A+)',
      'CS 4999 x 2 - Independent Reading and Research (A+, A+)',
      'CS 7190 x 2 - PL Sem (SX, SX)',
      'AP Computer Science A',
      // Math
      'MATH 2210 - Linear Algebra (A)',
      'MATH 2220 - Multivariable Calculus (A-)',
      'MATH 3110 - Real Analysis (A+)',
      'MATH 3360 - Applicable Algebra (A+)',
      'MATH 4310 - Advanced Linear Algebra (A+)',
      'MATH 4710 - Probability Theory (A)',
      'AP Calculus AB/BC',
      'AP Stats',
      // Econ
      'ECON 1120 - Macroeconomics (A)',
      'AP Microeconomics',
      // Other
      'AP Phys C',
      'AP Chem',
      'AP Bio',
    ],
  },
  {
    name: 'Central Bucks High School South',
    logo: '/cs-south-logo.png',
    degree: 'High School Diploma',
    major: 'STEM Focus',
    gpa: 'GPA: 4.32/4.0',
    date: '2018-2022',
    courses: [
      'AP Calculus BC',
      'AP Physics C',
      'AP Computer Science',
      'AP Chemistry',
    ],
  },
];
const EducationSection = () => (
  <div className="flex flex-col gap-2 items-center justify-center">
    <h2 className="text-3xl font-bold text-gray-100 mb-3">Education</h2>
    <div className="flex flex-col gap-4 w-full max-w-5xl">
      {educationData.map((edu, idx) => {
        const [showCourses, setShowCourses] = useState(false);
        return (
          <div
            key={edu.name}
            className="w-full flex flex-row items-stretch bg-white/5 rounded-2xl shadow-lg border border-white/10 hover:scale-[1.01] transition-transform duration-200"
          >
            {/* Logo on the left */}
            <div className="flex items-center justify-center min-w-[120px] max-w-[160px] bg-white/20 rounded-l-2xl p-4">
              <img
                src={edu.logo}
                alt={edu.name + ' logo'}
                className="object-contain w-24 h-16 rounded-2xl"
              />
            </div>
            {/* Details on the right */}
            <div className="flex-1 flex flex-col justify-between p-5 gap-2">
              <div className="flex flex-row items-start justify-between flex-wrap gap-2">
                <div>
                  <span className="text-lg font-bold text-gray-100 block leading-tight">
                    {edu.degree}
                    {edu.name && (
                      <span className="text-gray-400 font-semibold"> @ {edu.name}</span>
                    )}
                  </span>
                  <span className="block text-blue-300 text-base font-medium mt-1">{edu.major}</span>
                </div>
                <span className="text-sm text-gray-400 font-medium whitespace-nowrap mt-1">{edu.date}</span>
              </div>
              <div className="flex flex-row items-center gap-4 mt-1">
                <span className="text-base text-gray-400">{edu.gpa}</span>
                <button
                  className="px-4 py-1.5 rounded-full bg-white/10 text-white font-semibold backdrop-blur-lg border border-white/20 shadow-lg transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-blue-500/30 hover:text-cyan-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 text-sm"
                  onClick={() => setShowCourses((prev) => !prev)}
                >
                  {showCourses ? 'Hide Relevant Courses' : 'Show Relevant Courses'}
                </button>
              </div>
              {showCourses && (
                <div className="mt-2">
                  <span className="font-semibold text-gray-200">Relevant Courses:</span>
                  {edu.name === 'Cornell University' ? (
                    <div className="ml-3 mt-1">
                      <span className="font-semibold text-blue-300">CS:</span>
                      <ul className="list-disc list-inside ml-3 text-gray-300 text-sm">
                        {edu.courses.slice(0, 13).map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                      <span className="font-semibold text-blue-300">Math:</span>
                      <ul className="list-disc list-inside ml-3 text-gray-300 text-sm">
                        {edu.courses.slice(13, 21).map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                      <span className="font-semibold text-blue-300">Econ:</span>
                      <ul className="list-disc list-inside ml-3 text-gray-300 text-sm">
                        {edu.courses.slice(21, 23).map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                      <span className="font-semibold text-blue-300">Other:</span>
                      <ul className="list-disc list-inside ml-3 text-gray-300 text-sm">
                        {edu.courses.slice(23).map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <ul className="list-disc list-inside ml-3 mt-1 text-gray-300 text-sm">
                      {edu.courses.map((course) => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// Experience Section Component
const experienceData = [
  {
    company: 'Salesforce',
    logo: '/Salesforce.com_logo.svg.png',
    position: 'Software Engineer Intern',
    duration: 'June 2025 - August 2025',
    description: [
      'Implementing custom formula field functionality in Salesforce Data Cloud using Java, SQL, and Apache Spark.',
      'Developing UI in React and TypeScript with REST API for metadata explorer, enabling users to browse data schemas.'
    ],
  },
  {
    company: 'CMSX',
    logo: '/CMSX-logo.svg',
    positions: [
      {
        title: 'Frontend Engineering Lead',
        duration: 'Jan 2024 – Present',
        description: [
          'Lead frontend team by designing project architectures, reviewing PRs, and interviewing candidates.',
          'Architected and built the student-facing frontend in React/TS, enhancing user experience and code maintainability.',
        ],
      },
      {
        title: 'Full Stack Engineer',
        duration: 'Aug 2023 – Dec 2023',
        description: [
          "Implemented APIs with serializable data structures for secure communication between frontend and backend.",
          "Maintained Cornell's official CS course management system, used by 10,000+ students in 100,000+ line codebase.",
        ],
      },
    ],
  },
  {
    company: 'Cornell Generative AI',
    logo: '/generative_ai_at_cornell_logo.jpeg',
    position: 'AI/ML Engineer',
    duration: 'January 2024 - Present',
    description: [
      'Developed AI agent for QuickFi automating insurance certificate validation and compliance verification processes.',
      'Built frontend and vector database for ClassGPT, enabling professors to create AI tutors for course-specific content.',
      'Manage cross-functional project teams and coordinate development workflows for multiple AI-driven applications.'
    ],
  },
  {
    company: 'Carnegie Mellon University, S3D',
    logo: '/S3D.jpeg',
    position: 'Software Engineer and Research Intern',
    duration: 'May 2024 - August 2024',
    description: [
      'Worked on the interpreter for SASyLF, a programming language for writing proofs, implementing core features in Java.',
      'Created a modular testing framework using Python to automate unit tests and integration tests, ensuring code reliability.',
      'Implemented a polymorphic module system for SASyLF, providing type-safe code reuse similar to Java generics for classes.'
    ],
  },
  {
    company: 'Cornell Bowers CIS',
    logo: '/cornell-logo.png',
    mainTitle: 'Teaching Assistant',
    subroles: [
      {
        course: 'CS 3780/5780 - Machine Learning',
        duration: 'Spring 2025, Fall 2025',
        description: [
          'Recipient of the CS Course Staff Award for providing exceptional service to students (awarded to less than 10% of TAs).',
          'Led office hours, assisted with assignments, and supported students in learning core ML concepts.',
          'Debugged code and graded assessments in Python.'
        ],
      },
      {
        course: 'CS 4820/5820 - Analysis of Algorithms',
        duration: 'Fall 2024',
        description: [
          'Held office hours and provided guidance on algorithmic problem solving and assignments.',
          'Graded assignments and exams, and helped students understand complex algorithmic concepts.',
        ],
      },
      {
        course: 'CS 3110 - Data Structures & Functional Programming',
        duration: 'Fall 2023, Spring 2024',
        description: [
          'Assisted students with functional programming and data structures assignments.',
          'Led office hours, debugged code in OCaml, and graded coursework.',
        ],
      },
    ],
  },
];

const ExperienceSection = () => (
  <div className="flex flex-col gap-6 items-center justify-center min-h-[56vh]">
    <h2 className="text-3xl font-bold text-gray-100 mb-3">Experience</h2>
    <div className="flex flex-col gap-4 w-full max-w-5xl">
      {experienceData.map((exp, idx) => (
        <div
          key={exp.company + (exp.position || exp.mainTitle || '')}
          className="w-full bg-white/5 rounded-2xl shadow-lg border border-white/10 hover:scale-[1.01] transition-transform duration-200 p-6"
        >
          <div className="flex flex-row items-start gap-6">
            {/* Logo section */}
            <div className="flex items-center justify-center w-20 h-20 rounded-xl flex-shrink-0">
              <img
                src={exp.logo}
                alt={exp.company + ' logo'}
                className="object-contain w-16 h-16 rounded-lg"
              />
            </div>
            
            {/* Content section */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-row items-start justify-between flex-wrap gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-100 leading-tight">
                    {exp.company}
                    {(exp.position || exp.mainTitle || (exp.positions && exp.positions[0]?.title)) && (
                      <span className="text-lg font-medium text-gray-200 ml-2">
                        - {exp.position || exp.mainTitle || (exp.positions && exp.positions[0]?.title)}
                      </span>
                    )}
                  </h3>
                </div>
                <span className="text-sm text-gray-400 font-medium whitespace-nowrap">
                  {exp.duration || (exp.positions && exp.positions[0]?.duration) || ''}
                </span>
              </div>
              
              {/* Subroles or positions (for TA or multi-role) */}
              {exp.mainTitle && exp.subroles ? (
                <div className="flex flex-col gap-4">
                  {exp.subroles.map((sub, i) => (
                    <div key={sub.course + sub.duration} className="border-l-2 border-cyan-400/30 pl-4">
                      <div className="flex flex-row items-center gap-2 mb-2">
                        <span className="text-base font-semibold text-gray-100">{sub.course}</span>
                        <span className="text-sm text-blue-300 font-medium">{sub.duration}</span>
                      </div>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        {sub.description.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1.5 w-1 h-1 bg-cyan-400 rounded-full flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : exp.positions ? (
                <div className="flex flex-col gap-4">
                  {exp.positions.map((pos, i) => (
                    <div key={pos.title + pos.duration} className="border-l-2 border-cyan-400/30 pl-4">
                      <div className="flex flex-row items-center gap-2 mb-2">
                        <span className="text-base font-semibold text-gray-100">{pos.title}</span>
                        <span className="text-sm text-blue-300 font-medium">{pos.duration}</span>
                      </div>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        {pos.description.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1.5 w-1 h-1 bg-cyan-400 rounded-full flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                Array.isArray(exp.description) && (
                  <ul className="space-y-1 text-gray-300 text-sm">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1.5 w-1 h-1 bg-cyan-400 rounded-full flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
// Projects Data
const projects = [
  {
    name: "Portfolio Website",
    description: "This portfolio website",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    github: null,
    demo: null,
    image: null,
    highlights: [
      "Modern, responsive design with dark mode",
      "Sticky navbar and smooth navigation",
      "Animated transitions with Framer Motion",
      "Showcases education, experience, and projects"
    ]
  },
  {
    name: "AlgoSandbox",
    description: "Interactive platform for visualizing and experimenting with classic algorithms and data structures. Designed for students, educators, and developers to learn and teach algorithms in an engaging way.",
    tech: ["React", "TypeScript", "Vite", "CSS", "JavaScript", "Netlify"],
    github: "https://github.com/LambdaAK/AlgoSandbox",
    demo: null,
    image: "/algosandbox logo.png",
    highlights: [
      "Visualizes sorting, searching, and data structure algorithms with real-time animations.",
      "Tag-based filtering and search for algorithms.",
      "Responsive, dark-themed UI for a modern learning experience.",
      "Used by students and educators for teaching and self-study."
    ]
  },
  {
    name: "C-Torch",
    description: "High-performance math and machine learning library supporting numerical methods, multivariate calculus, and linear algebra. Includes 15+ ML models and RL agents.",
    tech: ["C++", "Machine Learning", "Numerical Methods"],
    github: "https://github.com/LambdaAK/c-torch",
    demo: null,
    image: "/C torch logo.png",
    highlights: [
      "Achieved 26x performance speedup through compiler optimizations and low-level memory management.",
      "Implemented DQN and Policy Gradient agents with 97%+ win rates in autonomous gameplay.",
      "Implemented neural networks and kernel SVMs, achieving 99%+ accuracy on classification tasks."
    ]
  },
  {
    name: "LambdaScript",
    description: "Custom functional programming language with a performant interpreter, type inference, and core language features.",
    tech: ["TypeScript", "OCaml", "Jest", "OUnit"],
    github: "https://github.com/LambdaAK/lambdascript",
    demo: null,
    image: "/LambdaScript logo.png",
    highlights: [
      "50% performance improvement over Python.",
      "Pattern matching, algebraic data types, and polymorphic types.",
      "Designed parser and type inference algorithm to validate programs and provide developer feedback."
    ]
  },
  {
    name: "HabitStack",
    description: "Full-stack habit tracking application with OAuth2, monthly calendar interface, and real-time goal management.",
    tech: ["React", "TypeScript", "Express.js", "Firebase", "Vite", "SASS"],
    github: null,
    demo: null,
    image: "/Habit stack logo.png",
    highlights: [
      "Developed TypeScript APIs and Express.js backend integrated with Firebase for seamless data persistence.",
      "Implemented live chat functionality using database connections, enabling low-latency communication between users."
    ]
  },
  {
    name: "CritterWorld",
    description: "Evolving artificial life simulator with JavaFX GUI and custom programming language for organism behavior.",
    tech: ["Java", "JavaFX", "SceneBuilder", "Gradle", "JUnit"],
    github: null,
    demo: null,
    image: "/critterworld logo.png",
    highlights: [
      "Built JavaFX GUI with multithreading to visualize real-time interactions and evolution of virtual organisms.",
      "Implemented custom programming language with AST parser and interpreter to model organism behavior and mutations.",
      "Developed pathfinding algorithms including A* and Dijkstra's for intelligent organism navigation."
    ]
  },
  {
    name: "Visual Attention Image Captioning",
    description: "Show, Attend, Tell implementation: attention-based image captioning model with superior METEOR scores.",
    tech: ["PyTorch", "Python", "Deep Learning"],
    github: null,
    demo: null,
    image: "/image captioning logo.png",
    highlights: [
      "Built soft and hard attention mechanisms with REINFORCE and backpropagation for stochastic/deterministic attention.",
      "Developed encoder-decoder architecture using ResNet-50 and LSTM with attention visualization."
    ]
  },
];
// Projects Section Component
// Projects Section Component

// Projects Section Component
const Projects = () => (
  <div className="flex flex-col gap-6 items-center justify-center min-h-[56vh]">
    <h2 className="text-3xl font-bold text-gray-100 mb-3">Projects</h2>
    <div className="flex flex-col gap-4 w-full max-w-5xl">
      {projects.map((project) => (
        <div
          key={project.name}
          className="w-full bg-white/5 rounded-2xl shadow-lg border border-white/10 hover:scale-[1.01] transition-transform duration-200 p-6"
        >
          <div className="flex flex-row items-start gap-6">
            {/* Logo section */}
            <div className="flex items-center justify-center w-20 h-20 rounded-xl flex-shrink-0">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name + ' logo'}
                  className="object-contain w-16 h-16 rounded-lg"
                />
              ) : (
                <span className="text-2xl font-extrabold text-white select-none">
                  {project.name[0]}
                </span>
              )}
            </div>
            
            {/* Content section */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-row items-start justify-between flex-wrap gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-100 leading-tight">
                    {project.name}
                  </h3>
                  <p className="text-blue-300 text-base font-medium mt-1">
                    {project.tech && project.tech.join(', ')}
                  </p>
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-white/10 text-gray-200 font-medium border border-white/20 shadow-md backdrop-blur-md hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-blue-500/30 hover:text-cyan-200 transition text-sm flex items-center gap-2"
                  >
                    GitHub
                  </a>
                )}
              </div>
              
              <p className="text-gray-300 mb-3 text-base leading-relaxed">
                {project.description}
              </p>
              
              {project.highlights && project.highlights.length > 0 && (
                <ul className="space-y-1 text-gray-300 text-sm">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1.5 w-1 h-1 bg-cyan-400 rounded-full flex-shrink-0"></span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 fixed top-0 left-0 z-20 bg-white/5 backdrop-blur-md border-b border-white/10">
      {/* Logo */}
      <div className="font-extrabold text-2xl text-white drop-shadow-lg tracking-tight select-none">
        Alex Kozik
      </div>
      {/* Nav Links */}
      <ul className="flex gap-4 md:gap-6">
        {[
          { name: 'Home', href: '#about' },
          { name: 'Projects', href: '#projects' },
          { name: 'Education', href: '#education' },
          { name: 'Experience', href: '#experience' },
          { name: 'Resume', href: '/resume.pdf', download: true },
        ].map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              {...(link.download ? { download: true } : {})}
              className="px-5 py-2 rounded-full bg-white/10 text-white font-semibold backdrop-blur-lg border border-white/20 shadow-lg transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-blue-500/30 hover:text-cyan-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      {/* Social Icons */}
      <div className="flex gap-3">
        <a href="https://linkedin.com/in/alex-kozik" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:text-cyan-300 transition shadow-md backdrop-blur-md">
          <FaLinkedin size={22} />
        </a>
        <a href="mailto:alex.kozik@yahoo.com" aria-label="Email"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:text-cyan-300 transition shadow-md backdrop-blur-md">
          <FaEnvelope size={22} />
        </a>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#181A20] to-indigo-950 text-[#E5E7EB] relative overflow-x-hidden">
      <Starfield />
      <Navbar />
      <div className="flex flex-col gap-8 max-w-5xl mx-auto px-4 pb-24 relative z-10">
        <section id="about">
          <div className="relative w-full h-screen">
            {/* AboutMeCard centered accounting for navbar */}
            <div className="absolute inset-0 flex items-center justify-center px-4" style={{ top: '80px' }}>
              <AboutMeCard />
            </div>
          </div>
        </section>
        <section id="education">
          <EducationSection />
        </section>
        <section id="experience">
          <ExperienceSection />
        </section>
        <section id="projects">
          <Projects />
        </section>
      </div>
    </div>
  );
}


export default App
