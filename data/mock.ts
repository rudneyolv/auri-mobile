export interface User {
  id: string;
  name: string;
  age: number;
  profileType: string;
  genres: string[];
  yearsExperience: number;
  bio: string;
  skills: Skill[];
  photo: string;
  videoUrl?: string;
  videoDescription?: string;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  proficiencyLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: string;
  isPrimary?: boolean;
}

export interface Match {
  user: User;
  matchedAt: Date;
}

export interface ChatMessage {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}

// ============================================
// OPTIONS PARA SELECTS
// ============================================

// ============================================
// PROFILE CATEGORIES (profile_categories)
// ============================================

export const profileCategoryOptions = [
  { label: 'Guitarrista', value: 'guitarist' },
  { label: 'Baixista', value: 'bassist' },
  { label: 'Baterista', value: 'drummer' },
  { label: 'Tecladista', value: 'keyboardist' },
  { label: 'Vocalista', value: 'vocalist' },
  { label: 'Produtor Musical', value: 'producer' },
  { label: 'DJ', value: 'dj' },
  { label: 'Beatmaker', value: 'beatmaker' },
];

// ============================================
// SKILL CATEGORIES (skill_categories)
// ============================================

// ============================================
// SKILLS (skills)
// ============================================

export const skillOptions = [
  // Cordas
  { label: 'Guitarra Elétrica', value: 'electric-guitar', category: 'strings' },
  { label: 'Guitarra Acústica', value: 'acoustic-guitar', category: 'strings' },
  { label: 'Guitarra Clássica', value: 'classical-guitar', category: 'strings' },
  { label: 'Baixo Elétrico', value: 'electric-bass', category: 'strings' },
  { label: 'Contrabaixo', value: 'upright-bass', category: 'strings' },

  // Percussão
  { label: 'Bateria Acústica', value: 'acoustic-drums', category: 'percussion' },
  { label: 'Bateria Eletrônica', value: 'electronic-drums', category: 'percussion' },
  { label: 'Percussão Geral', value: 'percussion', category: 'percussion' },

  // Teclas
  { label: 'Piano', value: 'piano', category: 'keys' },
  { label: 'Teclado', value: 'keyboard', category: 'keys' },
  { label: 'Sintetizador', value: 'synthesizer', category: 'keys' },
  { label: 'Órgão', value: 'organ', category: 'keys' },

  // Vocais
  { label: 'Vocal Principal', value: 'lead-vocals', category: 'vocals' },
  { label: 'Backing Vocals', value: 'backing-vocals', category: 'vocals' },
  { label: 'Rap / MC', value: 'rap-mc', category: 'vocals' },
  { label: 'Beatbox', value: 'beatbox', category: 'vocals' },

  // Produção Musical
  { label: 'Ableton Live', value: 'ableton-live', category: 'music-production' },
  { label: 'FL Studio', value: 'fl-studio', category: 'music-production' },
  { label: 'Logic Pro', value: 'logic-pro', category: 'music-production' },
  { label: 'Pro Tools', value: 'pro-tools', category: 'music-production' },
  { label: 'Mixagem', value: 'mixing', category: 'music-production' },
  { label: 'Masterização', value: 'mastering', category: 'music-production' },
  { label: 'Gravação', value: 'recording', category: 'music-production' },
  { label: 'Composição', value: 'composition', category: 'music-production' },

  // DJ & Performance
  { label: 'Pioneer CDJ', value: 'pioneer-cdj', category: 'dj-performance' },
  { label: 'Traktor', value: 'traktor', category: 'dj-performance' },
  { label: 'Serato', value: 'serato', category: 'dj-performance' },
  { label: 'Scratch', value: 'scratch', category: 'dj-performance' },

  // Beatmaking
  { label: 'Beat Making', value: 'beat-making', category: 'beatmaking' },
  { label: 'Sampling', value: 'sampling', category: 'beatmaking' },
  { label: 'MPC', value: 'mpc', category: 'beatmaking' },
];

