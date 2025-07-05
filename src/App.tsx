import './App.css'
import { useState } from 'react';
import Starfield from './Starfield';
import { FaEnvelope } from 'react-icons/fa';

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
      <p className="mb-6 text-xl">
        Hi! I'm Alex, a first-generation college student studying CS and math at Cornell University.
        
        I'm passionate about machine learning and software engineering.

        I'm always eager to learn, collaborate, and take on new challenges—both in and out of the classroom.
      </p>
      
      {/* Contact Buttons */}
      <div className="flex flex-wrap gap-3">
        <a
          href="/resume.pdf"
          download
          className="px-4 py-2 rounded-xl bg-white/5 text-gray-200 font-medium backdrop-blur-sm border border-white/10 shadow-sm transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-[1.02] focus:outline-none focus:ring-1 focus:ring-white/30 flex items-center gap-2 text-sm"
        >
          <span className="text-xs">📄</span>
          Resume/CV
        </a>
        <a
          href="mailto:alex.kozik@yahoo.com"
          className="px-4 py-2 rounded-xl bg-white/5 text-gray-200 font-medium backdrop-blur-sm border border-white/10 shadow-sm transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-[1.02] focus:outline-none focus:ring-1 focus:ring-white/30 flex items-center gap-2 text-sm"
        >
          <FaEnvelope size={14} />
          Email
        </a>
      </div>
    </div>
  </div>
);

