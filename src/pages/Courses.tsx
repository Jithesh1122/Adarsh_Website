import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Trash2, Plus, Eye, Clock, BookOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import CourseModal from '@/components/CourseModal';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  overview?: string;
  learningOutcomes?: string;
}

const Courses = () => {
  const { isAdmin } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      // Updated default courses based on the requirements
      const defaultCourses: Course[] = [
        // ITI COURSES
        {
          id: '1',
          title: 'Refrigeration and AC Engineering',
          description: 'Comprehensive training in refrigeration and air conditioning systems.',
          duration: '1 year',
          category: 'ITI COURSES'
        },
        {
          id: '2',
          title: 'Electrical Engineering',
          description: 'Fundamental and advanced electrical engineering concepts.',
          duration: '1 year',
          category: 'ITI COURSES'
        },
        {
          id: '3',
          title: 'Automobile Technician',
          description: 'Complete automobile maintenance and repair training.',
          duration: '1 year',
          category: 'ITI COURSES'
        },
        {
          id: '4',
          title: 'Computer Hardware',
          description: 'Hardware installation, maintenance, and troubleshooting.',
          duration: '1 year',
          category: 'ITI COURSES'
        },
        // COMPUTER COURSES
        {
          id: '5',
          title: 'PGDCA (Post Graduate Diploma in Computer Application)',
          description: 'Advanced computer applications for graduates.',
          duration: '1 year',
          category: 'COMPUTER COURSES'
        },
        {
          id: '6',
          title: 'DCTT (Diploma in Computer Teacher Training)',
          description: 'Training for computer education teachers.',
          duration: '6 months',
          category: 'COMPUTER COURSES'
        },
        {
          id: '7',
          title: 'PGDIT (Post Graduate Diploma in Information Technology)',
          description: 'Advanced IT concepts and applications.',
          duration: '1 year',
          category: 'COMPUTER COURSES'
        },
        {
          id: '8',
          title: 'DCA (Diploma in Computer Application)',
          description: 'Basic to intermediate computer applications.',
          duration: '6 months',
          category: 'COMPUTER COURSES'
        },
        {
          id: '9',
          title: 'DTP (Diploma in Desktop Publishing)',
          description: 'Professional desktop publishing and design.',
          duration: '3 months',
          category: 'COMPUTER COURSES'
        },
        {
          id: '10',
          title: 'DOA (Diploma in Office Automation)',
          description: 'Office productivity and automation tools.',
          duration: '3 months',
          category: 'COMPUTER COURSES'
        },
        {
          id: '11',
          title: 'Diploma in CAD',
          description: 'Computer-aided design and drafting.',
          duration: '6 months',
          category: 'COMPUTER COURSES'
        },
        // Other Courses
        {
          id: '12',
          title: 'PPTTC Course',
          description: 'Primary Pre-Teacher Training Course.',
          duration: '1 year',
          category: 'Other Courses'
        },
        {
          id: '13',
          title: 'DNTTC Course',
          description: 'Diploma in Nursery Teacher Training Course.',
          duration: '1 year',
          category: 'Other Courses'
        }
      ];
      setCourses(defaultCourses);
      localStorage.setItem('courses', JSON.stringify(defaultCourses));
    }
  }, []);

  const handleAddCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString()
    };
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    toast({
      title: 'Course Added',
      description: 'New course has been added successfully.',
    });
  };

  const handleEditCourse = (courseData: Omit<Course, 'id'>) => {
    if (editingCourse) {
      const updatedCourses = courses.map(course =>
        course.id === editingCourse.id
          ? { ...courseData, id: editingCourse.id }
          : course
      );
      setCourses(updatedCourses);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      toast({
        title: 'Course Updated',
        description: 'Course has been updated successfully.',
      });
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    const updatedCourses = courses.filter(course => course.id !== courseId);
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    toast({
      title: 'Course Deleted',
      description: 'Course has been deleted successfully.',
    });
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const groupedCourses = {
    'ITI COURSES': courses.filter(course => course.category === 'ITI COURSES'),
    'COMPUTER COURSES': courses.filter(course => course.category === 'COMPUTER COURSES'),
    'Other Courses': courses.filter(course => course.category === 'Other Courses')
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-secondary text-white relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-40 h-40 bg-cyan-300 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-300 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-teal-300 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-light mb-4 animate-fade-in">Our Courses</h1>
              <p className="text-lg md:text-xl text-cyan-100 animate-slide-up" style={{animationDelay: '0.3s'}}>
                Choose from our comprehensive range of technical courses designed to enhance your skills
              </p>
            </div>
            {isAdmin && (
              <div className="animate-scale-in" style={{animationDelay: '0.6s'}}>
                <Button 
                  onClick={openAddModal}
                  className="bg-white text-teal-600 hover:bg-cyan-50 hover:scale-105 transition-all duration-300 font-semibold px-6 py-3 shadow-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Course
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Courses Grid Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 bg-teal-400 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-cyan-400 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-blue-400 rounded-full blur-xl animate-float" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {Object.entries(groupedCourses).map(([categoryName, categoryCourses]) => (
            <div key={categoryName} className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12 gradient-text">{categoryName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryCourses.map((course, index) => (
                  <Card 
                    key={course.id} 
                    className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-scale-in"
                    style={{animationDelay: `${0.1 * index}s`}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <CardHeader className="relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">{course.title}</CardTitle>
                          <CardDescription className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">{course.description}</CardDescription>
                        </div>
                        {isAdmin && (
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditModal(course)}
                              className="hover:scale-110 transition-transform duration-200"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCourse(course.id)}
                              className="hover:scale-110 transition-transform duration-200 hover:bg-red-50 hover:border-red-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-slate-600">Duration:</span>
                          </div>
                          <span className="font-medium text-slate-900">{course.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-slate-600">Category:</span>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{course.category}</Badge>
                        </div>
                      </div>
                      
                      <Link to={`/courses/${course.id}`}>
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 hover:scale-105"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {courses.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-light text-slate-900 mb-4">No courses available yet</h3>
              <p className="text-slate-600 text-lg mb-8">Start building your course catalog by adding some courses.</p>
              {isAdmin && (
                <Button 
                  onClick={openAddModal}
                  className="gradient-primary hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-3 text-lg shadow-xl"
                >
                  Add Your First Course
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingCourse ? handleEditCourse : handleAddCourse}
        course={editingCourse}
      />
    </Layout>
  );
};

export default Courses;
