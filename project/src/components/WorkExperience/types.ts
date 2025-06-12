export interface Project {
  name: string;
  description: string;
  link?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  category: 'Internship' | 'Full-time' | 'Part-time' | 'Freelance' | 'Volunteer'; // Added category
  progress: number; // Progress percentage (0-100)
  achievements: string[];
  skills: string[];
  projects: Project[];
}