export const proficiencyLevelOptions = [
  { label: 'Iniciante', value: 'Beginner' },
  { label: 'Intermediário', value: 'Intermediate' },
  { label: 'Avançado', value: 'Advanced' },
  { label: 'Expert', value: 'Expert' },
];

export const yearsExperienceOptions = [
  { label: 'Menos de 1 ano', value: 0 },
  { label: '1-2 anos', value: 1 },
  { label: '3-5 anos', value: 3 },
  { label: '6-10 anos', value: 6 },
  { label: 'Mais de 10 anos', value: 10 },
];

export const genreOptions = [
  // Principais
  { label: 'Rock', value: 'rock', category: 'main' },
  { label: 'Eletrônica', value: 'electronic', category: 'main' },
  { label: 'Hip-Hop', value: 'hip-hop', category: 'main' },
  { label: 'Jazz', value: 'jazz', category: 'main' },
  { label: 'Pop', value: 'pop', category: 'main' },
  { label: 'R&B', value: 'rnb', category: 'main' },
  { label: 'Metal', value: 'metal', category: 'main' },
  { label: 'Reggae', value: 'reggae', category: 'main' },
  { label: 'Blues', value: 'blues', category: 'main' },
  { label: 'Funk', value: 'funk', category: 'main' },
  { label: 'Soul', value: 'soul', category: 'main' },
  { label: 'Sertanejo', value: 'sertanejo', category: 'main' },
  { label: 'MPB', value: 'mpb', category: 'main' },

  // Subgêneros de Rock
  { label: 'Hard Rock', value: 'hard-rock', category: 'sub' },
  { label: 'Progressive Rock', value: 'progressive-rock', category: 'sub' },
  { label: 'Punk Rock', value: 'punk-rock', category: 'sub' },
  { label: 'Pop Punk', value: 'pop-punk', category: 'sub' },
  { label: 'Alternative Rock', value: 'alternative-rock', category: 'sub' },
  { label: 'Indie Rock', value: 'indie-rock', category: 'sub' },

  // Subgêneros de Eletrônica
  { label: 'House', value: 'house', category: 'sub' },
  { label: 'Techno', value: 'techno', category: 'sub' },
  { label: 'Drum & Bass', value: 'drum-and-bass', category: 'sub' },
  { label: 'Dubstep', value: 'dubstep', category: 'sub' },
  { label: 'Trance', value: 'trance', category: 'sub' },
  { label: 'EDM', value: 'edm', category: 'sub' },

  // Subgêneros de Hip-Hop
  { label: 'Trap', value: 'trap', category: 'sub' },
  { label: 'Boom Bap', value: 'boom-bap', category: 'sub' },
  { label: 'Lo-fi Hip-Hop', value: 'lofi-hip-hop', category: 'sub' },
  { label: 'Drill', value: 'drill', category: 'sub' },

  // Subgêneros de Metal
  { label: 'Heavy Metal', value: 'heavy-metal', category: 'sub' },
  { label: 'Thrash Metal', value: 'thrash-metal', category: 'sub' },
  { label: 'Death Metal', value: 'death-metal', category: 'sub' },
  { label: 'Black Metal', value: 'black-metal', category: 'sub' },
];

