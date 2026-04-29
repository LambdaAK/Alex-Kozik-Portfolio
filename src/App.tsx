import './App.css'
import { useState, type ReactNode } from 'react';
import Starfield from './Starfield';
import Navbar from './Navbar';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { ChevronDown, ChevronUp, FileText, ExternalLink, Award, Microscope, Code, Users, Star, GraduationCap, Heart } from 'lucide-react';
/** M.S. programs admitted to other than CMU (CMU is the enrolled program on the card above). */
const otherMsProgramOffers: string[] = [
  'Cornell University — MSCS',
  'Columbia University — MSCS',
  'University of Pennsylvania — MSECS',
  'Brown University — MSCS',
  'University of Michigan — MSCSE',
  'University of California, San Diego — MSCSE',
  'The University of Texas at Austin — MSCS',
  'University of Southern California — MSCS',
  'University of Southern California — MSCS (AI)',
];

const SectionReveal = ({ children }: { children: ReactNode }) => <div>{children}</div>;

const AnimatedOrbs = () => (
  <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
    <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
    <div className="absolute right-[-120px] top-[24vh] h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
    <div className="absolute bottom-[-180px] left-[20vw] h-[28rem] w-[28rem] rounded-full bg-pink-300/18 blur-3xl" />
  </div>
);

