// Mock data for the ComicZone application

// User profiles
export const mockUsers = [
  {
    id: '1',
    username: 'ComicFan123',
    email: 'comicfan@example.com',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'user',
    stats: {
      uploads: 5,
      favorites: 12,
      downloads: 28
    },
    favoriteComics: ['1', '3', '5']
  },
  {
    id: '2',
    username: 'MangaMaster',
    email: 'mangamaster@example.com',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'user',
    stats: {
      uploads: 8,
      favorites: 15,
      downloads: 42
    },
    favoriteComics: ['2', '4', '6']
  },
  {
    id: '3',
    username: 'WebtoonCreator',
    email: 'creator@example.com',
    profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
    role: 'creator',
    stats: {
      uploads: 15,
      favorites: 7,
      downloads: 120
    },
    favoriteComics: ['1', '2', '3', '4', '5', '6']
  }
];

// Comics data
export const mockComics = [
  {
    id: '1',
    title: 'The Last Hero',
    cover: 'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    summary: 'In a world where superheroes have vanished, one ordinary person discovers they have extraordinary powers. As the last remaining hero, they must protect humanity from an ancient evil that threatens to destroy everything.',
    author: 'Alex Rivera',
    artist: 'Sarah Chen',
    genre: 'Action/Adventure',
    status: 'Ongoing',
    rating: 4.8,
    readers: '12.5k',
    chapters: [
      { 
        id: '1-1',
        number: 1, 
        title: 'The Awakening',
        date: '2024-01-15',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      },
      { 
        id: '1-2',
        number: 2, 
        title: 'First Battle',
        date: '2024-02-01',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      },
      { 
        id: '1-3',
        number: 3, 
        title: 'The Hidden Truth',
        date: '2024-02-15',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      }
    ],
    popularity: 'high',
    trending: true
  },
  {
    id: '2',
    title: 'Space Adventures',
    cover: 'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    summary: 'Join the crew of the starship Nebula as they explore the far reaches of the galaxy. Encounter alien civilizations, discover new worlds, and face the challenges of deep space travel in this epic sci-fi adventure.',
    author: 'Jamie Chen',
    artist: 'Michael Rodriguez',
    genre: 'Sci-Fi',
    status: 'Completed',
    rating: 4.5,
    readers: '8.3k',
    chapters: [
      { 
        id: '2-1',
        number: 1, 
        title: 'Launch Day',
        date: '2023-12-10',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      },
      { 
        id: '2-2',
        number: 2, 
        title: 'First Contact',
        date: '2023-12-25',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      },
      { 
        id: '2-3',
        number: 3, 
        title: 'The Nebula\'s Secret',
        date: '2024-01-10',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      }
    ],
    popularity: 'medium',
    trending: false
  },
  {
    id: '3',
    title: 'Mystic World',
    cover: 'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    summary: 'In a world where magic is real and mythical creatures roam the land, a young apprentice must master the ancient arts to save their kingdom from a dark sorcerer who seeks to plunge the world into eternal darkness.',
    author: 'Elena Blackwood',
    artist: 'David Kim',
    genre: 'Fantasy',
    status: 'Ongoing',
    rating: 4.9,
    readers: '15.7k',
    chapters: [
      { 
        id: '3-1',
        number: 1, 
        title: 'The Apprentice',
        date: '2024-01-05',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      },
      { 
        id: '3-2',
        number: 2, 
        title: 'The First Spell',
        date: '2024-01-20',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      },
      { 
        id: '3-3',
        number: 3, 
        title: 'The Dark Forest',
        date: '2024-02-05',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      }
    ],
    popularity: 'high',
    trending: true
  },
  {
    id: '4',
    title: 'Cyber Dreams',
    cover: 'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    summary: 'In a neon-lit future where technology and humanity are becoming increasingly intertwined, a brilliant programmer discovers a way to enter the digital realm. As they navigate this new world, they uncover a conspiracy that could change the fate of both the virtual and physical worlds.',
    author: 'Marcus Chen',
    artist: 'Sophia Lee',
    genre: 'Cyberpunk',
    status: 'Ongoing',
    rating: 4.6,
    readers: '9.2k',
    chapters: [
      { 
        id: '4-1',
        number: 1, 
        title: 'Digital Awakening',
        date: '2024-01-10',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      },
      { 
        id: '4-2',
        number: 2, 
        title: 'The Grid',
        date: '2024-01-25',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      },
      { 
        id: '4-3',
        number: 3, 
        title: 'Digital Shadows',
        date: '2024-02-10',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      }
    ],
    popularity: 'medium',
    trending: true
  },
  {
    id: '5',
    title: 'Neon Nights',
    cover: 'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    summary: 'In a city that never sleeps, a private detective with a troubled past takes on a case that leads them into the dark underbelly of society. As they follow the trail of clues, they uncover a conspiracy that reaches the highest levels of power.',
    author: 'Noir Writer',
    artist: 'Neon Artist',
    genre: 'Sci-Fi/Noir',
    status: 'Completed',
    rating: 4.7,
    readers: '11.3k',
    chapters: [
      { 
        id: '5-1',
        number: 1, 
        title: 'The Case',
        date: '2023-12-15',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      },
      { 
        id: '5-2',
        number: 2, 
        title: 'The Client',
        date: '2023-12-30',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      },
      { 
        id: '5-3',
        number: 3, 
        title: 'The Truth',
        date: '2024-01-15',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      }
    ],
    popularity: 'high',
    trending: false
  },
  {
    id: '6',
    title: 'Fantasy Quest',
    cover: 'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    summary: 'A group of unlikely heroes embarks on an epic quest to save their world from an ancient evil. Along the way, they must overcome their differences, face their fears, and discover the true meaning of friendship and courage.',
    author: 'Quest Master',
    artist: 'Fantasy Artist',
    genre: 'Fantasy/Adventure',
    status: 'Ongoing',
    rating: 4.8,
    readers: '13.9k',
    chapters: [
      { 
        id: '6-1',
        number: 1, 
        title: 'The Gathering',
        date: '2024-01-20',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      },
      { 
        id: '6-2',
        number: 2, 
        title: 'The Journey Begins',
        date: '2024-02-05',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      },
      { 
        id: '6-3',
        number: 3, 
        title: 'The First Trial',
        date: '2024-02-20',
        pages: [
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1614728894747-a83421789f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ]
      }
    ],
    popularity: 'high',
    trending: true
  }
];

// Helper functions to get data
export const getComicById = (id) => {
  return mockComics.find(comic => comic.id === id);
};

export const getChapterById = (comicId, chapterNumber) => {
  const comic = getComicById(comicId);
  if (!comic) return null;
  return comic.chapters.find(chapter => chapter.number === parseInt(chapterNumber));
};

export const getUserById = (id) => {
  return mockUsers.find(user => user.id === id);
};

// Get popular comics
export const getPopularComics = () => {
  return mockComics.filter(comic => comic.popularity === 'high');
};

// Get trending comics
export const getTrendingComics = () => {
  return mockComics.filter(comic => comic.trending);
};

// Get comics by genre
export const getComicsByGenre = (genre) => {
  return mockComics.filter(comic => comic.genre.includes(genre));
}; 