// ============================================
// MOCK USERS
// ============================================

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    age: 28,
    profileType: 'Guitarrista',
    genres: ['Rock', 'Blues', 'Jazz'],
    yearsExperience: 5,
    bio: 'Guitarrista profissional com experiência em bandas de rock e apresentações ao vivo. Procurando outros músicos para projetos colaborativos.',
    skills: [
      {
        category: 'Guitarrista',
        name: 'Guitarra Elétrica',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 8,
        isPrimary: true,
      },
      {
        category: 'Guitarrista',
        name: 'Guitarra Acústica',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 5,
        isPrimary: false,
      },
      {
        category: 'Produtor Musical',
        name: 'Composição',
        proficiencyLevel: 'Intermediate',
        yearsOfExperience: 3,
        isPrimary: false,
      },
    ],
    photo:
      'https://images.unsplash.com/photo-1566768514716-bf40f43b4fb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMGd1aXRhcmlzdCUyMHBlcmZvcm1lciUyMG1hbGV8ZW58MXx8fHwxNzcwMDc4MTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    videoDescription: 'Improviso de blues no meu estúdio 🎸 Essa progressão ficou incrível!',
  },
  {
    id: '2',
    name: 'Ana Costa',
    age: 25,
    profileType: 'DJ',
    genres: ['Eletrônica', 'House', 'Techno'],
    yearsExperience: 3,
    bio: 'DJ e produtora especializada em house e techno. Já toquei em vários festivais e procuro colaborações com outros produtores.',
    skills: [
      {
        category: 'DJ',
        name: 'Pioneer CDJ',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 4,
        isPrimary: true,
      },
      {
        category: 'DJ',
        name: 'Traktor',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 3,
        isPrimary: false,
      },
      {
        category: 'Produtor Musical',
        name: 'Ableton Live',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 3,
        isPrimary: false,
      },
      {
        category: 'Produtor Musical',
        name: 'Mixagem',
        proficiencyLevel: 'Intermediate',
        yearsOfExperience: 2,
        isPrimary: false,
      },
    ],
    photo:
      'https://images.unsplash.com/photo-1744902092359-df5b4c543fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkaiUyMG11c2ljJTIwcGVyZm9ybWVyfGVufDF8fHx8MTc3MDA3ODE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    videoDescription: 'Set de house progressivo na minha live de ontem 🔥 Drop épico aos 2min!',
  },
  {
    id: '3',
    name: 'Pedro Alves',
    age: 30,
    profileType: 'Baterista',
    genres: ['Rock', 'Metal', 'Punk'],
    yearsExperience: 8,
    bio: 'Baterista com experiência em bandas de rock e metal. Estou formando uma nova banda e procurando membros dedicados.',
    skills: [
      {
        category: 'Baterista',
        name: 'Bateria Acústica',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 10,
        isPrimary: true,
      },
      {
        category: 'Baterista',
        name: 'Percussão',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 6,
        isPrimary: false,
      },
    ],
    photo:
      'https://images.unsplash.com/photo-1746688384431-53d96bbf6417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMGRydW1tZXIlMjBtYWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMDc4MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    videoDescription: 'Ensaio da nova música da banda 🥁 Groove pesado demais!',
  },
  {
    id: '4',
    name: 'Julia Santos',
    age: 26,
    profileType: 'Vocalista',
    genres: ['Pop', 'R&B', 'Soul'],
    yearsExperience: 7,
    bio: 'Cantora e compositora de pop e R&B. Trabalhei em vários projetos de gravação e estou procurando produtores para meu novo EP.',
    skills: [
      {
        category: 'Vocalista',
        name: 'Vocal Principal',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 9,
        isPrimary: true,
      },
      {
        category: 'Vocalista',
        name: 'Backing Vocals',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 7,
        isPrimary: false,
      },
      {
        category: 'Produtor Musical',
        name: 'Composição',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 5,
        isPrimary: false,
      },
    ],
    photo:
      'https://images.unsplash.com/photo-1615748562188-07be820cff5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzaW5nZXIlMjBtdXNpY2lhbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDAyMjU2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    videoDescription: 'Cover de Ariana Grande que gravei hoje ✨ O que acharam?',
  },
  {
    id: '5',
    name: 'Lucas Ferreira',
    age: 32,
    profileType: 'Produtor Musical',
    genres: ['Hip Hop', 'Trap', 'R&B'],
    yearsExperience: 10,
    bio: 'Produtor musical com estúdio próprio. Especializado em hip hop e trap. Procuro artistas para produzir e colaborar.',
    skills: [
      {
        category: 'Produtor Musical',
        name: 'FL Studio',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 12,
        isPrimary: true,
      },
      {
        category: 'Beatmaker',
        name: 'Beat Making',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 10,
        isPrimary: false,
      },
      {
        category: 'Produtor Musical',
        name: 'Mixagem',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 8,
        isPrimary: false,
      },
      {
        category: 'Produtor Musical',
        name: 'Masterização',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 6,
        isPrimary: false,
      },
    ],
    photo:
      'https://images.unsplash.com/photo-1762290965691-e74072600c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcHJvZHVjZXIlMjBtdXNpYyUyMHN0dWRpb3xlbnwxfHx8fDE3NzAwNzgxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    videoDescription: 'Produzindo uma nova beat de trap 🔊 Grave destruidor!',
  },
  {
    id: '6',
    name: 'Marina Oliveira',
    age: 24,
    profileType: 'Baixista',
    genres: ['Funk', 'Rock', 'Jazz'],
    yearsExperience: 4,
    bio: 'Baixista de funk e rock. Toco em bandas covers e estou montando um projeto autoral. Procurando músicos alinhados!',
    skills: [
      {
        category: 'Baixista',
        name: 'Baixo Elétrico',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 6,
        isPrimary: true,
      },
      {
        category: 'Baixista',
        name: 'Contrabaixo',
        proficiencyLevel: 'Intermediate',
        yearsOfExperience: 2,
        isPrimary: false,
      },
    ],
    photo:
      'https://images.unsplash.com/photo-1717978227318-8ff6ee93bcf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBiYXNzaXN0JTIwbXVzaWNpYW4lMjByb2NrfGVufDF8fHx8MTc3MDA3ODE0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    videoDescription: 'Linha de baixo nova que criei 🎵 Groove funky demais!',
  },
];

