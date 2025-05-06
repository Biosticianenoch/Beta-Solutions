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

  {
    id: "1",
    title: "Data Analysis with Python",
    description: "Learn data analysis using Python, including pandas, numpy, and matplotlib for data manipulation and visualization.",
    category: CourseCategory.DATA_ANALYSIS,
    level: CourseLevel.INTERMEDIATE,
    duration: "8 weeks",
    pdfUrl: "/courses/Data Analysis With Python.pdf",
    instructor: "Dr. John Smith",
    rating: 4.8,
    enrolledStudents: 1200,
    lastUpdated: "2024-03-15"
  },
  {
    id: "2",
    title: "Data Analysis with R",
    description: "Master data analysis using R programming language, including data manipulation, visualization, and statistical analysis.",
    category: CourseCategory.DATA_ANALYSIS,
    level: CourseLevel.INTERMEDIATE,
    duration: "8 weeks",
    pdfUrl: "/courses/Data Analysis With R.pdf",
    instructor: "Dr. Sarah Johnson",
    rating: 4.7,
    enrolledStudents: 950,
    lastUpdated: "2024-03-10"
  },
  {
    id: "3",
    title: "Machine Learning with Python",
    description: "Learn machine learning algorithms and techniques using Python, scikit-learn, and TensorFlow.",
    category: CourseCategory.MACHINE_LEARNING,
    level: CourseLevel.ADVANCED,
    duration: "10 weeks",
    pdfUrl: "/courses/Machine Learning with Python.pdf",
    instructor: "Prof. Michael Brown",
    rating: 4.9,
    enrolledStudents: 850,
    lastUpdated: "2024-03-05"
  },
  {
    id: "4",
    title: "Deep Learning with Python",
    description: "Explore deep learning concepts and implementations using Python, TensorFlow, and PyTorch.",
    category: CourseCategory.MACHINE_LEARNING,
    level: CourseLevel.ADVANCED,
    duration: "12 weeks",
    pdfUrl: "/courses/Deep Learning with Python.pdf",
    instructor: "Dr. Emily Chen",
    rating: 4.8,
    enrolledStudents: 720,
    lastUpdated: "2024-03-01"
  },
  {
    id: "5",
    title: "Data Collection using ODK",
    description: "Learn to collect and manage field data using Open Data Kit (ODK) for research and surveys.",
    category: CourseCategory.DATA_COLLECTION,
    level: CourseLevel.BEGINNER,
    duration: "6 weeks",
    pdfUrl: "/courses/Data Collection using ODK.pdf",
    instructor: "Prof. David Wilson",
    rating: 4.7,
    enrolledStudents: 1500,
    lastUpdated: "2024-02-28"
  },
  {
    id: "6",
    title: "Data Collection with KoBo Toolbox",
    description: "Master data collection using KoBo Toolbox for field research and surveys.",
    category: CourseCategory.DATA_COLLECTION,
    level: CourseLevel.BEGINNER,
    duration: "6 weeks",
    pdfUrl: "/courses/Data Collection with KoBo ToolBoox.pdf",
    instructor: "Dr. Lisa Anderson",
    rating: 4.6,
    enrolledStudents: 1300,
    lastUpdated: "2024-02-25"
  },
  {
    id: "7",
    title: "Data Collection Using Commcare",
    description: "Learn to use Commcare for mobile data collection and field research.",
    category: CourseCategory.DATA_COLLECTION,
    level: CourseLevel.BEGINNER,
    duration: "6 weeks",
    pdfUrl: "/courses/Data Collection Using Commcare.pdf",
    instructor: "Prof. Robert Taylor",
    rating: 4.5,
    enrolledStudents: 1100,
    lastUpdated: "2024-02-20"
  },
  {
    id: "8",
    title: "Qualitative Data Analysis using Dedoose",
    description: "Master qualitative data analysis using Dedoose software for research projects.",
    category: CourseCategory.QUALITATIVE_ANALYSIS,
    level: CourseLevel.INTERMEDIATE,
    duration: "8 weeks",
    pdfUrl: "/courses/Qualitative Data Analysis using Dedoose.pdf",
    instructor: "Dr. Maria Garcia",
    rating: 4.7,
    enrolledStudents: 900,
    lastUpdated: "2024-02-15"
  },
  {
    id: "9",
    title: "Qualitative Data Analysis using NVIVO",
    description: "Learn qualitative data analysis using NVIVO software for research and academic projects.",
    category: CourseCategory.QUALITATIVE_ANALYSIS,
    level: CourseLevel.INTERMEDIATE,
    duration: "8 weeks",
    pdfUrl: "/courses/Qualitative Data Analysis using NVIVO.pdf",
    instructor: "Dr. James Wilson",
    rating: 4.8,
    enrolledStudents: 950,
    lastUpdated: "2024-02-10"
  },
  {
    id: "10",
    title: "Survival Analysis with R",
    description: "Master survival analysis techniques using R programming language.",
    category: CourseCategory.STATISTICAL_ANALYSIS,
    level: CourseLevel.ADVANCED,
    duration: "10 weeks",
    pdfUrl: "/courses/Survival Analysis with R.pdf",
    instructor: "Dr. Thomas Lee",
    rating: 4.9,
    enrolledStudents: 780,
    lastUpdated: "2024-02-05"
  },
  {
    id: "11",
    title: "Time Series Analysis with R",
    description: "Learn time series analysis and forecasting using R programming language.",
    category: CourseCategory.STATISTICAL_ANALYSIS,
    level: CourseLevel.ADVANCED,
    duration: "10 weeks",
    pdfUrl: "/courses/Time Series Analysis with R.pdf",
    instructor: "Dr. Patricia Martinez",
    rating: 4.8,
    enrolledStudents: 820,
    lastUpdated: "2024-02-01"
  },
export const CoursesPage = () => {
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
