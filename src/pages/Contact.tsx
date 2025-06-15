
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Create email content
    const name = `${formData.get('firstName')} ${formData.get('lastName')}`;
    const email = formData.get('email');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Create detailed email body
    const emailBody = `
Dear Admin,

You have received a new message through the contact form:

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}

Best regards,
Adarsh Technical Institute Contact Form
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:jitheshpshetty14@gmail.com?subject=Contact Form: ${encodeURIComponent(subject as string)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.open(mailtoLink, '_blank');
    
    toast({
      title: 'Email Client Opened!',
      description: 'Your default email client has been opened. Please send the email from there.',
    });
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-primary text-white relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Contact Us</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.3s'}}>
              Get in touch with us for admissions, course information, or any queries
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-teal-400 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-400 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">Get In Touch</CardTitle>
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
                      <p className="text-slate-600">123 Education Street, Tech City, State 560001</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors duration-300">
                    <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Phone</p>
                      <p className="text-slate-600">+91 9876543210</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-cyan-50 hover:bg-cyan-100 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Email</p>
                      <p className="text-slate-600">jitheshpshetty14@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Office Hours</p>
                      <p className="text-slate-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-scale-in" style={{animationDelay: '0.2s'}}>
                <CardHeader>
                  <CardTitle className="text-xl gradient-text">Why Choose Adarsh Technical Institute?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-600">
                    {[
                      'Experienced and qualified faculty',
                      'Industry-relevant curriculum',
                      'Hands-on practical training',
                      'Modern computer labs and equipment',
                      'Placement assistance',
                      'Flexible timings for working professionals',
                      'Affordable course fees'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-3 hover:text-blue-600 transition-colors duration-300">
                        <div className="w-2 h-2 gradient-primary rounded-full"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-scale-in" style={{animationDelay: '0.4s'}}>
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">Send us a Message</CardTitle>
                <CardDescription className="text-lg">
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-700 font-medium">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        placeholder="Enter your first name" 
                        required 
                        className="border-2 border-blue-100 focus:border-blue-500 transition-colors duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-700 font-medium">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        placeholder="Enter your last name" 
                        required 
                        className="border-2 border-blue-100 focus:border-blue-500 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      required 
                      className="border-2 border-blue-100 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700 font-medium">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      required 
                      className="border-2 border-blue-100 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-slate-700 font-medium">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="What is this regarding?" 
                      required 
                      className="border-2 border-blue-100 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700 font-medium">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      required
                      className="border-2 border-blue-100 focus:border-blue-500 transition-colors duration-300 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary hover:scale-105 transition-all duration-300 text-white font-semibold py-3 text-lg shadow-xl"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
