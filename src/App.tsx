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
const Projects = () => <div className="py-8">Projects Page</div>;
const Education = () => <div className="py-8">Education Page</div>;
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
