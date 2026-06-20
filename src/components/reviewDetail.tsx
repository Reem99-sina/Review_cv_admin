'use client'
import { useReviewById } from "@/action/review";

export function ReviewDetail({id}:{id:string}) {
  const { data, isLoading } = useReviewById({ id: id });
  
    const review = data?.review;
  
    if (isLoading) return <p className="text-white">Loading...</p>;
  
    if (!review) return <p className="text-red-500">Not found</p>;
  
    return (
      <div className="p-6 text-white space-y-6">
        {/* Resume info */}
        <div className="bg-gray-900 p-4 rounded">
          <h2 className="text-lg font-bold">{review.resume?.title}</h2>
  
          <a
            href={review.resume?.fileUrl}
            target="_blank"
            className="text-blue-400 underline"
          >
            View Resume File
          </a>
        </div>
  
        {/* ATS Score */}
        <div>
          <h3 className="font-bold">ATS Score</h3>
          <p className="text-2xl text-green-500">{review.ats_score}</p>
        </div>
  
        {/* Strengths */}
        <div>
          <h3 className="font-bold text-green-400">Strengths</h3>
          <ul className="list-disc ml-5">
            {review.strengths?.length > 0 ? (
              review.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)
            ) : (
              <p>No strengths found</p>
            )}
          </ul>
        </div>
  
        {/* Weaknesses */}
        <div>
          <h3 className="font-bold text-red-400">Weaknesses</h3>
          <ul className="list-disc ml-5">
            {review.weaknesses?.map((w: string, i: number) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
  
        {/* Missing Keywords */}
        <div>
          <h3 className="font-bold text-yellow-400">Missing Keywords</h3>
          <ul className="list-disc ml-5">
            {review.missing_keywords?.map((k: string, i: number) => (
              <li key={i}>{k}</li>
            ))}
          </ul>
        </div>
  
        {/* Improved Summary */}
        <div>
          <h3 className="font-bold text-blue-400">Improved Summary</h3>
          <p className="bg-gray-800 p-3 rounded">{review.improved_summary}</p>
        </div>
      </div>
    );
}