// Scroll Indicator Component
const ScrollIndicator = () => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <div className="flex flex-col items-center text-white/60">
      <span className="text-sm font-medium mb-2">Scroll to explore</span>
      <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
      </div>
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
      {educationData.map((edu) => {
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
                  <h3 className="text-xl font-bold text-gray-100 leading-tight">
                    {edu.degree} - {edu.name}
                  </h3>
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
    duration: 'May 2025 - Aug 2025',
    description: [
      'Develop custom virtual formula field functionality in Salesforce Data Cloud, empowering customers to create dynamic data transformations without code and enabling self-service analytics capabilities.',
      'Build scalable backend services using Java and Apache Spark for formula computations on distributed metadata services, enabling processing that scales automatically with customer data volume.',
      'Implement REST API endpoints with robust error handling and validation, providing developers with reliable programmatic access to formula field operations and reducing integration complexity.',
      'Create intuitive React and TypeScript frontend interface that simplifies virtual formula field creation and data exploration, dramatically improving user experience and accelerating customer onboarding.'
    ],
  },
  {
    company: 'CMSX',
    logo: '/CMSX-logo.svg',
    position: 'Frontend Lead, Vice President, Fullstack Engineer',
    duration: 'Aug 2023 – Present',
    description: [
      "Maintain Cornell's course management system, used by 10,000+ students in 100,000+ line codebase.",
      'Lead frontend team by designing project architectures, reviewing PRs, and interviewing candidates.',
      'Architected and built the student-facing frontend in React/TS, implementing a component architecture and state management to reduce loading times by 90% from the previous implementation.',
      'Implemented APIs with serializable data structures, enabling secure communication between frontend and backend while improving developer velocity through enhanced code modularity and reusability.'
    ],
  },
  {
    company: 'Carnegie Mellon University',
    logo: '/S3D.jpeg',
    position: 'Software Engineer and Research Intern',
    duration: 'May 2024 - August 2024',
    description: [
      'Worked on the interpreter for SASyLF, a language for writing proofs, implementing core features in Java.',
      'Implemented a polymorphic type system for SASyLF, similar to Java generics, enabling type-safe code reuse and significantly reducing duplication in proofs by allowing abstraction over multiple data types.',
      'Created a modular testing framework using Python to automate integration tests, ensuring reliability.'
    ],
  },
  {
    company: 'Cornell Generative AI',
    logo: '/generative_ai_at_cornell_logo.jpeg',
    position: 'Artificial Intelligence/Machine Learning Engineer',
    duration: 'Feb 2025 - Present',
    description: [
      'Developed AI agent for QuickFi, a commercial lending technology company, automating insurance certificate validation and compliance verification processes, reducing operational costs.',
      'Built frontend and vector database for ClassGPT, enabling professors to create AI tutors for classes.'
    ],
  },
  {
    company: 'Cornell Bowers CIS',
    logo: '/cornell-logo.png',
    mainTitle: 'Teaching Assistant',
    subroles: [
      {
        course: 'CS 3780/5780 - Introduction to Machine Learning',
        duration: 'Jan 2025 - Present',
        description: [
          'Topics Covered: Clustering algorithms, PCA, MLE/MAP, regression, optimization algorithms, SVM, kernelization, ERM, decision trees, ensemble methods, neural networks, CNNs, generative AI, and AI ethics.',
          'Held office hours helping students with homework assignments and programming projects, graded assignments and exams, and proctored exams.'
        ],
      },
      {
        course: 'CS 4820/5820 - Introduction to Analysis of Algorithms',
        duration: 'Aug 2024 - Dec 2024',
        description: [
          'Topics Covered: Greedy algorithms, dynamic programming, network flow, divide and conquer algorithms, NP hardness, approximation algorithms, computability, and cryptography.',
          'Held office hours helping students with homework assignments and programming projects, graded assignments and exams, and proctored exams.'
        ],
      },
      {
        course: 'CS 3110 - Data Structures and Functional Programming',
        duration: 'Aug 2023 - May 2024',
        description: [
          'Topics Covered: OCaml programming, polymorphism, models of evaluation, functors, mutability, logic, concurrency, data structures, lambda calculus.',
          'Awarded the CS course staff award for outstanding service to students.',
          'Held office hours helping students with homework assignments and programming projects, lead weekly recitations, graded assignments and exams, and proctored exams.'
        ],
      },
    ],
  },
];

const ExperienceSection = () => (
  <div className="flex flex-col gap-6 items-center justify-center min-h-[56vh]">
    <h2 className="text-3xl font-bold text-gray-100 mb-3">Experience</h2>
    <div className="flex flex-col gap-4 w-full max-w-5xl">
      {experienceData.map((exp) => (
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
                    {(exp.position || exp.mainTitle) && (
                      <span className="text-lg font-medium text-gray-200 ml-2">
                        - {exp.position || exp.mainTitle}
                      </span>
                    )}
                  </h3>
                </div>
                <span className="text-sm text-gray-400 font-medium whitespace-nowrap">
                  {exp.duration || ''}
                </span>
              </div>
              
              {/* Subroles (for TA positions) */}
              {exp.mainTitle && exp.subroles ? (
                <div className="flex flex-col gap-4">
                  {exp.subroles.map((sub) => (
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
    name: "C-Torch - Artificial Intelligence/Machine Learning Library",
    description: "High-performance math library supporting numerical methods, calculus, and linear algebra. Includes 15+ ML models and RL agents.",
    tech: ["C++"],
    github: "https://github.com/LambdaAK/c-torch",
    demo: null,
    image: "/C torch logo.png",
    highlights: [
      "Developed a high-performance math library supporting numerical methods, calculus, and linear algebra.",
      "Implemented 15+ ML models, such as neural networks, achieving 99%+ accuracy on classification tasks.",
      "Implemented DQN and Policy Gradient agents achieving 97%+ win rates in autonomous gameplay.",
      "Achieved 26x performance speedup through compiler optimizations and parallelization techniques."
    ]
  },
  {
    name: "LambdaScript - Custom Programming Language",
    description: "Custom functional programming language with a performant interpreter, type inference, and core language features.",
    tech: ["TypeScript", "OCaml", "Jest", "OUnit"],
    github: "https://github.com/LambdaAK/lambdascript",
    demo: null,
    image: "/LambdaScript logo.png",
    highlights: [
      "Built interpreter for custom programming language, achieving 50% speed improvement over Python.",
      "Designed parser and type inference algorithm to validate programs and provide developer feedback.",
      "Implemented core language features including pattern matching, functions, and polymorphism."
    ]
  },
  {
    name: "HabitStack - Habit Tracking Application",
    description: "Full-stack habit tracking application with OAuth2, monthly calendar interface, and real-time goal management.",
    tech: ["React", "TypeScript", "JavaScript", "SASS", "Express.js", "Firebase", "Vite"],
    github: "https://github.com/LambdaAK/HabitStack",
    demo: null,
    image: "/Habit stack logo.png",
    highlights: [
      "Built full-stack habit tracking application with OAuth2, calendar interface, and goal management.",
      "Developed TypeScript APIs and Express.js backend integrated with Firebase for seamless persistence.",
      "Implemented live chat functionality using database connections, enabling low-latency communication."
    ]
  },
  {
    name: "CritterWorld - Evolving Artificial Life Simulator",
    description: "Evolving artificial life simulator with JavaFX GUI and custom programming language for organism behavior.",
    tech: ["Java", "JavaFX", "SceneBuilder", "Gradle", "JUnit"],
    github: null,
    demo: null,
    image: "/critterworld logo.png",
    highlights: [
      "Built JavaFX GUI app to visualize real-time interactions and evolution of virtual organisms.",
      "Implemented custom programming language with parser and interpreter to model organism behavior.",
      "Developed pathfinding algorithms including A* and Dijkstra's for organism navigation."
    ]
  },
  {
    name: "Visual Attention Image Captioning - Show, Attend, Tell Implementation",
    description: "Show, Attend, Tell implementation: attention-based image captioning model with superior METEOR scores.",
    tech: ["PyTorch", "Python"],
    github: "https://github.com/LambdaAK/CS-4782-Final-Project",
    demo: null,
    image: "/image captioning logo.png",
    highlights: [
      "Implemented attention-based image captioning model with superior METEOR scores vs. original paper.",
      "Built soft and hard attention mechanisms with REINFORCE and backpropagation for training.",
      "Developed encoder-decoder architecture using ResNet-50 and LSTM with attention visualization."
    ]
  },
  {
    name: "AlgoSandbox - Interactive Algorithm Visualizer",
    description: "Interactive platform for visualizing and experimenting with classic algorithms and data structures. Designed for students, educators, and developers to learn and teach algorithms in an engaging way.",
    tech: ["React", "TypeScript", "Vite", "CSS", "JavaScript", "Netlify"],
    github: "https://github.com/LambdaAK/AlgoSandbox",
    demo: null,
    image: "/algosandbox logo.png",
    highlights: [
      "Built interactive platform for visualizing classic algorithms and data structures with real-time animations."
    ]
  },
  {
    name: "Portfolio Website",
    description: "This portfolio website",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/LambdaAK/Alex-Kozik-Portfolio",
    demo: null,
    image: null
  },
];

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

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#181A20] to-indigo-950 text-[#E5E7EB] relative overflow-x-hidden">
      <Starfield />
      <div className="flex flex-col gap-16 max-w-5xl mx-auto px-4 pb-24 relative z-10">
        <section id="about">
          <div className="relative w-full h-screen">
            {/* AboutMeCard centered */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <AboutMeCard />
            </div>
            <ScrollIndicator />
          </div>
        </section>
        
        <section id="education" className="pt-8">
          <EducationSection />
        </section>
        
        <section id="experience" className="pt-8">
          <ExperienceSection />
        </section>
        
        <section id="projects" className="pt-8">
          <Projects />
        </section>
      </div>
    </div>
  );
}

export default App
