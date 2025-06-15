
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Briefcase } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Quality Education',
      description: 'Comprehensive technical courses designed to meet industry standards'
    },
    {
      icon: Users,
      title: 'Expert Faculty',
      description: 'Learn from experienced professionals with real-world expertise'
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Industry-recognized certifications to boost your career prospects'
    },
    {
      icon: Briefcase,
      title: 'Job Placement',
      description: 'Placement assistance to help you start your technical career'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Adarsh Technical Institute
              </span>
            </h1>
            <p className="text-xl mb-8 text-slate-200 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
              Your gateway to excellence in technical education. We provide comprehensive 
              training in computer technology and technical skills to prepare you for a 
              successful career in the digital world.
            </p>
            <div className="space-x-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Link to="/courses">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Explore Courses
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-white border-2 border-white bg-transparent hover:bg-white hover:text-slate-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 animate-fade-in">
              About Adarsh Technical Institute
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
              Established with a vision to provide quality technical education, we have been 
              shaping careers and building futures for aspiring technical professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-fade-in group" style={{animationDelay: `${0.1 * index}s`}}>
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 animate-fade-in">
              Our Popular Courses
            </h2>
            <p className="text-xl text-slate-600 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Explore our comprehensive range of technical courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-fade-in group" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <CardTitle className="text-slate-900 group-hover:text-purple-600 transition-colors duration-300">Computer Fundamentals</CardTitle>
                <CardDescription className="text-slate-600">Basic computer operations and applications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Learn the fundamentals of computer technology and essential applications.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-fade-in group" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle className="text-slate-900 group-hover:text-purple-600 transition-colors duration-300">Programming Languages</CardTitle>
                <CardDescription className="text-slate-600">C, C++, Java, Python and more</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Master popular programming languages with hands-on projects.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-fade-in group" style={{animationDelay: '0.3s'}}>
              <CardHeader>
                <CardTitle className="text-slate-900 group-hover:text-purple-600 transition-colors duration-300">Web Development</CardTitle>
                <CardDescription className="text-slate-600">HTML, CSS, JavaScript, and frameworks</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Build modern websites and web applications from scratch.</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Link to="/courses">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            Ready to Start Your Technical Journey?
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            Join thousands of students who have transformed their careers with our 
            comprehensive technical education programs.
          </p>
          <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
