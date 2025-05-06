import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Background } from "@/components/layout/Background";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  pdf: string;
  instructor: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/courses/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch course");
        return res.json();
      })
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [id]);

  const handlePay = async () => {
    setPaying(true);
    setPayError(null);
    try {
      const res = await fetch(`/api/courses/${id}/pay`, { method: "POST" });
      if (!res.ok) throw new Error("Payment failed");
      setPaid(true);
    } catch (e: any) {
      setPayError(e.message);
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!course) return <div className="p-8">Course not found.</div>;

  return (
    <Background>
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="mb-2 text-gray-700">{course.description}</p>
          <div className="mb-2">Instructor: <span className="font-semibold">{course.instructor}</span></div>
          <div className="mb-2">Price: <span className="font-semibold">${course.price}</span></div>
          <div className="mb-2">Status: <span className="font-semibold">{course.status}</span></div>
          <div className="mb-6 text-sm text-gray-500">Last updated: {course.updatedAt}</div>

          {course.price > 0 && !paid ? (
            <div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={handlePay}
                disabled={paying}
              >
                {paying ? "Processing..." : `Purchase for $${course.price}`}
              </button>
              {payError && <div className="text-red-500 mt-2">{payError}</div>}
            </div>
          ) : (
            <a
              href={`/api/courses/${course.id}/resource`}
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resource (PDF)
            </a>
          )}
        </div>
      </Layout>
    </Background>
  );
};
