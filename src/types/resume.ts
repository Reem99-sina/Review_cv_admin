export type UploadResumeData = {
  file: FileList;
};

export type reviewResume = {
  id: string;
  resume_id: string;
  ats_score: number;
  strengths: string[];
  weaknesses: string[];
  missing_keywords: string[];
  improved_summary: string;
  created_at: string;
};


export interface SessionContentReviewFile {
  id: string;
  title: string;
  fileUrl: string;
  rawText: string;
  userId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  reviews: reviewResume[];
}

