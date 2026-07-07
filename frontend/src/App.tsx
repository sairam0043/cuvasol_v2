import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { ThemeProvider } from './context/ThemeContext.js';
import { DefaultLayout } from './layouts/DefaultLayout.js';

// Import Pages
import { Home } from './pages/Home.js';
import { About } from './pages/About.js';
import { Programs } from './pages/Programs.js';
import { Experiential } from './pages/Experiential.js';
import { AIInterview } from './pages/AIInterview.js';
import { Talent } from './pages/Talent.js';
import { Career } from './pages/Career.js';
import { Blog } from './pages/Blog.js';
import { FAQ } from './pages/FAQ.js';
import { Contact } from './pages/Contact.js';
import { Login } from './pages/Login.js';
import { Register } from './pages/Register.js';
import { Privacy } from './pages/Privacy.js';
import { Terms } from './pages/Terms.js';
import { StudentDashboard } from './pages/StudentDashboard.js';
import { AdminDashboard } from './pages/AdminDashboard.js';
import { RefreshCw } from 'lucide-react';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRole?: 'student' | 'admin' }> = ({ 
  children, 
  allowedRole 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-zinc-950">
        <RefreshCw className="h-8 w-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // If student tries to access admin, redirect to student dashboard
    if (user.role === 'student') {
      return <Navigate to="/dashboard" replace />;
    }
    // If admin tries to access student dashboard, redirect to admin overview
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Informational Routes (wrapped in DefaultLayout) */}
            <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
            <Route path="/about" element={<DefaultLayout><About /></DefaultLayout>} />
            <Route path="/programs" element={<DefaultLayout><Programs /></DefaultLayout>} />
            <Route path="/experiential" element={<DefaultLayout><Experiential /></DefaultLayout>} />
            <Route path="/ai-interview" element={<DefaultLayout><AIInterview /></DefaultLayout>} />
            <Route path="/talent" element={<DefaultLayout><Talent /></DefaultLayout>} />
            <Route path="/career" element={<DefaultLayout><Career /></DefaultLayout>} />
            <Route path="/blog" element={<DefaultLayout><Blog /></DefaultLayout>} />
            <Route path="/faq" element={<DefaultLayout><FAQ /></DefaultLayout>} />
            <Route path="/contact" element={<DefaultLayout><Contact /></DefaultLayout>} />
            <Route path="/login" element={<DefaultLayout><Login /></DefaultLayout>} />
            <Route path="/register" element={<DefaultLayout><Register /></DefaultLayout>} />
            <Route path="/privacy" element={<DefaultLayout><Privacy /></DefaultLayout>} />
            <Route path="/terms" element={<DefaultLayout><Terms /></DefaultLayout>} />

            {/* Secured Student Dashboard Route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Secured Admin Control Panel Route */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Fallback Redirection */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};
export default App;
