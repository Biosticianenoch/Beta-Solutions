import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FAQPage from "@/pages/FAQPage";
import { AuthProvider } from "@/lib/auth-context";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ForbiddenPage from "./pages/ForbiddenPage";
import CoursesPage from "./pages/CoursesPage";
import { TeamsPage } from "./pages/TeamsPage";
import TeamPage from "./pages/TeamPage";
import ServicesPage from "./pages/ServicesPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import ProjectsPage from "./pages/ProjectsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { AssignmentsPage } from "./pages/AssignmentsPage";
import SearchPage from './pages/SearchPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PaymentPage } from "./pages/PaymentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