// About Me Card Component
const AboutMeCard = () => (
  <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl px-4 sm:px-8 py-8 flex flex-col md:flex-row items-center md:items-center border border-white/20">
    {/* Profile Picture */}
    <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto mb-4 md:mb-0 md:mr-8">
      <div className="w-32 h-32 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg flex items-center justify-center">
        <img
          src="/kozik4.PNG"
          alt="Profile"
          className="object-cover w-full h-full"
          style={{ objectPosition: '45% 52%', transform: 'scale(1.05)' }}
        />
      </div>
    </div>
    {/* Content */}
    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-2 sm:gap-4">
      {/* Greeting */}
      <div className="text-lg sm:text-xl font-medium text-gray-700 mb-1 flex items-center gap-2">
        <span role="img" aria-label="wave">👋</span> Hello, I'm
      </div>
      {/* Name */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-1">Alex</h1>
      {/* Subtitle */}
      <div className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">Software/ML Engineer</div>
      {/* Intro Paragraph */}
      <p className="text-base sm:text-lg text-gray-700 max-w-xl mb-6">
        I am a <span className="font-bold">first-generation</span> college student starting an M.S. at <span className="text-red-500 font-semibold">Carnegie Mellon University</span> in the fall. I have a B.A. in mathematics and computer science from <span className="text-red-500 font-semibold">Cornell University</span>, specializing in <span className="font-bold">machine learning</span> and <span className="font-bold">software engineering</span>.<br /><br />
        In my free time, I enjoy working on personal projects, working out, and reading.<br /><br />
        Welcome to my website!
      </p>
      {/* Buttons */}
      <div className="flex flex-row gap-2 sm:gap-4 mt-2 flex-wrap">
        <a
          href="https://linkedin.com/in/alex-kozik"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl bg-white/20 text-gray-800 font-semibold shadow-md border border-white/20 hover:bg-gradient-to-r hover:from-blue-500/40 hover:to-purple-500/40 hover:text-blue-700 transition text-base backdrop-blur-md"
        >
          <FaLinkedin size={18} />
          LinkedIn
        </a>
        <a
          href="mailto:alex.kozik3141@gmail.com"
          className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl bg-white/20 text-gray-800 font-semibold shadow-md border border-white/20 hover:bg-gradient-to-r hover:from-blue-500/40 hover:to-purple-500/40 hover:text-blue-700 transition text-base backdrop-blur-md"
        >
          <FaEnvelope size={18} />
          Email
        </a>
        <a
          href="https://github.com/LambdaAK"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl bg-white/20 text-gray-800 font-semibold shadow-md border border-white/20 hover:bg-gradient-to-r hover:from-blue-500/40 hover:to-purple-500/40 hover:text-blue-700 transition text-base backdrop-blur-md"
        >
          <FaGithub size={18} />
          GitHub
        </a>
      </div>
    </div>
  </div>
);

// Education Section Component
interface EducationItem {
  name: string;
  logo: string;
  degree: string;
  major: string;
  gpa: string;
  date: string;
  courses: string[];
  /** Other M.S. admits (not this school); collapsible list on the card. */
  admittedToPrograms?: string[];
}

const educationData: EducationItem[] = [
  {
    name: 'Carnegie Mellon University',
    logo: '/CMU.png',
    degree: 'Master of Science',
    major: 'Computer Science',
    gpa: 'Beginning Fall 2026',
    date: 'Aug 2026 - ',
    courses: [],
    admittedToPrograms: otherMsProgramOffers,
  },
  {
    name: 'Cornell University',
    logo: '/cornell-logo.png',
    degree: "Bachelor of Arts, Honors",
    major: 'Double Major: Mathematics & Computer Science',
    gpa: 'GPA: 4.11/4.3 (top 1%)',
    date: 'Aug 2022 - May 2026',
    courses: [
      'CS 2112 - Honors OOP & Data Structures (A)',
      'CS 2800 - Discrete Math (A-)',
      'CS 3110 - Data Structures and Functional Programming (A)',
      'CS 3410 - Computer Systems Organization (A)',
      'CS 4110 - Programming Languages and Logics (A+)',
      'CS 4414 - Systems Programming (A)',
      'CS 4701 - AI Practicum (A+)',
      'CS 4780 - Machine Learning (A+)',
      'CS 4782 - Deep Learning (A+)',
      'CS 4820 - Analysis of Algorithms (A)',
      'CS 4998 x 3 - Team Projects (A+, A+, A+)',
      'CS 4999 x 2 - Independent Reading and Research (A+, A+)',
      'CS 6783* - Machine Learning Theory (A)',
      'CS 7190* x 2 - Seminar in PL/Compilers',
      'MATH 2210 - Linear Algebra (A)',
      'MATH 2220 - Multivariable Calculus (A-)',
      'MATH 3110 - Real Analysis (A+)',
      'MATH 3360 - Applicable Algebra (A+)',
      'MATH 4220 - Complex Analysis (A+)',
      'MATH 4310 - Advanced Linear Algebra (A+)',
      'MATH 4710 - Probability (A)',
    ],
  },
  {
    name: 'Central Bucks High School South',
    logo: '/cs-south-logo.png',
    degree: 'High School Diploma',
    major: 'STEM Focus',
    gpa: 'GPA: 4.32/4.0, Summa Cum Laude',
    date: '2018-2022',
    courses: [
      'AP Calculus AB',
      'AP Calculus BC',
      'AP Statistics',
      'AP Physics C',
      'AP Chemistry',
      'AP Biology',
      'AP Computer Science A',
      'AP Microeconomics',
    ],
  },
];

const OtherMsAdmitsCollapsible = ({ programs }: { programs: string[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <p className="text-sm text-gray-600 leading-relaxed mb-2">
        Also admitted to {programs.length} other M.S. program{programs.length === 1 ? '' : 's'} (CMU is where I am enrolled).
      </p>
      <button
        type="button"
        className="px-4 py-1.5 rounded-full bg-white/10 text-gray-800 font-semibold backdrop-blur-lg border border-white/20 shadow-lg transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-blue-500/30 hover:text-cyan-700 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 text-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? 'Hide other programs' : 'Show other programs'}
      </button>
      {open && (
        <div className="mt-2 overflow-hidden">
          <ul className="list-disc list-inside ml-1 text-gray-600 text-sm space-y-1">
            {programs.map((school, i) => (
              <li key={`${school}-${i}`}>{school}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const EducationCard = ({ edu }: { edu: EducationItem }) => {
  const [showCourses, setShowCourses] = useState(false);
  const cmuLogo = edu.logo === '/CMU.png';

  return (
    <div className="w-full flex flex-row items-stretch bg-white/5 rounded-2xl shadow-lg border border-white/10 p-0">
      {/* Logo on the left */}
      <div className="flex items-center justify-center min-w-[120px] max-w-[160px] rounded-l-2xl p-4">
        {cmuLogo ? (
          <div className="flex items-center justify-center w-20 h-20 rounded-xl flex-shrink-0">
            <img
              src={edu.logo}
              alt={edu.name + ' logo'}
              className="object-contain w-16 h-16 rounded-lg"
              loading="lazy"
            />
          </div>
        ) : (
          <img
            src={edu.logo}
            alt={edu.name + ' logo'}
            className="object-contain w-24 h-16 rounded-2xl"
            loading="lazy"
          />
        )}
      </div>
      {/* Details on the right */}
      <div className="flex-1 flex flex-col justify-between p-5 gap-2">
        <div className="flex flex-row items-start justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-xl font-bold text-gray-800 leading-tight">
              {edu.degree} - {edu.name}
            </h3>
            <span className="block text-blue-500 text-base font-medium mt-1">{edu.major}</span>
          </div>
        </div>
        <>
          <div className="flex flex-row items-center gap-4 mt-1">
            {edu.gpa ? <span className="text-base text-gray-600">{edu.gpa}</span> : null}
            {edu.courses.length > 0 && (
              <button
                type="button"
                className="px-4 py-1.5 rounded-full bg-white/10 text-gray-800 font-semibold backdrop-blur-lg border border-white/20 shadow-lg transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-blue-500/30 hover:text-cyan-700 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 text-sm"
                onClick={() => setShowCourses((prev) => !prev)}
              >
                {showCourses ? 'Hide Relevant Courses' : 'Show Relevant Courses'}
              </button>
            )}
          </div>
          {edu.admittedToPrograms && edu.admittedToPrograms.length > 0 ? (
            <OtherMsAdmitsCollapsible programs={edu.admittedToPrograms} />
          ) : null}
          {showCourses && edu.courses.length > 0 && (
              <div className="mt-2 overflow-hidden">
                <span className="font-semibold text-gray-700">Relevant Courses:</span>
                {edu.name === 'Cornell University' ? (
                  <div className="ml-3 mt-1">
                    <div className="text-gray-500 text-xs mb-2 italic">
                      <div>* = Graduate course</div>
                      <div>x n = taken n times</div>
                    </div>
                    <span className="font-semibold text-blue-500">Computer Science:</span>
                    <ul className="list-disc list-inside ml-3 text-gray-600 text-sm">
                      {edu.courses.slice(0, 14).map((course) => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                    <span className="font-semibold text-blue-500">Mathematics:</span>
                    <ul className="list-disc list-inside ml-3 text-gray-600 text-sm">
                      {edu.courses.slice(14, 21).map((course) => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <ul className="list-disc list-inside ml-3 mt-1 text-gray-600 text-sm">
                    {edu.courses.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
        </>
      </div>
    </div>
  );
};

const EducationSection = () => (
  <div className="flex flex-col gap-2 items-center justify-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-3">Education</h2>
    <div className="flex flex-col gap-4 w-full max-w-5xl">
      {educationData.map((edu) => (
        <EducationCard key={edu.name} edu={edu} />
      ))}
    </div>
  </div>
);

// Experience Section Component
const experienceData = [
  {
    company: 'Salesforce',
    logo: '/Salesforce.com_logo.svg.png',
    position: 'Software Engineer Intern',
    duration: 'Jun 2025 - Aug 2025',
    description: [
      'Develop custom virtual formula field functionality in Salesforce Data Cloud, empowering customers to create dynamic data transformations without code and enabling self-service analytics capabilities.',
      'Build scalable backend services using Java and Apache Spark for formula computations on distributed metadata services, enabling processing that scales automatically with customer data volume.',
      'Implement REST API endpoints with robust error handling and validation, providing developers with reliable programmatic access to formula field operations and reducing integration complexity.',
      'Create intuitive React and TypeScript frontend interface that simplifies virtual formula field creation and data exploration, dramatically improving user experience and accelerating customer onboarding.'
    ],
  },
  {
    company: 'Cornell Course Management System',
    logo: '/CMSX-logo.svg',
    mainTitle: 'Software Engineer',
    subroles: [
      {
        course: 'President & Software Engineering Lead',
        duration: 'Aug 2025 - Present',
        description: [
          "Maintain Cornell's official CS course management system, used by 10,000+ students, ensuring efficiency and reliability.",
          "Oversee operations on the team, including project management, architecture decisions, team coordination, recruitment, and onboarding",
          "Received several A+s of academic research credit through intensive technical work on the team",
          "Lead a team of developers in rewriting our JSP website in React, modernizing the platform and enhancing responsiveness."
        ],
      },
      {
        course: 'Vice-President & Frontend Engineering Lead',
        duration: 'Aug 2024 - Aug 2025',
        description: [
   
          'Mentored junior developers and conducted code reviews',
          'Lead the recruitment process',
          'Migrated CMSX from Redux to a component-level state system, creating a scalable foundation for future development.',
          'Designed 10+ APIs and serializable data structures, allowing secure data transfer between the backend and frontend.',
          'Implemented the student-facing frontend using MUI component library, offering phenomenal user experience and reliability.'
        ],
      },
      {
        course: 'Full Stack Engineer',
        duration: 'Aug 2023 - Aug 2024',
        description: [
  
          'Worked on both frontend and backend components using React, TypeScript, and Java',
         
          'Implemented a parser for CSVs in Java and UI in JSP, enabling professors to grant assignment extensions via file upload.'
        ],
      },
    ],
  },
  {
    company: 'Cornell Generative AI',
    logo: '/generative_ai_at_cornell_logo.jpeg',
    position: 'Founding Member and Machine Learning Engineer',
    duration: 'Jan 2025 - Present',
    description: [
      'Developed AI agent for QuickFi, a commercial lending technology company, automating insurance certificate validation and compliance verification processes, reducing operational costs.',
      'Built frontend and vector database for ClassGPT, enabling professors to create AI tutors for classes.'
    ],
  },
  {
    company: 'Carnegie Mellon University',
    logo: '/CMU.png',
    position: 'Software Engineer and Research Intern',
    duration: 'May 2024 - Aug 2024',
    description: [
      'Worked on the interpreter for SASyLF, a language for writing proofs, implementing core features in Java.',
      'Implemented a polymorphic type system for SASyLF, similar to Java generics, enabling type-safe code reuse and significantly reducing duplication in proofs by allowing abstraction over multiple data types.',
      'Created a modular testing framework using Python to automate integration tests, ensuring reliability.'
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
    <h2 className="text-3xl font-bold text-gray-800 mb-3">Experience</h2>
    <div className="flex flex-col gap-4 w-full max-w-5xl">
      {experienceData.map((exp) => (
        <div
          key={exp.company + (exp.position || exp.mainTitle || '')}
          className="w-full bg-white/5 rounded-2xl shadow-lg border border-white/10 p-6"
        >
          {/* Desktop layout (md and up) */}
          <div className="hidden md:flex flex-row items-start gap-6">
            {/* Logo section */}
            <div className="flex items-center justify-center w-20 h-20 rounded-xl flex-shrink-0">
              <img
                src={exp.logo}
                alt={exp.company + ' logo'}
                className="object-contain w-16 h-16 rounded-lg"
                loading="lazy"
              />
            </div>
            
            {/* Content section */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-row items-start justify-between flex-wrap gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 leading-tight">
                    {exp.company}
                    {(exp.position || exp.mainTitle) && (
                      <span className="text-lg font-medium text-gray-700 ml-2">
                        - {exp.position || exp.mainTitle}
                      </span>
                    )}
                  </h3>
                </div>
                <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                  {exp.duration || ''}
                </span>
              </div>
              
              {/* Subroles (for TA positions) */}
              {exp.mainTitle && exp.subroles ? (
                <div className="flex flex-col gap-4">
                  {exp.subroles.map((sub) => (
                    <div key={sub.course + sub.duration} className="border-l-2 border-cyan-400/30 pl-4">
                      <div className="flex flex-row items-center gap-2 mb-2">
                        <span className="text-base font-semibold text-gray-800">{sub.course}</span>
                        <span className="text-sm text-blue-700 font-medium">{sub.duration}</span>
                      </div>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        {sub.description.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-cyan-600 mt-1.5 w-1 h-1 bg-cyan-600 rounded-full flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                Array.isArray(exp.description) && (
                  <ul className="space-y-1 text-gray-600 text-sm">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-600 mt-1.5 w-1 h-1 bg-cyan-600 rounded-full flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>
          </div>

          {/* Mobile layout (xs and sm) */}
          <div className="md:hidden flex flex-col">
            {/* Top section: Logo, name, and duration */}
            <div className="flex flex-row items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl flex-shrink-0">
                <img
                  src={exp.logo}
                  alt={exp.company + ' logo'}
                  className="object-contain w-12 h-12 rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-800 leading-tight">
                  {exp.company}
                  {(exp.position || exp.mainTitle) && (
                    <span className="text-base font-medium text-gray-700 ml-2">
                      - {exp.position || exp.mainTitle}
                    </span>
                  )}
                </h3>
                <span className="text-sm text-gray-600 font-medium">
                  {exp.duration || ''}
                </span>
              </div>
            </div>
            
            {/* Bottom section: Description */}
            <div className="flex-1 min-w-0">
              {/* Subroles (for TA positions) */}
              {exp.mainTitle && exp.subroles ? (
                <div className="flex flex-col gap-4">
                  {exp.subroles.map((sub) => (
                    <div key={sub.course + sub.duration} className="border-l-2 border-cyan-400/30 pl-4">
                      <div className="flex flex-row items-center gap-2 mb-2">
                        <span className="text-base font-semibold text-gray-800">{sub.course}</span>
                        <span className="text-sm text-blue-700 font-medium">{sub.duration}</span>
                      </div>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        {sub.description.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-cyan-600 mt-1.5 w-1 h-1 bg-cyan-600 rounded-full flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                Array.isArray(exp.description) && (
                  <ul className="space-y-1 text-gray-600 text-sm">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-600 mt-1.5 w-1 h-1 bg-cyan-600 rounded-full flex-shrink-0"></span>
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

interface SkillCategory {
  title: string;
  summary: string;
  skills: string[];
}

const skillsData: SkillCategory[] = [
  {
    title: 'Languages',
    summary: 'Programming languages used across software, systems, and ML projects.',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C/C++', 'Go', 'Rust', 'SQL', 'HTML/CSS', 'OCaml'],
  },
  {
    title: 'Frontend',
    summary: 'UI frameworks and tools for building modern web and desktop interfaces.',
    skills: ['React', 'Next.js', 'Redux', 'Material-UI', 'TailwindCSS', 'SASS', 'JavaFX', 'Electron.js', 'JSP'],
  },
  {
    title: 'Backend & Databases',
    summary: 'APIs, services, and data infrastructure used in production systems.',
    skills: ['Express.js', 'Flask', 'Firebase', 'Apache Spark', 'REST APIs', 'Node.js', 'Pinecone'],
  },
  {
    title: 'ML Frameworks & Libraries',
    summary: 'Core libraries for model training, experimentation, and data processing.',
    skills: ['PyTorch', 'TensorFlow', 'NumPy', 'Pandas', 'Scikit-learn', 'OpenCV', 'Matplotlib'],
  },
  {
    title: 'DevOps & Tools',
    summary: 'Infrastructure, build systems, and developer workflow tooling.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Git', 'Linux', 'Gradle', 'Maven', 'JUnit', 'Jest', 'Vite'],
  },
  {
    title: 'Machine Learning',
    summary: 'Applied ML domains and model families.',
    skills: ['Neural Networks', 'Computer Vision', 'NLP', 'Reinforcement Learning', 'Deep Learning'],
  },
];

const SkillsSection = () => (
  <div className="flex flex-col gap-6 items-center justify-center min-h-[56vh]">
    <h2 className="text-3xl font-bold text-gray-800 mb-3">Skills</h2>
    <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
      Technologies and areas I use most across software engineering and machine learning work.
    </p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-5xl">
      {skillsData.map((category) => (
        <div
          key={category.title}
          className="w-full bg-white/5 rounded-2xl shadow-lg border border-white/10 hover:scale-[1.01] transition-transform duration-200 p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 leading-tight">{category.title}</h3>
          <p className="text-gray-600 text-sm mt-2 mb-4">{category.summary}</p>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-full bg-white/10 text-gray-700 text-xs sm:text-sm font-medium border border-white/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
// Featured Projects Data
const featuredProjects = [
  {
    name: "Forge - Compiler & Interpreter",
    description:
      "Forge is a custom functional programming language with a performant interpreter, type inference, and a native backend: typechecked core → Min IR → LLVM IR, linked with a C runtime via clang.",
    tech: ["OCaml", "LLVM", "C"],
    github: "https://github.com/LambdaAK/Forge",
    demo: "https://forgepl.netlify.app/",
    image: "/Forge.png",
    highlights: [
      "Built interpreter for Forge, achieving 50% speed improvement over Python.",
      "Designed parser and type inference algorithm to validate programs and provide developer feedback.",
      "Implemented core language features including pattern matching, functions, and polymorphism.",
      "Native pipeline: Min IR → LLVM IR → clang-linked executables with the C runtime.",
      "Monomorphized lowering with curried closures, tuples, lists, and control flow; integration-tested typed subset."
    ]
  },
  {
    name: "Atlas - End-to-End LLM Infrastructure",
    description: "A 50.7 million-parameter decoder-only transformer, built from scratch in PyTorch, that learns to maintain and reason about world state. Trained on synthetically generated multi-turn conversations, the model tracks object possession through transfers between people and accurately answers natural-language queries such as \"Who has the ball?\" and \"How many things does Alice have?\"",
    tech: ["PyTorch", "Python", "Transformer", "Redis", "Docker", "Kubernetes", "PostgreSQL"],
    github: "https://github.com/LambdaAK/Atlas",
    demo: null,
    image: "/TinyGPT.png",
    highlights: [
      "Built a 50M-param GPT-style transformer from scratch for conversational reasoning and state tracking.",
      "Trained on 300K synthetic conversations using masked loss with AdamW and cosine decay.",
      "Built a distributed inference system with Redis + batching, sustaining 110 req/s at 140 ms P95 latency.",
      "Containerized stack with Docker and Kubernetes, scaling to 8 pods with persistent PostgreSQL storage."
    ]
  },
  {
    name: "C-Torch - C++ Machine Learning Library",
    description: "High-performance math library supporting numerical methods, calculus, and linear algebra. Includes 15+ ML models and RL agents.",
    tech: ["C++"],
    github: "https://github.com/LambdaAK/c-torch",
    demo: null,
    image: "/C torch logo.png",
    paper: "/Low-Level Learning.pdf",
    highlights: [
      "Developed a high-performance math library supporting numerical methods, calculus, and linear algebra.",
      "Implemented 15+ ML models, such as neural networks, achieving 99%+ accuracy on classification tasks.",
      "Implemented DQN and Policy Gradient agents achieving 97%+ win rates in autonomous gameplay.",
      "Achieved 26x performance speedup through compiler optimizations and parallelization techniques."
    ]
  },
  {
    name: "dX - Math & ML Lab",
    description: "Browser-based interactive sandbox for applied mathematics and machine learning. Features labs for stochastic processes (SDEs, Markov chains), probability theory (LLN, CLT), reinforcement learning (bandits, MDPs), supervised learning (regression, classification, decision trees, ensembles, SVM), clustering (K-means, DBSCAN, PCA), optimization (simplex, gradient descent), linear algebra (eigenvalues, matrix factorizations), and physics simulations (pendulum, heat equation in 1D/2D/3D). All numerical methods and visualizations run entirely client-side with interactive parameter controls.",
    tech: ["Math", "TypeScript", "React"],
    github: "https://github.com/LambdaAK/dX",
    demo: "https://dxlab.netlify.app/",
    image: "/dX.png",
    highlights: [
      "Implements stochastic differential equations with Euler-Maruyama and RK4 integration methods.",
      "Features discrete and continuous-time Markov chains with transition matrix visualization.",
      "Includes multi-armed bandit algorithms (Epsilon-Greedy, UCB, Thompson Sampling) and RL algorithms.",
      "Provides supervised learning models (linear/logistic regression) and clustering (K-means, DBSCAN, KNN).",
      "All simulations, fitting, and numerical methods run entirely in the browser—no backend required."
    ]
  }
];

// Categorized Projects Data
const machineLearningProjects = [
  {
    name: "Snake DQN - AI Snake Game Agent",
    description: "A Deep Q-Network (DQN) reinforcement learning implementation for the classic Snake game. Features an AI agent that learns optimal strategies through 29-dimensional state representation, intelligent reward functions, and anti-looping mechanisms. The agent achieves scores of 20-40+ points through sophisticated spatial reasoning and strategic planning.",
    tech: ["Python", "PyTorch", "Reinforcement Learning"],
    github: "https://github.com/LambdaAK/SnakeDQN",
    demo: null,
    image: "/new-snake-logo.png",
    highlights: [
      "Implements DQN with 4-layer neural network for Snake game navigation.",
      "Uses 29-dimensional state representation including danger detection and spatial awareness.",
      "Features intelligent reward functions and anti-looping mechanisms for optimal performance.",
      "Achieves scores of 20-40+ points through strategic planning and spatial reasoning.",
      "Includes interactive testing modes and comprehensive training visualization."
    ]
  },
  {
    name: "Visual Attention Image Captioning - Show, Attend, Tell Implementation",
    description: "A deep learning model that automatically generates descriptive captions for images using visual attention. Implements the Show, Attend, Tell architecture and achieves superior METEOR scores. Final project for CS 4782 - Deep Learning.",
    tech: ["PyTorch", "Python", "LSTM", "CNN"],
    github: "https://github.com/LambdaAK/CS-4782-Final-Project",
    demo: null,
    image: "/image captioning logo.png",
    paper: "/ShowAttendTell Report.pdf",
    highlights: [
      "Developed a model that generates natural language captions for images using attention-based mechanisms.",
      "Implemented both soft and hard visual attention with REINFORCE and backpropagation for effective training.",
      "Built an encoder-decoder architecture with ResNet-50 and LSTM, including attention visualization to interpret model focus."
    ]
  },
  {
    name: "MCTSLab - Monte Carlo Tree Search Framework",
    description: "MCTSLab is a small Python framework for Monte Carlo Tree Search. It includes UCT and a Flat UCB variant, playable games (tic-tac-toe, Connect Four, 2048), tree visualization, and a benchmark script that measures MCTS win rate against a random player.",
    tech: ["Python"],
    github: "https://github.com/LambdaAK/MCTSLab",
    demo: null,
    image: "/MCTSLab logo.png",
    imageSize: "xl" as const,
    highlights: [
      "UCT and Flat UCB with tic-tac-toe, Connect Four, and 2048.",
      "Tree visualization and benchmark script (MCTS vs random)."
    ]
  },
  {
    name: "CoinBot - Reinforcement Learning 2D Navigation Bot",
    description: "A reinforcement learning agent that navigates a 2D world using Q-learning and Deep Q-Networks (DQN). CoinBot learns optimal movement strategies through trial and error, demonstrating core RL concepts with real-time learning visualizations.",
    tech: ["Python", "PyTorch", "NumPy", "Matplotlib"],
    github: "https://github.com/LambdaAK/CoinBot",
    demo: null,
    image: "/CoinBot Logo Design.png",
    highlights: [
      "Implements both tabular Q-learning and DQN for 2D navigation tasks.",
      "Visualizes agent learning progress and policy evolution in real time.",
      "Supports custom reward structures, DQN state representations, and environment configurations.",
      "Achieved 100% success rate after training."
    ]
  },
  {
    name: "English2Logic",
    description: "A transformer that translates natural English into propositional logic. Synthetic data pipeline (formula generator + English realizer) trains without human-labeled data. ~88% exact-match accuracy on nested formulas; ~30 min on an A100.",
    tech: ["PyTorch", "Python", "Transformer"],
    github: "https://github.com/LambdaAK/English2Logic",
    demo: null,
    image: "/English2Logic.png",
    imageSize: "xl" as const,
    highlights: [
      "Handles varied phrasings: \"if A then B\", \"both A and B\", \"it is not the case that A\" → formal logic notation.",
      "End-to-end synthetic pipeline eliminates need for human-labeled training data."
    ]
  },
  {
    name: "BanditBot - Multi-Armed Bandit Algorithm Library",
    description: "A comprehensive library for simulating and benchmarking Multi-Armed Bandit (MAB) algorithms, including Epsilon-Greedy, UCB, Thompson Sampling, neural network-based contextual bandits, and more. Designed for research, teaching, and practical experimentation.",
    tech: ["Python", "NumPy", "Matplotlib"],
    github: "https://github.com/LambdaAK/BanditBot",
    demo: null,
    image: "/BanditBot.png",
    highlights: [
      "Implements classic and advanced MAB algorithms: Epsilon-Greedy, UCB, Thompson Sampling, Softmax, and neural network-based contextual bandits.",
      "Provides a flexible simulation environment for comparing algorithm performance on custom bandit problems.",
      "Includes visualization tools for reward distributions, regret, and action selection over time.",
      "Well-documented and modular codebase, ideal for both research and teaching applications."
    ]
  },
  {
    name: "CourseSphere - LLM-powered course recommendation system",
    description: "AI-powered assistant for Cornell students that matches users to courses and professors based on their academic interests, backgrounds, and goals. Aggregates course and professor data for quick, informed decisions.",
    tech: ["TypeScript", "Python", "Jupyter Notebook", "SCSS", "Pinecone"],
    github: "https://github.com/LambdaAK/CourseSphere",
    demo: null,
    image: "/CourseSphere logo.png",
    highlights: [
      "Matches students to courses and professors based on academic interests and goals.",
      "Aggregates course and professor data for quick, informed decisions.",
      "Uses Pinecone, a vector database, for fast and intelligent course matching.",
      "Features a modern, user-friendly frontend for a seamless experience.",
      "Database includes 19k courses and 8k faculty."
    ]
  }
];

const softwareEngineeringProjects = [
  {
    name: "TriageForce - AI-Powered Disaster Relief Platform",
    description: "Automated disaster relief resource allocation via Agentic AI and Salesforce Agentforce, drastically cutting waste and achieving real-time response.",
    tech: ["Salesforce Agentforce", "Salesforce Data Cloud", "Salesforce Service Cloud"],
    github: "https://github.com/LambdaAK/agent-hackathon",
    demo: null,
    image: "/Salesforce.com_logo.svg.png",
    highlights: [
      "Placed as finalist in Salesforce Agentforce Virtual Hackathon - built in 1 day during Salesforce internship.",
      "Leveraged 5 specialized Salesforce Agentforce agents to automate entire disaster relief workflow.",
      "Designed and implemented a sophisticated, user-friendly interface for real-time disaster relief coordination.",
      "Scaled operations for 25-person team managing global disaster relief with 5,000+ product types."
    ]
  },
  {
    name: "ObsidianDB - SQL Database Engine",
    description: "SQL database engine in C++ built from scratch—custom lexer, parser, and in-memory execution. No external SQL libraries.",
    tech: ["C++"],
    github: "https://github.com/LambdaAK/ObsidianDB",
    demo: null,
    image: "/ObsidianDB logo.png",
    imageSize: "lg" as const,
    highlights: [
      "Hand-built lexer and recursive-descent parser; full parsing and execution pipeline implemented from scratch.",
      "SQL subset: CREATE TABLE, INSERT, SELECT with WHERE predicates and ORDER BY clauses.",
      "Interactive REPL with meta-commands (.tables, .schema) for introspection.",
      "Typed columns: INT, FLOAT, STRING—no external SQL libraries used."
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
    name: "Orb - Particle Simulator",
    description: "Interactive particle sandbox — C++, SDL2, OpenGL. A real-time 2D physics sandbox where you place particles and gravity wells, then watch them move, collide, and leave trails. Built in C++ with SDL2 for windowing and input and OpenGL for rendering.",
    tech: ["C++", "OpenGL"],
    github: "https://github.com/LambdaAK/Orb",
    demo: null,
    image: "/Orb logo.png",
    imageSize: "lg" as const,
    highlights: [
      "Place & play: Click-drag to spawn particles (with initial velocity) or add gravity wells; drag wells to move them.",
      "Physics: Gravity, elastic particle–particle and wall collisions, configurable restitution.",
      "Time control: Slider and keyboard shortcuts to run the simulation from 0.1× to 10× speed; pause with Space.",
      "Visuals: Glowing particle trails, clear well indicators, separate tool panel with time readout."
    ]
  },
  {
    name: "Portfolio Website",
    description: "This portfolio website",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/LambdaAK/Alex-Kozik-Portfolio",
    demo: null,
    image: "/ak logo.png"
  }
];

const Projects = () => (
  <div className="flex flex-col gap-6 items-center justify-center min-h-[56vh]">
    <h2 className="text-3xl font-bold text-gray-800 mb-3">Projects</h2>
    <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">Primarily independent work, done in my own time.</p>
    <div className="flex flex-col gap-8 w-full max-w-6xl">
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Featured Projects</h3>
        <p className="text-gray-600 text-center mb-4 max-w-2xl mx-auto">
          My most substantial projects.
        </p>
        <div className="flex flex-col gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">ML/AI Projects</h3>
        <p className="text-gray-600 text-center mb-4 max-w-2xl mx-auto">
          Deep learning, reinforcement learning, and AI-powered applications.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {machineLearningProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Software Engineering Projects</h3>
        <p className="text-gray-600 text-center mb-4 max-w-2xl mx-auto">
          Full-stack applications and more.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {softwareEngineeringProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Technical Papers/Documents Section
interface TechnicalPaper {
  title: string;
  authors?: string;
  date?: string;
  description: string;
  link?: string | null;
  pdf?: string | null;
  venue?: string;
  tags?: string[];
  image?: string | null;
}

const technicalPapersData: TechnicalPaper[] = [
  {
    title: "Voting-Based Multi-Agent Bandits",
    description: "A research paper exploring multi-armed bandit algorithms in multi-agent systems using voting mechanisms. My final project for CS 6783 - Machine Learning Theory.",
    pdf: "/Voting-Based Multi-Agent Bandits.pdf",
    image: "/bandits.png",
    tags: ["Machine Learning Theory", "Reinforcement Learning", "Multi-Armed Bandits", "Multi-Agent Systems"]
  },
  {
    title: "From Redux to Component-level State: Modernizing CMSX Architecture",
    description: "A comprehensive technical document detailing the migration of Cornell's Course Management System (CMSX) from Redux-facilitated global state to component-level state architecture. I worked on this project from Jan 2024 to Dec 2024, receiving academic research credit through CS 4999. This migration yielded a massive improvement in both developer experience and user experience.",
    pdf: "/From Redux to Component-level State Modernizing CMSX Architecture.pdf",
    image: "/CMSX-logo.svg",
    tags: ["React", "TypeScript", "Software Architecture", "State Management", "Frontend Engineering", "Performance Optimization"]
  },
  {
    title: "Low-Level Learning",
    description: "A technical document on low-level learning approaches and methodologies. My project for CS 4701 - Practicum in Artificial Intelligence. We implemented the C-Torch library in C++, a high-performance machine learning library supporting numerical methods, calculus, linear algebra, and 15+ ML models.",
    pdf: "/Low-Level Learning.pdf",
    image: "/C torch logo.png",
    tags: ["Machine Learning", "C++", "Deep Learning", "Neural Networks", "Reinforcement Learning"]
  },
  {
    title: "Show, Attend, Tell: Visual Attention for Image Captioning",
    description: "Technical report on implementing the Show, Attend, Tell architecture for generating descriptive captions for images using visual attention mechanisms. Final project for CS 4782 - Deep Learning.",
    pdf: "/ShowAttendTell Report.pdf",
    image: "/image captioning logo.png",
    tags: ["Deep Learning", "Computer Vision", "Natural Language Processing", "Attention Mechanisms"]
  }
];

// Awards Section
interface Award {
  title: string;
  organization: string;
  description: string;
  date: string;
  icon: 'graduation' | 'microscope' | 'code' | 'pi' | 'award' | 'star' | 'users' | 'pbk' | 'heart';
}

const awardsData: Award[] = [
  {
    title: "Phi Beta Kappa Graduation Scholarship",
    organization: "Phi Beta Kappa Honor Society (Cornell University)",
    description: "Competitive scholarship awarded to select graduating Phi Beta Kappa members for academic excellence. One of about 10 recipients from the Cornell graduating class; $3,000 award.",
    date: "Apr 2026",
    icon: "pbk"
  },
  {
    title: "Phi Beta Kappa",
    organization: "The Phi Beta Kappa Society",
    description: "Inducted into the oldest and most prestigious academic honor society in the United States. About 1% of college seniors in the U.S. are invited.",
    date: "2026",
    icon: "pbk"
  },
  {
    title: "Summa Cum Laude in Computer Science",
    organization: "Cornell University",
    description: "Awarded for excelling in research, undertaking graduate-level coursework in addition to the standard CS major requirements, and graduating with above a 4.0 GPA.",
    date: "2025",
    icon: "code"
  },
  {
    title: "Cum Laude in Mathematics",
    organization: "Cornell University",
    description: "Earned by demonstrating exceptional performance in the mathematics curriculum, attaining a math major GPA of 4.16/4.3.",
    date: "2025",
    icon: "pi"
  },
  {
    title: "NSF Research Experience for Undergraduates (REU)",
    organization: "Carnegie Mellon University",
    description: "Competitively selected for CMU's NSF-funded REUSE program to conduct summer research in programming languages and software engineering. Received a full research stipend.",
    date: "2024",
    icon: "microscope"
  },
  {
    title: "CS Course Staff Award",
    organization: "Cornell University",
    description: "Awarded to the top 10% of teaching assistants for exceptional teaching performance; received while TAing CS 3110 (Data Structures and Functional Programming).",
    date: "2024",
    icon: "award"
  },
  {
    title: "Dean's List",
    organization: "Cornell University",
    description: "Recognizes students with GPA of 3.6 or higher; received every eligible semester throughout undergraduate career.",
    date: "2022 - 2025",
    icon: "star"
  },
  {
    title: "AP Scholar with Distinction",
    organization: "College Board",
    description: "Took 8 AP courses and received high scores on exams.",
    date: "2022",
    icon: "users"
  },
  {
    title: "Boomerang Youth Recognition Award",
    organization: "Central Bucks School District",
    description: "Recognized for outstanding volunteer work promoting equality and social justice through community organizations.",
    date: "2022",
    icon: "heart"
  }
];

const AwardsSection = () => (
  <div className="flex flex-col gap-6 items-center justify-center min-h-[56vh]">
    <h2 className="text-3xl font-bold text-gray-800 mb-3">Awards & Honors</h2>
    <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
      Recognition for academic excellence, research, and teaching.
    </p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-5xl">
      {awardsData.map((award, index) => (
        <AwardCard key={index} award={award} />
      ))}
    </div>
  </div>
);

const AwardCard = ({ award }: { award: Award }) => {
  const getIcon = () => {
    const iconProps = { size: 20, className: "text-gray-600" };
    switch (award.icon) {
      case 'pbk':
        return <span className="text-lg font-semibold text-gray-600">ΦΒΚ</span>;
      case 'pi':
        return <span className="text-xl font-semibold text-gray-600">π</span>;
      case 'graduation':
        return <GraduationCap {...iconProps} />;
      case 'microscope':
        return <Microscope {...iconProps} />;
      case 'code':
        return <Code {...iconProps} />;
      case 'award':
        return <Award {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      case 'users':
        return <Users {...iconProps} />;
      case 'heart':
        return <Heart {...iconProps} />;
      default:
        return <Award {...iconProps} />;
    }
  };

  return (
    <div className="w-full bg-white/5 rounded-2xl shadow-lg border border-white/10 p-6">
      <div className="flex flex-row items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-row items-start justify-between gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-800 leading-tight">
              {award.title}
            </h3>
            <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
              {award.date}
            </span>
          </div>
          <p className="text-blue-600 text-sm font-medium mb-2">
            {award.organization}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            {award.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const TechnicalPapersSection = () => (
  <div className="flex flex-col gap-6 items-center justify-center min-h-[56vh]">
    <h2 className="text-3xl font-bold text-gray-800 mb-3">Papers</h2>
    <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
      Research papers, technical documents, and academic writings.
    </p>
    <div className="flex flex-col gap-4 w-full max-w-5xl">
      {technicalPapersData.length > 0 ? (
        technicalPapersData.map((paper, index) => (
          <PaperCard key={index} paper={paper} />
        ))
      ) : (
        <div className="w-full bg-white/5 rounded-2xl shadow-lg border border-white/10 p-8 text-center">
          <FileText className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600 text-lg">
            Papers and documents will appear here. Add them to the <code className="bg-white/10 px-2 py-1 rounded">technicalPapersData</code> array in App.tsx.
          </p>
        </div>
      )}
    </div>
  </div>
);

const PaperCard = ({ paper }: { paper: TechnicalPaper }) => {
  return (
    <div className="w-full bg-white/5 rounded-2xl shadow-lg border border-white/10 p-6">
      {/* Desktop layout (md and up) */}
      <div className="hidden md:flex flex-row items-start gap-6">
        {/* Icon/Image section */}
        <div className="flex items-center justify-center w-16 h-16 rounded-xl flex-shrink-0">
          {paper.image ? (
            <img
              src={paper.image}
              alt={paper.title + ' logo'}
              className="object-contain w-16 h-16 rounded-lg"
              loading="lazy"
            />
          ) : (
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 w-16 h-16 rounded-xl flex items-center justify-center">
              <FileText className="text-purple-600" size={28} />
            </div>
          )}
        </div>
        
        {/* Content section */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-row items-start justify-between flex-wrap gap-2 mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 leading-tight mb-1">
                {paper.title}
              </h3>
              {paper.authors && (
                <p className="text-gray-600 text-sm mb-1">
                  {paper.authors}
                </p>
              )}
              <div className="flex flex-row items-center gap-3 flex-wrap mt-2">
                {paper.venue && (
                  <span className="text-blue-600 text-sm font-medium">
                    {paper.venue}
                  </span>
                )}
                {paper.date && (
                  <span className="text-gray-500 text-sm">
                    {paper.date}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {paper.pdf && (
                <a
                  href={paper.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-white/10 text-gray-700 font-medium border border-white/20 shadow-md backdrop-blur-md hover:bg-gradient-to-r hover:from-purple-400/30 hover:to-blue-500/30 hover:text-purple-700 transition text-sm flex items-center gap-2"
                >
                  <FileText size={16} />
                  PDF
                </a>
              )}
              {paper.link && (
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-white/10 text-gray-700 font-medium border border-white/20 shadow-md backdrop-blur-md hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-blue-500/30 hover:text-cyan-700 transition text-sm flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Link
                </a>
              )}
            </div>
          </div>
          <p className="text-gray-600 mb-3 text-base leading-relaxed">
            {paper.description}
          </p>
          {paper.tags && paper.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {paper.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/10 text-gray-700 text-xs font-medium border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile layout (xs and sm) */}
      <div className="md:hidden flex flex-col">
        {/* Top section: Icon/Image, title, and links */}
        <div className="flex flex-row items-start gap-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0">
            {paper.image ? (
              <img
                src={paper.image}
                alt={paper.title + ' logo'}
                className="object-contain w-12 h-12 rounded-lg"
                loading="lazy"
              />
            ) : (
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center">
                <FileText className="text-purple-600" size={20} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">
              {paper.title}
            </h3>
            {paper.authors && (
              <p className="text-gray-600 text-xs mb-1">
                {paper.authors}
              </p>
            )}
            <div className="flex flex-row items-center gap-2 flex-wrap mt-1">
              {paper.venue && (
                <span className="text-blue-600 text-xs font-medium">
                  {paper.venue}
                </span>
              )}
              {paper.date && (
                <span className="text-gray-500 text-xs">
                  {paper.date}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Links */}
        {(paper.pdf || paper.link) && (
          <div className="flex gap-2 mb-3">
            {paper.pdf && (
              <a
                href={paper.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md bg-white/10 text-gray-700 font-medium border border-white/20 shadow-md backdrop-blur-md hover:bg-gradient-to-r hover:from-purple-400/30 hover:to-blue-500/30 hover:text-purple-700 transition text-xs flex items-center gap-2"
              >
                <FileText size={14} />
                PDF
              </a>
            )}
            {paper.link && (
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md bg-white/10 text-gray-700 font-medium border border-white/20 shadow-md backdrop-blur-md hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-blue-500/30 hover:text-cyan-700 transition text-xs flex items-center gap-2"
              >
                <ExternalLink size={14} />
                Link
              </a>
            )}
          </div>
        )}
        
        {/* Description */}
        <p className="text-gray-600 mb-3 text-sm leading-relaxed">
          {paper.description}
        </p>
        
        {/* Tags */}
        {paper.tags && paper.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {paper.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-full bg-white/10 text-gray-700 text-xs font-medium border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Define a Project type for type safety
interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string | null;
  demo?: string | null;
  image?: string | null;
  imageSize?: 'default' | 'lg' | 'xl';
  highlights?: string[];
  whyFavorite?: string;
  paper?: string | null;
}

// Extracted project card rendering for reuse
const ProjectCard = ({ project }: { project: Project }) => {
  const [showHighlights, setShowHighlights] = useState(false);

  return (
    <div className="w-full bg-white/5 rounded-2xl shadow-lg border border-white/10 p-6">
      {/* Desktop layout (md and up) */}
      <div className="hidden md:flex flex-row items-start gap-6">
        {/* Logo section */}
        <div className={`flex items-center justify-center rounded-xl flex-shrink-0 ${project.imageSize === 'xl' ? 'w-36 h-36' : project.imageSize === 'lg' ? 'w-28 h-28' : 'w-20 h-20'}`}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.name + ' logo'}
              className={`object-contain rounded-lg ${project.imageSize === 'xl' ? 'w-32 h-32' : project.imageSize === 'lg' ? 'w-24 h-24' : 'w-16 h-16'}`}
              loading="lazy"
            />
          ) : (
            <span className="text-2xl font-extrabold text-gray-800 select-none">
              {project.name[0]}
            </span>
          )}
        </div>
        {/* Content section */}
        <div className="flex-1 min-w-0">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-800 leading-tight">
              {project.name}
            </h3>
            <p className="text-blue-600 text-base font-medium mt-1">
              {project.tech && project.tech.join(', ')}
            </p>
            <div className="flex gap-2 mt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-white/10 text-gray-700 font-medium border border-white/20 shadow-md backdrop-blur-md hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-blue-500/30 hover:text-cyan-700 transition text-sm flex items-center gap-2"
                >
                  <FaGithub size={18} />
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-white/10 text-gray-700 font-medium border border-white/20 shadow-md backdrop-blur-md hover:bg-gradient-to-r hover:from-green-400/30 hover:to-blue-500/30 hover:text-green-700 transition text-sm flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Demo
                </a>
              )}
              {project.paper && (
                <a
                  href={project.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-white/10 text-gray-700 font-medium border border-white/20 shadow-md backdrop-blur-md hover:bg-gradient-to-r hover:from-purple-400/30 hover:to-blue-500/30 hover:text-purple-700 transition text-sm flex items-center gap-2"
                >
                  <FileText size={16} />
                  Paper
                </a>
              )}
            </div>
          </div>
          <p className="text-gray-600 mb-3 text-base leading-relaxed">
            {project.description}
          </p>
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <button
                onClick={() => setShowHighlights(!showHighlights)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors mb-2"
              >
                {showHighlights ? (
                  <>
                    <ChevronUp size={16} />
                    See less
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} />
                    See more
                  </>
                )}
              </button>
              {showHighlights && (
                <div className="overflow-hidden">
                  <ul className="space-y-1 text-gray-600 text-sm">
                    {project.highlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-600 mt-1.5 w-1 h-1 bg-cyan-600 rounded-full flex-shrink-0"></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Mobile layout (xs and sm) */}
      <div className="md:hidden flex flex-col">
        {/* Top section: Logo, name, and tech */}
        <div className="flex flex-row items-center gap-4 mb-4">
          <div className={`flex items-center justify-center rounded-xl flex-shrink-0 ${project.imageSize === 'xl' ? 'w-24 h-24' : project.imageSize === 'lg' ? 'w-20 h-20' : 'w-16 h-16'}`}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.name + ' logo'}
                className={`object-contain rounded-lg ${project.imageSize === 'xl' ? 'w-20 h-20' : project.imageSize === 'lg' ? 'w-16 h-16' : 'w-12 h-12'}`}
                loading="lazy"
              />
            ) : (
              <span className="text-xl font-extrabold text-gray-800 select-none">
                {project.name[0]}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-800 leading-tight">
              {project.name}
            </h3>
            <p className="text-blue-600 text-sm font-medium mt-1">
              {project.tech && project.tech.join(', ')}
            </p>
          </div>
        </div>
        {/* GitHub, Demo, and Paper buttons */}
        {(project.github || project.demo || project.paper) && (
          <div className="flex gap-2 mb-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-4 py-2 rounded-md bg-white/10 text-gray-700 font-medium border border-white/20 shadow-md backdrop-blur-md hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-blue-500/30 hover:text-cyan-700 transition text-sm flex items-center gap-2"
              >
                <FaGithub size={18} />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-4 py-2 rounded-md bg-white/10 text-gray-700 font-medium border border-white/20 shadow-md backdrop-blur-md hover:bg-gradient-to-r hover:from-green-400/30 hover:to-blue-500/30 hover:text-green-700 transition text-sm flex items-center gap-2"
              >
                <ExternalLink size={16} />
                Demo
              </a>
            )}
            {project.paper && (
              <a
                href={project.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-4 py-2 rounded-md bg-white/10 text-gray-700 font-medium border border-white/20 shadow-md backdrop-blur-md hover:bg-gradient-to-r hover:from-purple-400/30 hover:to-blue-500/30 hover:text-purple-700 transition text-sm flex items-center gap-2"
              >
                <FileText size={16} />
                Paper
              </a>
            )}
          </div>
        )}
        {/* Description */}
        <p className="text-gray-600 mb-3 text-base leading-relaxed">
          {project.description}
        </p>
        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div>
            <button
              onClick={() => setShowHighlights(!showHighlights)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors mb-2"
            >
              {showHighlights ? (
                <>
                  <ChevronUp size={16} />
                  See less
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  See more
                </>
              )}
            </button>
            {showHighlights && (
              <div className="overflow-hidden">
                <ul className="space-y-1 text-gray-600 text-sm">
                  {project.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-600 mt-1.5 w-1 h-1 bg-cyan-600 rounded-full flex-shrink-0"></span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-blue-100 to-pink-300 text-gray-800 relative overflow-x-hidden">
      <Navbar />
      <Starfield />
      <AnimatedOrbs />
      <div className="flex flex-col gap-16 max-w-5xl mx-auto px-4 pb-24 relative z-10 pt-16">
        <section id="about">
          <div className="relative w-full h-screen pb-24 sm:pb-32 xl:pb-40 flex flex-col">
            <div className="flex-1 flex items-center justify-center px-4" style={{ paddingTop: '80px' }}>
              <SectionReveal>
                <AboutMeCard />
              </SectionReveal>
            </div>
          </div>
        </section>
        <section id="education" className="pt-8">
          <SectionReveal>
            <EducationSection />
          </SectionReveal>
        </section>
        <section id="experience" className="pt-8">
          <SectionReveal>
            <ExperienceSection />
          </SectionReveal>
        </section>
        <section id="skills" className="pt-8">
          <SkillsSection />
        </section>
        <section id="awards" className="pt-8">
          <SectionReveal>
            <AwardsSection />
          </SectionReveal>
        </section>
        <section id="papers" className="pt-8">
          <SectionReveal>
            <TechnicalPapersSection />
          </SectionReveal>
        </section>
        <section id="projects" className="pt-8">
          <SectionReveal>
            <Projects />
          </SectionReveal>
        </section>
      </div>
    </div>
  );
}

export default App
