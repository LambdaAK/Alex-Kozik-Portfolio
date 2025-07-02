import './App.css'
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
        Hi! I'm Alex, and welcome to my portfolio. Here you can find information about my background, experience, and projects. I love building cool things, whether that's a website, an app, or something else entirely. When I'm not coding, I'm probably exploring new tech, reading, or enjoying the outdoors.
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
    {educationData.map((edu, idx) => (
      <div
        key={edu.name}
        className="w-full max-w-4xl bg-[#232a36] rounded-3xl shadow-xl p-10 flex flex-col items-center gap-6 border border-[#232a36]/60"
      >
        {/* Header: Centered logo and school name */}
        <div className="flex flex-col items-center mb-6 w-full">
          <div className="w-28 h-28 rounded-xl overflow-hidden bg-neutral-800 flex items-center justify-center border-2 border-blue-400 mb-2">
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
        </div>
      </div>
    ))}
  </div>
);

const Projects = () => <div className="py-8">Projects Page</div>;
const Education = () => <EducationSection />;
const Experience = () => <div className="py-8">Experience Page</div>;
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
