export interface Module {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  duration: number; // in minutes
  content: string; // URL or content ID
  order: number;
  required: boolean;
  prerequisites?: string[]; // IDs of required modules
}

export interface Quiz {
  id: string;
  moduleId: string;
  questions: {
    id: string;
    question: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer';
    options?: string[];
    correctAnswer: string | string[];
    points: number;
  }[];
  passingScore: number;
  timeLimit?: number; // in minutes
}

export interface Assignment {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  dueDate?: Date;
  points: number;
  submissionType: 'file' | 'text' | 'link';
  rubric?: {
    criteria: string;
    points: number;
  }[];
}

export interface CourseProgress {
  userId: string;
  courseId: string;
  enrollmentDate: Date;
  lastAccessed: Date;
  status: 'not-started' | 'in-progress' | 'completed';
  overallProgress: number;
  moduleProgress: {
    [moduleId: string]: {
      status: 'not-started' | 'in-progress' | 'completed';
      completedAt?: Date;
      timeSpent: number; // in minutes
      score?: number;
      attempts: number;
    };
  };
  quizScores: {
    [quizId: string]: {
      score: number;
      attempts: number;
      lastAttempt: Date;
      passed: boolean;
    };
  };
  assignmentScores: {
    [assignmentId: string]: {
      score: number;
      submittedAt: Date;
      feedback?: string;
      status: 'pending' | 'graded' | 'resubmit';
    };
  };
  certificates: {
    id: string;
    issuedAt: Date;
    type: 'completion' | 'achievement';
    achievementId?: string;
  }[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  pdfUrl: string;
  thumbnailUrl?: string;
  instructor?: string;
  price?: number;
  rating?: number;
  enrolledStudents?: number;
  lastUpdated?: string;
  objectives?: string[];
  skills?: string[];
  tags?: string[];
}

export enum CourseCategory {
  DATA_ANALYSIS = "Data Analysis",
  MACHINE_LEARNING = "Machine Learning",
  DATA_COLLECTION = "Data Collection",
  STATISTICAL_ANALYSIS = "Statistical Analysis",
  DATA_VISUALIZATION = "Data Visualization",
  QUALITATIVE_ANALYSIS = "Qualitative Analysis",
  TOOLS_AND_SOFTWARE = "Tools and Software"
}

export enum CourseLevel {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced"
} 