
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  Calendar,
  LogOut,
  BarChart,
  Home,
  FileText,
  Users,
  List
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu button */}
      <button 
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-navy-950 text-white md:hidden"
      >
        <List size={24} />
      </button>

      {/* Sidebar - hidden on mobile by default */}
      <aside 
        className={`bg-navy-950 text-white w-64 flex-shrink-0 flex flex-col ${
          isMobileOpen ? 'fixed inset-y-0 left-0 z-40 md:relative' : 'hidden md:flex'
        }`}
      >
        {/* Logo and title */}
        <div className="p-4 border-b border-navy-800">
          <h1 className="text-2xl font-bold">AMS</h1>
          <p className="text-sm opacity-70">Attendance Management System</p>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors hover:bg-blue-700 ${
                    isActive ? 'bg-blue-700' : ''
                  }`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                <Home size={20} className="mr-3" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/attendance"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors hover:bg-blue-700 ${
                    isActive ? 'bg-blue-700' : ''
                  }`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                <Calendar size={20} className="mr-3" />
                Attendance Sheet
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/late-records"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors hover:bg-blue-700 ${
                    isActive ? 'bg-blue-700' : ''
                  }`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                <FileText size={20} className="mr-3" />
                Late Records
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leave-requests"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors hover:bg-blue-700 ${
                    isActive ? 'bg-blue-700' : ''
                  }`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                <FileText size={20} className="mr-3" />
                Leave Requests
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/students"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors hover:bg-blue-700 ${
                    isActive ? 'bg-blue-700' : ''
                  }`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                <Users size={20} className="mr-3" />
                Students
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/statistics"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors hover:bg-blue-700 ${
                    isActive ? 'bg-blue-700' : ''
                  }`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                <BarChart size={20} className="mr-3" />
                Statistics
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-navy-800">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center text-white hover:bg-red-700"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        {children}
      </main>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default SidebarLayout;
