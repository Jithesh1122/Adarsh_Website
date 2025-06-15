import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Lock, BookOpen, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { isAdmin, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast({
        title: 'Login Successful',
        description: 'Welcome to the admin panel!',
      });
      setEmail('');
      setPassword('');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  if (!isAdmin) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-12">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">Admin Login</CardTitle>
              <CardDescription className="text-slate-600">
                Enter your credentials to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mt-2 border-2 border-slate-200 focus:border-blue-500 transition-colors duration-300"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="mt-2 border-2 border-slate-200 focus:border-blue-500 transition-colors duration-300"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const adminActions = [
    {
      title: 'Manage Courses',
      description: 'Add, edit, or remove courses from the catalog',
      icon: BookOpen,
      action: () => navigate('/courses'),
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Manage Gallery',
      description: 'Upload or remove images from the gallery',
      icon: Image,
      action: () => navigate('/gallery'),
      color: 'bg-green-100 text-green-600'
    }
  ];

  // Get statistics from localStorage
  const courses = JSON.parse(localStorage.getItem('courses') || '[]');
  const galleryImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-xl text-gray-600">
              Welcome back! Manage your institute's content and settings.
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{courses.length}</p>
                <p className="text-gray-600">Total Courses</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{galleryImages.length}</p>
                <p className="text-gray-600">Gallery Images</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">100%</p>
                <p className="text-gray-600">Uptime</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={action.action}>
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color} mb-4`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <CardTitle>{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Manage
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Recent Activity</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Last login: {new Date().toLocaleDateString()}</li>
                  <li>• Total courses: {courses.length}</li>
                  <li>• Total images: {galleryImages.length}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Admin Privileges</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Add/Edit/Delete Courses</li>
                  <li>• Manage Gallery Images</li>
                  <li>• Access Analytics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Admin;
