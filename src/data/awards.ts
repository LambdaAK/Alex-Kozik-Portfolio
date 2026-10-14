export interface Award {
  title: string;
  org: string;
  year: string;
  note: string;
  // A few words shown under the title on the awards page.
  brief: string;
}

export const awards: Award[] = [
  {
    title: 'Jonathan E. Marx Memorial Senior Prize',
    brief: "One of two seniors in the Cornell class of 2026 honored for exceptional scholarship, leadership, and service.",
    org: 'Cornell University',
    year: '2026',
    note: 'One of two graduating seniors recognized for leadership, service and contributions to the Cornell community.',
  },
  {
    title: 'Phi Beta Kappa Graduation Scholarship',
    brief: "A competitive $3,000 scholarship awarded to about ten graduating Phi Beta Kappa members.",
    org: 'Phi Beta Kappa',
    year: '2026',
    note: 'Competitive $3,000 scholarship; one of about ten recipients in the graduating class.',
  },
  {
    title: 'Phi Beta Kappa',
    brief: "Inducted into the nation's oldest academic honor society, roughly the top 1% of U.S. college seniors.",
    org: 'The Phi Beta Kappa Society',
    year: '2026',
    note: 'Inducted; roughly the top 1% of U.S. college seniors.',
  },
  {
    title: 'Summa Cum Laude in Computer Science',
    brief: "Highest honors in computer science, for research, graduate-level coursework, and a GPA above 4.0.",
    org: 'Cornell University',
    year: '2025',
    note: 'Research, graduate-level coursework and a GPA above 4.0.',
  },
  {
    title: 'Cum Laude in Mathematics',
    brief: "Latin honors in mathematics, with a math GPA of 4.16 / 4.3.",
    org: 'Cornell University',
    year: '2025',
    note: 'Math major GPA 4.16 / 4.3.',
  },
  {
    title: 'NSF Research Experience for Undergraduates',
    brief: "Selected for CMU's NSF-funded REUSE program for a fully funded summer of programming-languages research.",
    org: 'Carnegie Mellon University',
    year: '2024',
    note: 'Selected for the NSF-funded REUSE program; summer research in programming languages, full stipend.',
  },
  {
    title: 'CS Course Staff Award',
    brief: "Given to the top 10% of Cornell CS teaching assistants, for my work on CS 3110.",
    org: 'Cornell University',
    year: '2024',
    note: 'Top 10% of teaching assistants, for CS 3110.',
  },
  {
    title: "Dean's List",
    brief: "Named to the Dean's List every eligible semester at Cornell.",
    org: 'Cornell University',
    year: '2022 – 2025',
    note: 'Every eligible semester.',
  },
  {
    title: 'Boomerang Youth Recognition Award',
    org: 'Central Bucks School District',
    year: '2022',
    note: 'Recognized for outstanding volunteer work promoting equality and social justice through community organizations.',
    brief: 'Recognized for volunteer work promoting equality and social justice through community organizations.',
  },
];
