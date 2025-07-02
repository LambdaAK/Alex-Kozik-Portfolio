import './App.css'
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Placeholder page components
const Home = () => <div className="py-8">Home Page</div>;
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
