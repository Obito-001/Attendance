
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AttendanceSheet from "./pages/AttendanceSheet";
import LateRecords from "./pages/LateRecords";
import LeaveRequests from "./pages/LeaveRequests";
import Students from "./pages/Students";
import Statistics from "./pages/Statistics";
import Unauthorized from "./pages/Unauthorized";
import StudentAttendance from "./pages/StudentAttendance";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <AuthProvider>
          <Routes>
            {/* Auth routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/attendance" element={
              <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                <AttendanceSheet />
              </ProtectedRoute>
            } />
            <Route path="/my-attendance" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentAttendance />
              </ProtectedRoute>
            } />
            <Route path="/late-records" element={
              <ProtectedRoute>
                <LateRecords />
              </ProtectedRoute>
            } />
            <Route path="/leave-requests" element={
              <ProtectedRoute>
                <LeaveRequests />
              </ProtectedRoute>
            } />
            <Route path="/students" element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            } />
            <Route path="/statistics" element={
              <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                <Statistics />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
