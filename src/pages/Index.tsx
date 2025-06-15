
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Adarsh Technical Institute
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Your gateway to excellence in technical education. We provide comprehensive 
              training in computer technology and technical skills to prepare you for a 
              successful career in the digital world.
            </p>
            <div className="space-x-4">
              <Link to="/courses">
                <Button size="lg" variant="secondary">
                  Explore Courses
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Adarsh Technical Institute
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Established with a vision to provide quality technical education, we have been 
              shaping careers and building futures for aspiring technical professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Popular Courses
            </h2>
            <p className="text-xl text-gray-600">
              Explore our comprehensive range of technical courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Computer Fundamentals</CardTitle>
                <CardDescription>Basic computer operations and applications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Learn the fundamentals of computer technology and essential applications.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Programming Languages</CardTitle>
                <CardDescription>C, C++, Java, Python and more</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Master popular programming languages with hands-on projects.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Web Development</CardTitle>
                <CardDescription>HTML, CSS, JavaScript, and frameworks</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Build modern websites and web applications from scratch.</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/courses">
              <Button size="lg">View All Courses</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Technical Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with our 
            comprehensive technical education programs.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
