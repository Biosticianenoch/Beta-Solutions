import { Layout } from "@/components/layout/Layout";
import { Background } from "@/components/layout/Background";
import { CourseList } from "@/components/courses/CourseList";
import { Course } from "@/types/course";
import { CourseCategory, CourseLevel } from "@/types/course";

// Fetch course data from backend
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/courses`);
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Background>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Our Courses</h1>
              <p className="text-muted-foreground mt-2">
                Explore our comprehensive collection of data science and analysis courses.
              </p>
            </div>
            {error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <CourseList courses={courses} isLoading={loading} />
            )}
          </div>
        </div>
      </Layout>
    </Background>
  );
};

export default CoursesPage;