export const mockMatches: Match[] = [
  {
    user: mockUsers[1],
    matchedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    user: mockUsers[3],
    matchedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    user: mockUsers[4],
    matchedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    user: mockUsers[5],
    matchedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
];

export const mockChats: ChatMessage[] = [
  {
    id: '1',
    user: mockUsers[1],
    lastMessage: 'Adorei seu trabalho! Vamos marcar um jam session?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 2,
  },
  {
    id: '2',
    user: mockUsers[3],
    lastMessage: 'Obrigada! Sim, estou disponível na sexta',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 0,
  },
  {
    id: '3',
    user: mockUsers[4],
    lastMessage: 'Você tem experiência com Logic Pro?',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 1,
  },
  {
    id: '4',
    user: mockUsers[5],
    lastMessage: 'Vou te mandar algumas referências!',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    unreadCount: 0,
  },
];

export const mockLikedYou: User[] = [mockUsers[0], mockUsers[2], mockUsers[4], mockUsers[5]];

export const currentUser: User = {
  id: 'current',
  name: 'Você',
  age: 27,
  profileType: 'Guitarrista',
  genres: ['Rock', 'Indie', 'Alternative'],
  yearsExperience: 6,
  bio: 'Guitarrista e compositor apaixonado por criar músicas autorais. Procurando músicos para formar uma banda de indie rock.',
  skills: [
    {
      id: '1',
      category: 'Guitarrista',
      name: 'Guitarra Elétrica',
      proficiencyLevel: 'Advanced',
      yearsOfExperience: '6',
      isPrimary: true,
    },
    {
      id: '2',
      category: 'Produtor Musical',
      name: 'Composição',
      proficiencyLevel: 'Expert',
      yearsOfExperience: '8',
      isPrimary: false,
    },
    {
      id: '3',
      category: 'Vocalista',
      name: 'Vocal Principal',
      proficiencyLevel: 'Intermediate',
      yearsOfExperience: '4',
      isPrimary: false,
    },
    {
      id: '4',
      category: 'Produtor Musical',
      name: 'Ableton Live',
      proficiencyLevel: 'Advanced',
      yearsOfExperience: '5',
      isPrimary: false,
    },
  ],
  photo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
};
