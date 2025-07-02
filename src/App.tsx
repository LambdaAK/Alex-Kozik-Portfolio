import './App.css'
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';

// About Me Card Component
const AboutMeCard = () => (
  <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-[#232a36] shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-[#232a36]/60">
    {/* Profile Picture */}
    <div className="flex-shrink-0">
      <div className="w-128 h-128 rounded-2xl border-4 border-blue-400 overflow-hidden bg-neutral-800 flex items-center justify-center">
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

      4I'm always eager to learn, collaborate, and take on new challenges—both in and out of the classroom.
      </p>
      {/* Add more about you here if desired */}
    </div>
  </div>
);

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh]">
    <AboutMeCard />
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
  <div className="flex flex-col gap-8 items-center justify-center min-h-[70vh]">
    <h2 className="text-4xl font-bold text-gray-100 mb-4">Education</h2>
    {educationData.map((edu, idx) => {
      const [showCourses, setShowCourses] = useState(false);
      return (
        <div
          key={edu.name}
          className="w-full max-w-4xl bg-[#232a36] rounded-3xl shadow-xl p-10 flex flex-col items-center gap-6 border border-[#232a36]/60"
        >
          {/* Header: Centered logo and school name */}
          <div className="flex flex-col items-center mb-6 w-full">
            <div className="w-36 h-36 rounded-xl overflow-hidden flex items-center justify-center mb-2">
              <img
                src={edu.logo}
                alt={edu.name + ' logo'}
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-2xl font-extrabold text-gray-100 text-center mt-2">{edu.name}</span>
          </div>
          {/* Details below header */}
          <div className="flex-1 text-gray-300 w-full">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <span className="text-xl font-bold text-gray-100 block">{edu.degree}</span>
              <span className="text-lg text-blue-300 block">{edu.major}</span>
            </div>
            <div className="flex gap-6 mb-2 text-gray-400 text-lg items-center">
              <span>{edu.gpa}</span>
              <span className="text-lg text-gray-300">{edu.date}</span>
            </div>
            <div>
              <button
                className="mt-2 mb-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-semibold"
                onClick={() => setShowCourses((prev) => !prev)}
              >
                {showCourses ? 'Hide Relevant Courses' : 'Show Relevant Courses'}
              </button>
              {showCourses && (
                <div>
                  <span className="font-semibold text-gray-200">Relevant Courses:</span>
                  {edu.name === 'Cornell University' ? (
                    <div className="ml-4 mt-1">
                      <span className="font-semibold text-blue-300">CS:</span>
                      <ul className="list-disc list-inside ml-4">
                        {edu.courses.slice(0, 13).map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                      <span className="font-semibold text-blue-300">Math:</span>
                      <ul className="list-disc list-inside ml-4">
                        {edu.courses.slice(13, 21).map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                      <span className="font-semibold text-blue-300">Econ:</span>
                      <ul className="list-disc list-inside ml-4">
                        {edu.courses.slice(21, 23).map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                      <span className="font-semibold text-blue-300">Other:</span>
                      <ul className="list-disc list-inside ml-4">
                        {edu.courses.slice(23).map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {edu.courses.map((course) => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    })}
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
  <div className="flex flex-col gap-8 items-center justify-center min-h-[70vh]">
    <h2 className="text-4xl font-bold text-gray-100 mb-4">Experience</h2>
    {experienceData.map((exp, idx) => (
      <div
        key={exp.company + (exp.position || exp.mainTitle || '')}
        className="w-full max-w-4xl bg-[#232a36] rounded-3xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-10 border border-[#232a36]/60"
      >
        {/* Logo on the left */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start mb-4 md:mb-0">
          <div className="w-28 h-28 rounded-xl overflow-hidden flex items-center justify-center mb-2">
            <img
              src={exp.logo}
              alt={exp.company + ' logo'}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        {/* Details on the right */}
        <div className="flex-1 text-gray-300 w-full">
          <span className="text-2xl font-extrabold text-gray-100 block mb-1">{exp.company}</span>
          {/* Special rendering for mainTitle/subroles (TA) */}
          {exp.mainTitle && exp.subroles ? (
            <div className="mb-2">
              <span className="text-xl font-bold text-blue-200 block mb-2">{exp.mainTitle}</span>
              <div className="flex flex-col gap-4">
                {exp.subroles.map((sub, i) => (
                  <div key={sub.course + sub.duration} className="mb-1 ml-2 border-l-2 border-blue-800 pl-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                      <span className="text-lg font-semibold text-blue-100 block">{sub.course}</span>
                      <span className="text-md text-blue-300 block md:ml-4">{sub.duration}</span>
                    </div>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {sub.description.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : exp.positions ? (
            <div className="flex flex-col gap-4">
              {exp.positions.map((pos, i) => (
                <div key={pos.title + pos.duration} className="mb-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                    <span className="text-xl font-bold text-blue-200 block">{pos.title}</span>
                    <span className="text-md text-blue-300 block md:ml-4">{pos.duration}</span>
                  </div>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    {pos.description.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <span className="text-xl font-bold text-blue-200 block">{exp.position}</span>
                <span className="text-md text-blue-300 block md:ml-4">{exp.duration}</span>
              </div>
              <ul className="list-disc list-inside ml-4 mt-2">
                {Array.isArray(exp.description) && exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    ))}
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
    image: null,
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
    image: null, // Add image path if available
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
    highlights: [
      "Built soft and hard attention mechanisms with REINFORCE and backpropagation for stochastic/deterministic attention.",
      "Developed encoder-decoder architecture using ResNet-50 and LSTM with attention visualization."
    ]
  },
];

// Projects Section Component
const Projects = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
    <h2 className="text-4xl font-bold text-gray-100 mb-8">Projects</h2>
    <div className="flex flex-col gap-10 w-full max-w-4xl">
      {projects.map((project) => (
        <div
          key={project.name}
          className="bg-[#232a36] rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-[#232a36]/60"
        >
          {/* Project image/logo on the left */}
          <div className="flex-shrink-0 flex items-center justify-center w-36 h-36 rounded-xl overflow-hidden bg-neutral-100 mb-4 md:mb-0">
            {project.image ? (
              <img src={project.image} alt={project.name + ' logo'} className="object-contain w-full h-full" />
            ) : (
              <span className="text-2xl text-gray-700 font-bold">{project.name[0]}</span>
            )}
          </div>
          {/* Details on the right */}
          <div className="flex-1 text-gray-300 w-full">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold text-gray-100 mr-2">{project.name}</h3>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-lg font-medium md:ml-4"
                >
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline text-lg font-medium md:ml-4"
                >
                  Live Demo
                </a>
              )}
            </div>
            <p className="text-gray-300 mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-900/40 text-blue-200 px-3 py-1 rounded-full text-xs font-medium border border-blue-800"
                >
                  {tech}
                </span>
              ))}
            </div>
            <ul className="list-disc list-inside ml-4 mt-2 text-gray-400 text-sm">
              {project.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Education = () => <EducationSection />;
const Experience = () => <ExperienceSection />;
const Resume = () => <div className="py-8">Resume Page</div>;
const Contact = () => <div className="py-8">Contact Page</div>;

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Router>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App
