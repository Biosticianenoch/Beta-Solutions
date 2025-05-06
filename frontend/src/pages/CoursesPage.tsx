import { Layout } from "@/components/layout/Layout";
import { Background } from "@/components/layout/Background";
import { CourseList } from "@/components/courses/CourseList";
import { Course } from "@/types/course";
import { CourseCategory, CourseLevel } from "@/types/course";

// Fetch course data from backend
import { useEffect, useState } from "react";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/courses")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch courses");
        return res.json();
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
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
            {loading && <div>Loading courses...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                  <div key={course.id} className="border rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                      <p className="mb-2 text-gray-700">{course.description}</p>
                      <div className="mb-2 text-sm text-gray-500">Instructor: {course.instructor}</div>
                      <div className="mb-2 text-sm text-gray-500">Price: ${course.price}</div>
                    </div>
                    <a
                      href={`/courses/${course.id}`}
                      className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
                    >
                      View Details
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Background>
  );
};

export default CoursesPage;
