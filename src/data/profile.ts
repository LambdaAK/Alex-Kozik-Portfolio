export const profile = {
  name: 'Alex Kozik',
  fullName: 'Alexander Kozik',
  // One sentence. Shown under the name in the sidebar and in the page <title>.
  tagline: 'ML engineer and M.S. CS student at Carnegie Mellon.',
  // Meta description for search engines and link previews (≤160 chars).
  metaDescription:
    'Alex Kozik: ML engineer and M.S. CS student at Carnegie Mellon doing reinforcement learning research. Previously Amazon and Salesforce. Compilers, ML systems, and infrastructure.',
  bio: [
    "I'm a master's student in Computer Science at Carnegie Mellon, where I do reinforcement learning research in Andrea Zanette's group at the School of Computer Science.",
    'I like building the systems underneath ML: a functional language with an LLVM backend, a from-scratch transformer with a production inference stack, and a C++ ML library with CUDA kernels. Before CMU I interned at Amazon and Salesforce and led the team behind Cornell’s course management system, used by 10,000+ students.',
    'Open to opportunities. Get in touch.',
  ],
  email: 'alex.kozik3141@gmail.com',
  github: 'https://github.com/LambdaAK',
  linkedin: 'https://www.linkedin.com/in/alex-kozik',
  resume: '/Alexander_Kozik_Resume.pdf',
  site: 'https://alexkozik.com',
  location: 'Pittsburgh, PA',
} as const;

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards' },
] as const;
