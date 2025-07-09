import React from "react";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-primary text-white relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-4 animate-fade-in">
              Contact Us
            </h1>
            <p
              className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              Get in touch with us for admissions, course information, or any
              queries
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl animate-float"></div>
          <div
            className="absolute top-32 right-20 w-16 h-16 bg-teal-400 rounded-full blur-xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-400 rounded-full blur-xl animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">
                    Get In Touch
                  </CardTitle>
                  <CardDescription className="text-lg">
                    We're here to help you with all your educational needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                    <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Address</p>
                      <p className="text-slate-600">
                        {typeof window !== "undefined" &&
                          (localStorage.getItem("contactAddress") ||
                            "Panchami Plaza,Uppala,Kasaragod")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors duration-300">
                    <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Phone</p>
                      <p className="text-slate-600">
                        {typeof window !== "undefined" &&
                          (localStorage.getItem("contactPhone") ||
                            "+91 8289986734")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-cyan-50 hover:bg-cyan-100 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Email</p>
                      <p className="text-slate-600">
                        {typeof window !== "undefined" &&
                          (localStorage.getItem("contactEmail") ||
                            "adarshtechuppala@gmail.com")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        Office Hours
                      </p>
                      <p className="text-slate-600">
                        {typeof window !== "undefined" &&
                          (localStorage.getItem("contactHours") ||
                            "Monday - Saturday: 9:00 AM - 5:00 PM")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-scale-in"
                style={{ animationDelay: "0.2s" }}
              >
                <CardHeader>
                  <CardTitle className="text-xl gradient-text">
                    Why Choose Adarsh Technical Institute?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-600">
                    {[
                      "Experienced and qualified faculty",
                      "Industry-relevant curriculum",
                      "Hands-on practical training",
                      "Modern computer labs and equipment",
                      "Flexible timings for working professionals",
                      "Affordable course fees",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-3 hover:text-blue-600 transition-colors duration-300"
                      >
                        <div className="w-2 h-2 gradient-primary rounded-full"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Admission Process */}
            <div className="space-y-6">
              <Card
                className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-scale-in"
                style={{ animationDelay: "0.4s" }}
              >
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">
                    Admission Process
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Simple steps to join our institute
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Visit our institute or call us for course information",
                      "Submit the application form with required documents",
                      "Attend counseling session with our academic advisors",
                      "Complete the admission formalities and fee payment",
                      "Begin your journey towards technical excellence",
                    ].map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                      >
                        <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-slate-700 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-scale-in"
                style={{ animationDelay: "0.6s" }}
              >
                <CardHeader>
                  <CardTitle className="text-xl gradient-text">
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-slate-600">
                    {[
                      "Educational certificates (10th, 12th, or equivalent)",
                      "Identity proof (Aadhaar, Passport, etc.)",
                      "Address proof",
                      "Passport size photographs",
                      "Caste certificate (if applicable)",
                      "Income certificate (if applicable)",
                    ].map((doc, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 gradient-secondary rounded-full"></div>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
