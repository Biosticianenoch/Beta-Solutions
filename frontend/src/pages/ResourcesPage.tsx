import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Download } from "lucide-react";
import { Link } from "react-router-dom";

const resources = [
  {
    title: "Case Studies",
    description: "Explore our successful projects and client stories.",
    icon: <FileText className="h-6 w-6" />,
    items: [
      {
        title: "Healthcare Analytics Implementation",
        link: "/documents/case-studies/healthcare-analytics.pdf"
      },
      {
        title: "Retail Sales Optimization",
        link: "/documents/case-studies/retail-sales.pdf"
      },
      {
        title: "Financial Risk Assessment",
        link: "/documents/case-studies/financial-risk.pdf"
      }
    ]
  },
  {
    title: "E-books",
    description: "Download our free e-books on data science and analytics.",
    icon: <BookOpen className="h-6 w-6" />,
    items: [
      {
        title: "Introduction to Data Science",
        link: "/documents/ebooks/intro-to-data-science.pdf"
      },
      {
        title: "Machine Learning Fundamentals",
        link: "/documents/ebooks/ml-fundamentals.pdf"
      },
      {
        title: "Data Visualization Best Practices",
        link: "/documents/ebooks/data-visualization.pdf"
      }
    ]
  }
];

const ResourcesPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">Resources</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((section) => (
              <Card key={section.title}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {section.icon}
                    </div>
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground mt-2">{section.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <span className="font-medium">{item.title}</span>
                        <Link
                          to={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                        >
                          <Download className="h-5 w-5" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage; 