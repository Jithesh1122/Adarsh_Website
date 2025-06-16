import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Users, Award, Briefcase } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Quality Education",
      description:
        "Comprehensive technical courses designed to meet industry standards",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description:
        "Learn from experienced professionals with real-world expertise",
    },
    {
      icon: Award,
      title: "Certifications",
      description:
        "Industry-recognized certifications to boost your career prospects",
    },
    {
      icon: Briefcase,
      title: "Job Ready Skills",
      description:
        "Placement skill development to help you start your technical career",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-primary text-white relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 w-full">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
              <span className="text-white">Welcome to</span>{" "}
              <span className="text-cyan-300">Adarsh Technical Institute</span>
            </h1>
            <p
              className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              Your gateway to excellence in technical education. We provide
              comprehensive training in computer technology and technical skills
              to prepare you for a successful career in the digital world.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in"
              style={{ animationDelay: "0.6s" }}
            >
              <Link to="/courses">
                <Button
                  size="lg"
                  className="gradient-secondary hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-4 text-lg shadow-xl"
                >
                  Explore Courses
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-2 border-white bg-white/10 hover:bg-white hover:text-blue-600 backdrop-blur-sm hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg shadow-xl"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 animate-fade-in">
              About Adarsh Technical Institute
            </h2>
            <p
              className="text-xl text-slate-600 max-w-3xl mx-auto animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Established with a vision to provide quality technical education,
              we have been shaping careers and building futures for aspiring
              technical professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 bg-white backdrop-blur-sm animate-scale-in group"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 animate-fade-in">
              Our Popular Courses
            </h2>
            <p
              className="text-xl text-slate-600 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Explore our comprehensive range of technical courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card
              className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 bg-white backdrop-blur-sm animate-scale-in group"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <CardTitle className="text-slate-900 group-hover:text-blue-600 transition-colors duration-300 text-2xl">
                  ITI COURSES
                </CardTitle>
                <CardDescription className="text-slate-600 text-base">
                  Government-approved technical training programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Industrial Training Institute courses providing hands-on
                  technical skills for various trades.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 bg-white backdrop-blur-sm animate-scale-in group"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader>
                <CardTitle className="text-slate-900 group-hover:text-blue-600 transition-colors duration-300 text-2xl">
                  COMPUTER COURSES
                </CardTitle>
                <CardDescription className="text-slate-600 text-base">
                  Specialized computer education and IT training
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Comprehensive computer and IT courses, from fundamentals to
                  advanced programming and software development.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 bg-white backdrop-blur-sm animate-scale-in group"
              style={{ animationDelay: "0.5s" }}
            >
              <CardHeader>
                <CardTitle className="text-slate-900 group-hover:text-blue-600 transition-colors duration-300 text-2xl">
                  NTTC COURSES
                </CardTitle>
                <CardDescription className="text-slate-600 text-base">
                  Diploma in Nursery Teacher Training Course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Designed for aspiring nursery and primary school teachers,
                  focusing on early childhood education.
                </p>
              </CardContent>
            </Card>
          </div>

          <div
            className="text-center animate-scale-in"
            style={{ animationDelay: "0.7s" }}
          >
            <Link to="/courses">
              <Button
                size="lg"
                className="gradient-primary hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-4 text-lg shadow-xl"
              >
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Ready to Start Your Technical Journey?
          </h2>
          <p
            className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            Join thousands of students who have transformed their careers with
            our comprehensive technical education programs.
          </p>
          <div className="animate-scale-in" style={{ animationDelay: "0.6s" }}>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg shadow-xl"
              >
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
