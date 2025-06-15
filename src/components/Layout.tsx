
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
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">Adarsh Technical Institute</h1>
                  <p className="text-xs text-slate-600">Excellence in Technical Education</p>
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActivePage(item.path)
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {isAdmin ? (
                <div className="flex items-center space-x-2">
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-300">
                      <User className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout} className="hover:scale-105 transition-transform duration-300">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-300">Admin Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden bg-slate-50/95 backdrop-blur-md border-t border-blue-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActivePage(item.path)
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
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
