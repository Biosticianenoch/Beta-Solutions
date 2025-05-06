import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Background } from '@/components/ui/background';
import { Layout } from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { 
  BarChart2, 
  Database, 
  Brain, 
  Code, 
  ArrowRight,
  LineChart,
  PieChart,
  FileText,
  Users,
  Settings,
  BarChart3,
  Palette,
  Globe,
  ClipboardList,
  GraduationCap,
  FileBarChart,
  Calculator,
  File,
  MessageSquare,
  Wrench
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Data Analysis',
    description: `In today’s data-driven world, timely and accurate insights are critical for success. At DataQuest Solutions, we empower researchers, students, businesses, and institutions to make informed decisions through precise and comprehensive data analysis. Our team of seasoned data analysts and statisticians delivers tailored solutions by leveraging a wide array of advanced analytical tools and techniques. Whether you're conducting academic research, business forecasting, or complex data modeling, we bring clarity to your data.`,
    icon: <BarChart3 className="h-6 w-6" />,
    features: [
      'Statistical Analysis – from descriptive to inferential analytics',
      'Time Series Analysis – identifying trends, seasonality, and forecasting',
      'Survival Analysis – ideal for medical, engineering, and reliability studies',
      'Spatial Analysis – analyzing geographic or location-based data',
      'Data Visualization – transforming complex data into clear, actionable visuals',
      'Tools: SPSS, STATA, R, Python, Excel, Power BI, Tableau'
    ],
    image: '/images/image (2).jpg'
  },
  {
    id: 2,
    title: 'Data Collection',
    description: `Effective decision-making starts with accurate, high-quality data. Data collection is not just about gathering information—it's about obtaining reliable, actionable insights that drive success. With a blend of cutting-edge tools and deep domain expertise, we deliver data collection solutions tailored to your needs across diverse industries and sectors.`,
    icon: <Database className="h-6 w-6" />,
    features: [
      'CommCare – For mobile-based, scalable data collection in field research and health programs',
      'ODK (Open Data Kit) – Ideal for complex surveys, offline data entry, and rural deployments',
      'KoBo Toolbox – User-friendly, open-source tool for humanitarian and development settings',
      'Google Forms – Quick, efficient data collection for small to medium-scale surveys',
      'Web and Database Mining – Automated extraction of structured data from the internet and specialized databases'
    ],
    image: '/images/image (1).jpg'
  },
  {
    id: 3,
    title: 'AI Development',
    description: `We stand at the forefront of the AI revolution. As AI continues to surpass traditional workflows, we are committed to helping businesses adapt, thrive, and lead through intelligent innovation. We specialize in delivering cutting-edge AI development services that drive value, optimize operations, and fuel growth.`,
    icon: <Brain className="h-6 w-6" />,
    features: [
      'Machine Learning – Predictive and analytical models that learn from data',
      'Deep Learning – Neural networks for image recognition, NLP, and more',
      'Recommendation Systems – Intelligent systems to personalize user experiences',
      'Agentic AI Systems – Autonomous agents for complex, context-aware tasks',
      'Data Systems Development & Deployment – Robust data architectures, pipelines, and scalable AI solutions'
    ],
    image: '/images/image (7).jpg'
  },
  {
    id: 4,
    title: 'Science Research Writing',
    description: `High-quality scientific research is the cornerstone of innovation, policy development, and academic excellence. We offer comprehensive Science Research Writing services designed to support researchers, scholars, and institutions in producing well-structured, publication-ready manuscripts and reports.`,
    icon: <FileText className="h-6 w-6" />,
    features: [
      'Scientific Manuscript Writing – Research papers, theses, dissertations, review articles',
      'Research Proposal Development – Compelling, methodologically sound proposals',
      'Data Interpretation & Reporting – Coherent, insightful narratives from complex data',
      'Systematic Reviews & Meta-Analyses – Comprehensive synthesis of literature',
      'Technical & Scientific Editing – Clarity, consistency, and compliance with guidelines',
      'Publication Support – Formatting, submission, and reviewer response assistance'
    ],
    image: '/images/image (3).jpg'
  },
  {
    id: 5,
    title: 'Graphic Design',
    description: `Powerful design is more than aesthetics — it's about communication, identity, and impact. Our Graphic Design services are tailored to help individuals, businesses, and organizations stand out with creativity, consistency, and purpose.`,
    icon: <Palette className="h-6 w-6" />,
    features: [
      'Brand Identity Design – Logos, brand kits, color schemes, typography',
      'Marketing Materials – Posters, flyers, brochures, social media graphics, banners',
      'Presentation Design – Professionally designed slide and pitch decks',
      'Infographics & Visual Data – Clear, digestible, visually appealing graphics',
      'UI/UX Design – User-centered interfaces for websites, dashboards, applications',
      'Print & Digital Designs – Business cards, stationery, digital ads, eBooks'
    ],
    image: '/images/image (4).jpg'
  },
  {
    id: 6,
    title: 'Web Development',
    description: `Your website is more than just a digital presence — it's a vital part of your brand, business strategy, and customer experience. Our Web Development services are tailored to create modern, responsive, and functional websites that deliver real results.`,
    icon: <Globe className="h-6 w-6" />,
    features: [
      'Custom Website Development – Fully tailored, latest technologies',
      'Responsive Design – Beautiful on desktops, tablets, smartphones',
      'E-commerce Solutions – Secure, user-friendly online stores',
      'Content Management Systems (CMS) – WordPress, Joomla, Drupal',
      'Web Applications – Interactive platforms for internal or customer use',
      'SEO & Performance Optimization – Fast, search-engine-friendly',
      'Website Maintenance & Support – Updates, backups, bug fixes, monitoring'
    ],
    image: '/images/image (5).jpg'
  },
  {
    id: 7,
    title: 'Project Development',
    description: `Successful projects result from strategic planning, efficient coordination, and agile execution. We offer end-to-end project management solutions tailored to research, data science, technology, business, and development sectors.`,
    icon: <ClipboardList className="h-6 w-6" />,
    features: [
      'Project Planning & Design – Goals, timelines, deliverables, resource allocation',
      'Team Coordination & Communication – Clear task assignment, collaboration',
      'Risk Assessment & Mitigation – Prevent delays and budget overruns',
      'Monitoring & Evaluation – KPIs, milestones, real-time reporting',
      'Budget Management – Resource allocation, expense tracking, cost control',
      'Documentation & Reporting – Status reports, evaluations, impact summaries',
      'Agile, Scrum, Waterfall, Hybrid project management frameworks'
    ],
    image: '/images/image (6).jpg'
  },
  {
    id: 8,
    title: 'Report Writing',
    description: `A well-written report is a strategic tool for communication, decision-making, and documentation. Our Report Writing services help transform complex data and findings into clear, professional, and actionable documents.`,
    icon: <File className="h-6 w-6" />,
    features: [
      'Research Reports – Academic, scientific, and policy-driven research',
      'Project Reports – Progress, implementation, outcomes, recommendations',
      'Monitoring and Evaluation (M&E) Reports – Performance assessment',
      'Technical Reports – Complex methodologies and systems explained',
      'Business Reports – Feasibility studies, market analysis, proposals, reviews',
      'Progress & Status Reports – Regular project updates',
      'Annual and Institutional Reports – Yearly performance and reviews'
    ],
    image: '/images/image (10).jpg'
  },
  {
    id: 9,
    title: 'Training',
    description: `Knowledge is power — and skills are the engine of progress. Our Training Services are designed for students, professionals, researchers, and institutions looking to build capacity in data science, technology, research, and digital skills.`,
    icon: <GraduationCap className="h-6 w-6" />,
    features: [
      'Data Science & Analytics – R, Python, SPSS, Excel, Power BI, Tableau, SQL, Stata',
      'AI & Machine Learning – Deep learning, recommendation engines, predictive analytics',
      'Web & Software Development – Front-end, back-end, UI/UX, deployment',
      'Research Methods & Scientific Writing – Design, interpretation, proposals, publication',
      'Project Management – Planning, coordination, M&E, budgeting, reporting',
      'Professional & Digital Skills – Graphic design, MS Office, LinkedIn, presentation, computer literacy',
      'Interactive, hands-on, expert-led, real-world, online/onsite/hybrid'
    ],
    image: '/images/image (8).jpg'
  },
  {
    id: 10,
    title: 'Consultation',
    description: `Navigating complex challenges requires more than data or technology — it requires insight, strategy, and expertise. Our Consultation Services support individuals, businesses, researchers, and organizations in making informed, data-driven decisions.`,
    icon: <MessageSquare className="h-6 w-6" />,
    features: [
      'Data Science & Analytics – Modeling, machine learning, big data',
      'Research Design & Methodology – Structuring research, methods, data collection',
      'Health & Epidemiological Research – Public health, modeling, clinical research',
      'System Development & Deployment – Efficient data systems, deployment',
      'Academic & Professional Projects – Thesis, proposals, writing, presentations',
      'Business Intelligence – Dashboards, KPIs, strategic decisions',
      'Digital Transformation – Integrating technology, improving workflows, automation',
      'Expert consultants, personalized, practical, confidential, in-person/remote'
    ],
    image: '/images/image (9).jpg'
  }
];

const ServicesPage = () => {
  return (
    <Background 
      image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
      overlayOpacity={0.85}
    >
      <Layout>
        <PageHeader 
          title="Our Services" 
          subtitle="Comprehensive data science and analytics solutions for your business needs"
          backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
        />
        
        <div className="container mx-auto py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground p-2 rounded-lg">
                        {service.icon}
                      </div>
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  );
};

export default ServicesPage;
