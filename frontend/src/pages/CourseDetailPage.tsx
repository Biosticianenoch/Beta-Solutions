import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Course } from "@/types/course";
import { CourseDetailSkeleton } from "@/components/courses/CourseDetailSkeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/courses/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching the course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <CourseDetailSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!course) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Course not found</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{course.category}</span>
            <span className="text-gray-600">{course.level}</span>
            <span className="text-gray-600">{course.duration}</span>
          </div>
        </div>
        <button className="btn btn-primary">Download PDF</button>
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p>{course.description}</p>
      </div>

      {course.objectives && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Learning Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.objectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-2">
                <span>•</span>
                <span>{objective}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {course.skills && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Skills You'll Gain</h2>
          <div className="flex flex-wrap gap-2">
            {course.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-6 border-t">
        <div>
          <p className="font-semibold mb-1">Instructor</p>
          <p className="text-gray-600">{course.instructor || 'DataQuest Team'}</p>
        </div>
        <button className="btn btn-primary">Start Learning</button>
      </div>
    </div>
  );
};
