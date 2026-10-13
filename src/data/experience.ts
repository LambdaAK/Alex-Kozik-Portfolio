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
  dates: string;
  logo: ImageMetadata;
  // Variant for dark mode when the logo has dark lettering.
  logoDark?: ImageMetadata;
  // The logo has its own background, so show it as a rounded tile.
  logoTile?: boolean;
  // Courses taught or supported, shown as an aligned list.
  courses?: string[];
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
    role: 'Machine Learning Researcher',
    research: true,
    dates: 'Aug 2026 – Present',
    logo: cmu,
    logoTile: true,
    bullets: [
      "Reinforcement learning research in Prof. Andrea Zanette's group at the School of Computer Science.",
      'Design, implement and evaluate RL experiments in PyTorch.',
    ],
    tech: ['Reinforcement Learning', 'PyTorch'],
  },
  {
    company: 'Amazon',
    url: 'https://www.amazon.com/',
    role: 'Software Development Engineer Intern · AI for Customer Service',
    dates: 'Jun – Aug 2026',
    logo: amazon,
    logoDark: amazonDark,
    bullets: [
      'Architected an ML-gated damage-claim verification feature to block fraud and reduce manual review.',
      'Engineered a secure image-upload pipeline (S3 + virus scanning) that passes scanned images to a computer-vision service, which synchronously verifies reported damage and gates approval.',
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
    bullets: [
      'Built virtual formula fields in Salesforce Data Cloud for no-code ML features at enterprise scale.',
      'Implemented query-time computation over data objects, eliminating staleness and storage overhead.',
      'Engineered the Java/Apache Spark layer for formula evaluation over cross-object joins and aggregations, plus the React/TypeScript UI for creating fields.',
    ],
    tech: ['Java', 'Apache Spark', 'React', 'TypeScript'],
  },
  {
    company: 'Cornell Course Management System',
    url: 'https://cmsx.cs.cornell.edu/',
    role: 'Software Engineering Lead & President',
    research: true,
    dates: 'Aug 2023 – Jan 2026',
    logo: cmsx,
    logoDark: cmsxDark,
    bullets: [
      "Led a team of 20 engineers building Cornell's CS course management system, used by 10,000+ students.",
      'Architected the React/TypeScript student-facing frontend, reducing page load times by 90%, and led the rewrite of the legacy JSP site in React.',
      'Migrated the app from Redux to component-level state and designed 10+ APIs with serializable data structures for secure frontend/backend communication.',
      'Joined as a full-stack engineer (2023), became frontend lead (2024), then president (2025): ran recruiting, onboarding, code review and architecture decisions.',
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
    bullets: [
      'Developed an AI agent for QuickFi, a commercial lending company, automating insurance-certificate validation and compliance checks and replacing a manual review step.',
      'Built the frontend and vector database for ClassGPT, which lets professors create AI tutors for their classes.',
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
    bullets: [
      'Added parameterized (functor-style) modules to SASyLF, a proof assistant for programming-language metatheory: argument checking with specific errors, plus deep copy and substitution across the whole AST.',
      'All 204 commits merged upstream and released as SASyLF 1.6.0, "Polymorphic modules".',
      'Built a Python regression runner and 79 regression tests for the checker.',
    ],
    tech: ['Java', 'Python', 'Programming Languages'],
    links: [
      { label: 'Upstream merge (PR #128)', href: 'https://github.com/boyland/sasylf/pull/128' },
    ],
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
