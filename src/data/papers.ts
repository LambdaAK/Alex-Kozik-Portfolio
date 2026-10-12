export interface Paper {
  title: string;
  venue: string;
  summary: string;
  pdf: string;
  code?: string;
  // Project page on this site, if one exists.
  project?: string;
}

// Technical reports from coursework. Add peer-reviewed work at the top as it lands.
export const papers: Paper[] = [
  {
    title: 'Show, Attend, Tell: Visual Attention for Image Captioning',
    venue: 'CS 4782 Deep Learning, Cornell · Spring 2025 · team of 5',
    summary:
      'Reproduction of soft and hard visual attention for image captioning (ResNet-50 encoder, LSTM decoder), evaluated with METEOR against the original paper.',
    pdf: '/papers/show-attend-tell.pdf',
    code: 'https://github.com/srkvatsa/exploring-show-attend-tell',
    project: '/projects/image-captioning/',
  },
  {
    title: 'Low-Level Learning',
    venue: 'CS 4701 AI Practicum, Cornell',
    summary:
      'Design and implementation of C-Torch, a C++ machine learning library with numerical methods, linear algebra, distributed training and 15+ models.',
    pdf: '/papers/low-level-learning.pdf',
    code: 'https://github.com/LambdaAK/c-torch',
    project: '/projects/c-torch/',
  },
  {
    title: 'Voting-Based Multi-Agent Bandits',
    venue: 'CS 6783 Machine Learning Theory (graduate), Cornell',
    summary:
      'Multi-armed bandit algorithms for multi-agent systems in which agents aggregate decisions through voting.',
    pdf: '/papers/voting-based-multi-agent-bandits.pdf',
  },
];
