export const profile = {
  name: 'Alex Kozik',
  fullName: 'Alexander Kozik',
  // Meta description for search engines and link previews (≤160 chars).
  metaDescription:
    'Alex Kozik: ML research engineer and CMU M.S. CS student in reinforcement learning. Built a transformer from scratch, a C++ ML library and a compiler. Ex-Amazon.',
  bio: [
    "I'm a master's student in Computer Science at Carnegie Mellon, doing reinforcement learning research in Andrea Zanette's group.",
  ],
  email: 'alex.kozik3141@gmail.com',
  github: 'https://github.com/LambdaAK',
  linkedin: 'https://www.linkedin.com/in/alex-kozik',
  resume: '/Alexander_Kozik_Resume.pdf',
  site: 'https://alexkozik.com',
} as const;

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'awards', label: 'Awards' },
  { id: 'papers', label: 'Papers' },
  { id: 'projects', label: 'Projects' },
] as const;
