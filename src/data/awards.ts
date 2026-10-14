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
    brief: 'One of two seniors honored for leadership and service',
    org: 'Cornell University',
    year: '2026',
    note: 'One of two graduating seniors recognized for leadership, service and contributions to the Cornell community.',
  },
  {
    title: 'Phi Beta Kappa Graduation Scholarship',
    brief: '$3,000, about ten recipients',
    org: 'Phi Beta Kappa',
    year: '2026',
    note: 'Competitive $3,000 scholarship; one of about ten recipients in the graduating class.',
  },
  {
    title: 'Phi Beta Kappa',
    brief: 'Roughly the top 1% of U.S. college seniors',
    org: 'The Phi Beta Kappa Society',
    year: '2026',
    note: 'Inducted; roughly the top 1% of U.S. college seniors.',
  },
  {
    title: 'Summa Cum Laude in Computer Science',
    brief: 'Research, graduate coursework, GPA above 4.0',
    org: 'Cornell University',
    year: '2025',
    note: 'Research, graduate-level coursework and a GPA above 4.0.',
  },
  {
    title: 'Cum Laude in Mathematics',
    brief: 'Math GPA 4.16 / 4.3',
    org: 'Cornell University',
    year: '2025',
    note: 'Math major GPA 4.16 / 4.3.',
  },
  {
    title: 'NSF Research Experience for Undergraduates',
    brief: 'Funded summer research in programming languages',
    org: 'Carnegie Mellon University',
    year: '2024',
    note: 'Selected for the NSF-funded REUSE program; summer research in programming languages, full stipend.',
  },
  {
    title: 'CS Course Staff Award',
    brief: 'Top 10% of CS 3110 TAs',
    org: 'Cornell University',
    year: '2024',
    note: 'Top 10% of teaching assistants, for CS 3110.',
  },
  {
    title: "Dean's List",
    brief: 'Every eligible semester',
    org: 'Cornell University',
    year: '2022 – 2025',
    note: 'Every eligible semester.',
  },
];
