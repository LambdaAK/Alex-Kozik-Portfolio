import type { ImageMetadata } from 'astro';
import cmu from '../assets/logos/cmu.png';
import amazon from '../assets/logos/amazon.svg';
import amazonDark from '../assets/logos/amazon-dark.svg';
import salesforce from '../assets/logos/salesforce.svg';
import cmsx from '../assets/logos/cmsx.svg';
import cmsxDark from '../assets/logos/cmsx-dark.svg';
import genai from '../assets/logos/genai-cornell.png';
import cornell from '../assets/logos/cornell.svg';

export interface Experience {
  company: string;
  url?: string;
  role: string;
  // Team or group, shown on its own line under the role.
  team?: string;
  dates: string;
  logo: ImageMetadata;
  // Variant for dark mode when the logo has dark lettering.
  logoDark?: ImageMetadata;
  // The logo has its own background, so show it as a rounded tile.
  logoTile?: boolean;
  // Courses taught or supported, shown as an aligned list.
  courses?: string[];
  // One short line shown up front; the full bullets go under "more". Without it, the first bullet leads.
  blurb?: string;
  bullets: string[];
  tech: string[];
  // Shown under Research instead of Experience.
  research?: boolean;
  // Reports or write-ups about this role.
  links?: { label: string; href: string }[];
}

export const experience: Experience[] = [
  {
    company: 'Carnegie Mellon University',
    url: 'https://www.cs.cmu.edu/',
    role: 'Graduate Research Assistant',
    research: true,
    dates: 'Aug 2026 – Present',
    logo: cmu,
    logoTile: true,
    bullets: [
      "Reinforcement learning for foundation models in Prof. Andrea Zanette's group.",
    ],
    tech: ['Reinforcement Learning', 'PyTorch'],
  },
  {
    company: 'Amazon',
    url: 'https://www.amazon.com/',
    role: 'Software Engineer Intern',
    team: 'AI for Customer Service',
    dates: 'Jun – Aug 2026',
    logo: amazon,
    logoDark: amazonDark,
    blurb: 'Built an ML-gated fraud check for customer damage claims.',
    bullets: [
      'Architected an ML-gated damage-claim verification feature to block fraud and reduce manual review.',
      'Engineered a secure image-upload pipeline (S3 + virus scanning) passing scanned images to a computer-vision service that synchronously verifies reported damage and gates approval.',
      'Built the Java/Kotlin backend orchestrating the multi-step upload-to-decision sequence across services.',
    ],
    tech: ['Java', 'Kotlin', 'AWS S3', 'Computer Vision'],
  },
  {
    company: 'Salesforce',
    url: 'https://www.salesforce.com/',
    role: 'Software Engineer Intern · Metadata-Driven Services',
    dates: 'Jun – Aug 2025',
    logo: salesforce,
    blurb: 'Built no-code ML features in Salesforce Data Cloud.',
    bullets: [
      'Built virtual formula fields in Salesforce Data Cloud for no-code ML features at enterprise scale.',
      'Implemented query-time computation over data objects, eliminating staleness and storage overhead.',
      'Engineered the Java/Apache Spark layer for formula evaluation over cross-object joins and aggregations.',
    ],
    tech: ['Java', 'Apache Spark', 'React', 'TypeScript'],
  },
  {
    company: 'Cornell Course Management System',
    url: 'https://cmsx.cs.cornell.edu/',
    role: 'Lead',
    research: true,
    dates: 'Aug 2023 – Jan 2026',
    logo: cmsx,
    logoDark: cmsxDark,
    blurb: "Led the team behind Cornell's course management system.",
    bullets: [
      'Led a team of 20 engineers building Cornell’s course management system, used by 10,000+ students.',
      'Architected the React/TypeScript student-facing frontend, reducing page load times by 90%.',
      'Implemented APIs with serializable data structures for secure frontend/backend communication.',
    ],
    tech: ['React', 'TypeScript', 'Java', 'MUI'],
    links: [
      {
        label: 'Report: From Redux to component-level state',
        href: '/papers/cmsx-redux-to-component-state.pdf',
      },
    ],
  },
  {
    company: 'Generative AI @ Cornell',
    role: 'Machine Learning Engineer · Founding Member',
    dates: 'Feb – Dec 2025',
    logo: genai,
    blurb: 'Built LLM agents and AI tutors for real users.',
    bullets: [
      'Developed AI agent for QuickFi, a commercial lending technology company, automating insurance certificate validation and compliance verification processes, replacing a manual review step.',
      'Built frontend and vector database for ClassGPT, enabling professors to create AI tutors for classes.',
    ],
    tech: ['LLM Agents', 'Vector Databases', 'React'],
  },
  {
    company: 'Carnegie Mellon University',
    url: 'https://www.cmu.edu/',
    role: 'Software Engineer & Research Intern · NSF REU',
    research: true,
    dates: 'May – Aug 2024',
    logo: cmu,
    logoTile: true,
    blurb: 'Built a polymorphic type system for SASyLF, a language for writing proofs.',
    bullets: [
      'Worked on the interpreter for SASyLF, a language for writing proofs, implementing core features in Java.',
      'Implemented a polymorphic type system for SASyLF, similar to Java generics, enabling type-safe code reuse and significantly reducing duplication in proofs by allowing abstraction over multiple data types.',
    ],
    tech: ['Java', 'Python', 'Programming Languages'],
  },
  {
    company: 'Cornell Bowers CIS',
    url: 'https://cis.cornell.edu/',
    role: 'Teaching Assistant',
    dates: 'Aug 2023 – Dec 2025',
    logo: cornell,
    bullets: [],
    courses: [
      'CS 3780/5780 Introduction to Machine Learning (2025)',
      'CS 4820/5820 Analysis of Algorithms (Fall 2024)',
      'CS 3110 Data Structures & Functional Programming (2023–24)',
    ],
    tech: ['Machine Learning', 'Algorithms', 'OCaml'],
  },
];
