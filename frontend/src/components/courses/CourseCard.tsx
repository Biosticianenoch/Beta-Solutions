import { Course } from "@/types/course";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{course.category}</Badge>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        <CardTitle className="mt-2 line-clamp-2">{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {course.description}
        </p>
        <div className="mt-4 space-y-2">
          {course.instructor && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2" />
              {course.instructor}
            </div>
          )}
          {course.rating && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="w-4 h-4 mr-2" />
              {course.rating.toFixed(1)} ({course.enrolledStudents} students)
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="outline" asChild>
          <Link to={`/courses/${course.id}`}>
            View Details
          </Link>
        </Button>
        <Button variant="default" asChild>
          <a href={course.pdfUrl} target="_blank" rel="noopener noreferrer">
            <FileText className="w-4 h-4 mr-2" />
            Download PDF
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}; 