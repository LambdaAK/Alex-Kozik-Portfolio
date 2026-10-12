export interface Paper {
  title: string;
  venue: string;
  summary: string;
  pdf: string;
  code?: string;
  tags: string[];
}

// Course reports and technical write-ups. Add peer-reviewed work at the top as it lands.
export const papers: Paper[] = [
  {
    title: 'Voting-Based Multi-Agent Bandits',
    venue: 'CS 6783 Machine Learning Theory, Cornell',
    summary:
      'Multi-armed bandit algorithms for multi-agent systems where agents aggregate decisions through voting mechanisms.',
    pdf: '/Voting-Based Multi-Agent Bandits.pdf',
    tags: ['ML Theory', 'Bandits', 'Multi-Agent'],
  },
  {
    title: 'Low-Level Learning',
    venue: 'CS 4701 AI Practicum, Cornell',
    summary:
      'Design and implementation of C-Torch, a C++ machine learning library with numerical methods, linear algebra and 15+ models.',
    pdf: '/Low-Level Learning.pdf',
    code: 'https://github.com/LambdaAK/c-torch',
    tags: ['C++', 'ML Systems'],
  },
  {
    title: 'Show, Attend, Tell: Visual Attention for Image Captioning',
    venue: 'CS 4782 Deep Learning, Cornell',
    summary:
      'Re-implementation of soft and hard visual attention for image captioning with a ResNet-50 encoder and LSTM decoder.',
    pdf: '/ShowAttendTell Report.pdf',
    code: 'https://github.com/LambdaAK/CS-4782-Final-Project',
    tags: ['Computer Vision', 'Attention'],
  },
  {
    title: 'From Redux to Component-level State: Modernizing CMSX Architecture',
    venue: 'CS 4999 Independent Research, Cornell · 2024',
    summary:
      "Migration of Cornell's course management system from Redux global state to component-level state, and its effect on developer and user experience.",
    pdf: '/From Redux to Component-level State Modernizing CMSX Architecture.pdf',
    tags: ['Software Architecture', 'React'],
  },
];
