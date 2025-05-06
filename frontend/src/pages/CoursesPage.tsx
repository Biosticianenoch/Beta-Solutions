import { Layout } from "@/components/layout/Layout";
import { Background } from "@/components/layout/Background";
import { CourseList } from "@/components/courses/CourseList";
import { Course } from "@/types/course";
import { CourseCategory, CourseLevel } from "@/types/course";
import { useState, useEffect } from "react";
import { CourseCard } from "@/components/courses/CourseCard";
import { SearchBar } from "@/components/courses/SearchBar";
import { FilterBar } from "@/components/courses/FilterBar";
import { Pagination } from "@/components/ui/Pagination";
import { Alert } from "@/components/ui/Alert";
import { Skeleton } from "@/components/ui/skeleton";

// Fetch course data from backend
const API_URL = import.meta.env.VITE_API_URL;

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    level: "",
    sortBy: "newest",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          search: searchQuery,
          ...filters,
        });

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/courses?${queryParams}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data.courses);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage, searchQuery, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="error" title="Error">
          {error}
        </Alert>
      </div>
    );
  }

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
            <div className="mb-8">
              <SearchBar onSearch={handleSearch} />
              <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            </div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <Skeleton className="h-48 w-full mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : courses.length > 0 ? (
              <>
                <CourseList courses={courses} />
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No courses found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Background>
  );
};

export default CoursesPage;
