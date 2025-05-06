import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { Background } from '@/components/ui/background';
import PageHeader from '@/components/layout/PageHeader';

const faqs = [
  {
    question: 'Will I receive a certificate after completing the course?',
    answer: `Yes, you will receive a certificate upon successful completion of the course, provided you meet the stipulated criteria such as participation, assessments, and project submissions.`
  },
  {
    question: 'What differentiates DataQuest Solutions from the rest?',
    answer: `At DataQuest Solutions, we go beyond just teaching tools — we focus on practical, project-based learning designed for real-world impact. Here's what sets us apart:\n\n• Industry-Relevant Curriculum: Our courses are designed by experienced professionals who understand what employers and research institutions look for.\n• Hands-On Experience: You’ll work with real datasets and complete practical projects that strengthen your portfolio.\n• Expert Guidance: Our instructors and mentors are available to guide you through challenges and provide personalized feedback.\n• Supportive Learning Community: You’ll be part of a growing network of data enthusiasts, with access to discussion forums, webinars, and alumni connections.\n• Certification with Credibility: Our certificates are recognized by professionals in academia, public health, and data science sectors.`
  },
  {
    question: 'Will I get a job after completing the program?',
    answer: `While we cannot guarantee job placement, completing this program will equip you with in-demand data analysis skills that are highly valued in the job market. You’ll build a solid portfolio through hands-on projects, which can strengthen your resume and help you stand out in applications.\n\nAdditionally, we offer career support, including:\n• Resume and LinkedIn profile tips\n• Guidance on building a data portfolio\n• Interview preparation resources\n• Job board and networking opportunities within our learning community`
  },
  {
    question: `What if I'm not familiar with programming at all?`,
    answer: `No problem at all! This course is designed with beginners in mind — you don’t need any prior programming experience. We start from the basics, guiding you step-by-step through using R for data analysis.\n\nOur lessons are clear, beginner-friendly, and project-based, so you’ll build confidence as you go. Plus, you’ll have access to community support and live Q&A sessions if you ever get stuck.`
  },
  {
    question: 'Are there quizzes, assignments, or exams to test my learning?',
    answer: `Yes! The course includes quizzes, practical assignments, and project-based assessments designed to reinforce your learning at every stage. These activities help you:\n• Apply concepts in real-world scenarios\n• Test your understanding after each module\n• Build a portfolio of work you can showcase to employers\n\nThere are no traditional “exams,” but your progress will be evaluated through continuous, hands-on engagement — ensuring that you're not just watching lessons, but actually gaining skills.`
  }
];

const FAQPage = () => {
  return (
    <Background image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop" overlayOpacity={0.85}>
      <Layout>
        <PageHeader
          title="Frequently Asked Questions"
          subtitle="Answers to common questions about DataQuest Solutions programs and services."
          backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop"
        />
        <div className="container mx-auto py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="bg-white/95 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="whitespace-pre-line text-base text-muted-foreground">{faq.answer}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    </Background>
  );
};

export default FAQPage;
