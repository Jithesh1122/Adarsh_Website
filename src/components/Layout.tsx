import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAdmin, logout } = useAuth();

  const isActivePage = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white/90 backdrop-blur-xl shadow-2xl border-b-2 border-gradient-to-r from-blue-500 to-cyan-400 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-4 group">
                <div className="relative">
                  <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl animate-pulse-glow">
                    <span className="text-white font-bold text-2xl">A</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-bounce opacity-80"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-700 transition-all duration-500">
                    Adarsh Technical Institute
                  </h1>
                  <p className="text-sm text-slate-600 font-medium">Excellence in Technical Education</p>
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isActivePage(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:shadow-md'
                  }`}
                >
                  {item.label}
                  {isActivePage(item.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              {isAdmin ? (
                <div className="flex items-center space-x-3">
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-all duration-300 border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white shadow-lg">
                      <User className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout} className="hover:scale-105 transition-all duration-300 border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white shadow-lg">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="hover:scale-105 transition-all duration-300 border-2 border-gradient-to-r from-blue-500 to-cyan-500 text-blue-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white shadow-lg">
                    Admin Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-blue-200">
          <div className="px-4 pt-2 pb-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActivePage(item.path)
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <h3 className="text-lg font-semibold">Adarsh Technical Institute</h3>
              </div>
              <p className="text-slate-300">
                Providing quality technical education and training for a brighter future.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-slate-300 hover:text-cyan-300 transition-colors duration-300">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <p className="text-slate-300">Email: info@adarshtech.edu</p>
              <p className="text-slate-300">Phone: +91 9876543210</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-300">
            <p>&copy; 2024 Adarsh Technical Institute. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
