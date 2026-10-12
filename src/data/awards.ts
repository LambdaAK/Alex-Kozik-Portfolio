export interface Award {
  title: string;
  org: string;
  year: string;
  note: string;
}

export const awards: Award[] = [
  {
    title: 'Jonathan E. Marx Memorial Senior Prize',
    org: 'Cornell University',
    year: '2026',
    note: 'One of two graduating seniors recognized for leadership, service and contributions to the Cornell community.',
  },
  {
    title: 'Phi Beta Kappa Graduation Scholarship',
    org: 'Phi Beta Kappa',
    year: '2026',
    note: 'Competitive $3,000 scholarship; one of about ten recipients in the graduating class.',
  },
  {
    title: 'Phi Beta Kappa',
    org: 'The Phi Beta Kappa Society',
    year: '2026',
    note: 'Inducted; roughly the top 1% of U.S. college seniors.',
  },
  {
    title: 'Summa Cum Laude in Computer Science',
    org: 'Cornell University',
    year: '2025',
    note: 'Research, graduate-level coursework and a GPA above 4.0.',
  },
  {
    title: 'Cum Laude in Mathematics',
    org: 'Cornell University',
    year: '2025',
    note: 'Math major GPA 4.16 / 4.3.',
  },
  {
    title: 'NSF Research Experience for Undergraduates',
    org: 'Carnegie Mellon University',
    year: '2024',
    note: 'Selected for the NSF-funded REUSE program; summer research in programming languages, full stipend.',
  },
  {
    title: 'CS Course Staff Award',
    org: 'Cornell University',
    year: '2024',
    note: 'Top 10% of teaching assistants, for CS 3110.',
  },
  {
    title: "Dean's List",
    org: 'Cornell University',
    year: '2022 – 2025',
    note: 'Every eligible semester.',
  },
];
