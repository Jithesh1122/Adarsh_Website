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
import { BookOpen, Users, Award, Briefcase, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const Index = () => {
  const handleNavigation = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [aboutUsText, setAboutUsText] = useState("");

  useEffect(() => {
    const fetchAboutUs = async () => {
      const aboutDoc = await getDoc(doc(db, "siteContent", "about"));
      if (aboutDoc.exists()) {
        setAboutUsText(aboutDoc.data().text || "");
      } else {
        setAboutUsText(
          `Adarsh Technical Institute – Uppala and Ideasi Technical Institute – Kasaragod are two well-established and reputed educational institutions located in Kasaragod District. These institutions operate under the control of the Director of Technical Education, Government of Kerala. For over 25 years, our institutions have been providing high-quality technical and computer training to students across the region. We are proud to have received overwhelming support and positive response from the community since our inception. Our institutions have played a vital role in the educational and social development of the region by empowering students with practical skills and job-ready knowledge in technical and computer fields. To date, more than 1,00,000 students have successfully completed various courses from our institutions. In today's technology-driven world, computer and technical education is indispensable, and we are committed to offering courses that ensure bright career prospects and employment opportunities for our students. We also offer a wide range of job-oriented courses, including: Computer Courses,Teacher Training Programs,All Types`
        );
      }
    };
    fetchAboutUs();
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const carouselImages = [
    "/images/carousel_image_1.jpg",
    "/images/carousel_image_2.jpg",
  ];

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
          <div className="text-center">
            {/* Updated Hero Heading */}
            <div className="mb-8 animate-fade-in">
              <div className="text-2xl md:text-6xl text-white font-bold text-center mb-2">
                WELCOME TO
              </div>
              <div
                className="text-5xl md:text-7xl font-bold text-center"
                style={{ color: "#800000" }}
              >
                ADARSH TECHNICAL INSTITUTE
              </div>
            </div>

            <div className="w-full max-w-4xl mx-auto mb-8">
              <Carousel
                className="w-full relative group"
                opts={{
                  loop: true,
                }}
                plugins={[Autoplay({ delay: 3000 })]}
                setApi={setApi}
              >
                <CarouselContent>
                  {carouselImages.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className="flex justify-center items-center"
                    >
                      <img
                        src={image}
                        alt={`Carousel Image ${index + 1}`}
                        className="rounded-lg shadow-lg max-h-96 object-contain"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {Array.from({ length: count }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index + 1 === current
                          ? "bg-white scale-125"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </Carousel>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in"
              style={{ animationDelay: "0.6s" }}
            >
              <Link to="/courses" onClick={handleNavigation}>
                <Button
                  size="lg"
                  className="gradient-secondary hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-4 text-lg shadow-xl"
                >
                  Explore Courses
                </Button>
              </Link>
              <Link to="/contact" onClick={handleNavigation}>
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
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-16">
            <div className="w-full bg-white/90 rounded-2xl shadow-2xl p-8 border border-slate-200 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 flex items-center justify-center">
                About Adarsh Technical Institute
                <ArrowRight className="ml-4 w-10 h-10 text-blue-600" />
              </h2>
              <p
                className="text-lg md:text-xl text-slate-700 animate-slide-up text-justify"
                style={{ animationDelay: "0.2s" }}
              >
                {aboutUsText}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 bg-white backdrop-blur-sm animate-scale-in group shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                      index === 0
                        ? "bg-gradient-to-br from-purple-500 to-pink-500"
                        : index === 1
                        ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                        : index === 2
                        ? "bg-gradient-to-br from-green-500 to-emerald-500"
                        : "bg-gradient-to-br from-orange-500 to-red-500"
                    }`}
                  >
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
              className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 backdrop-blur-sm animate-scale-in group shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-gradient-to-br from-blue-50 to-indigo-50"
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
              className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 backdrop-blur-sm animate-scale-in group shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-gradient-to-br from-purple-50 to-pink-50"
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
              className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 backdrop-blur-sm animate-scale-in group shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-gradient-to-br from-emerald-50 to-teal-50"
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
            <Link to="/courses" onClick={handleNavigation}>
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
            Ready to Start Your Journey With Us?
          </h2>
          <p
            className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            Join hundreds of students who have transformed their careers with
            our comprehensive technical education programs.
          </p>
          <div className="animate-scale-in" style={{ animationDelay: "0.6s" }}>
            <Link to="/contact" onClick={handleNavigation}>
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
