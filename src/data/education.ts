import type { ImageMetadata } from 'astro';
import cmu from '../assets/logos/cmu.png';
import cornell from '../assets/logos/cornell.svg';

export interface Education {
  school: string;
  url: string;
  degree: string;
  detail: string;
  dates: string;
  logo: ImageMetadata;
  // The logo has its own background, so show it as a rounded tile.
  logoTile?: boolean;
  notes: string[];
  courses: { group: string; items: string[] }[];
}

export const education: Education[] = [
  {
    school: 'Carnegie Mellon University',
    url: 'https://www.cs.cmu.edu/',
    degree: 'M.S. in Computer Science',
    detail: 'Thesis track · Machine Learning and Systems',
    dates: 'Aug 2026 – Dec 2027',
    logo: cmu,
    logoTile: true,
    notes: [],
    courses: [
      {
        group: 'Coursework',
        items: [
          '10-703 Deep Reinforcement Learning & Control',
          '10-714 Deep Learning Systems',
          '15-659 Randomized Algorithms & Markov Chains',
        ],
      },
    ],
  },
  {
    school: 'Cornell University',
    url: 'https://www.cs.cornell.edu/',
    degree: 'B.A. in Computer Science & Mathematics',
    detail: 'GPA 4.11 / 4.3',
    dates: 'Aug 2022 – Dec 2025',
    logo: cornell,
    notes: [],
    courses: [
      {
        group: 'Computer Science',
        items: [
          'CS 6783 Machine Learning Theory (grad)',
          'CS 7190 Seminar in PL & Compilers (grad, ×2)',
          'CS 4782 Deep Learning',
          'CS 4780 Machine Learning',
          'CS 4820 Analysis of Algorithms',
          'CS 4110 Programming Languages & Logics',
          'CS 4414 Systems Programming',
          'CS 3410 Computer Systems Organization',
          'CS 4701 AI Practicum',
          'CS 3110 Functional Programming',
          'CS 2112 Honors OOP & Data Structures',
          'CS 4999 Independent Research (×2)',
        ],
      },
      {
        group: 'Mathematics',
        items: [
          'MATH 4710 Probability',
          'MATH 4310 Advanced Linear Algebra',
          'MATH 4220 Complex Analysis',
          'MATH 3110 Real Analysis',
          'MATH 3360 Applicable Algebra',
          'MATH 2220 Multivariable Calculus',
          'MATH 2210 Linear Algebra',
        ],
      },
    ],
  },
];
