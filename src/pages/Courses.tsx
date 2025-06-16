import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Trash2, Plus, Eye, Clock, BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import CourseModal from "@/components/CourseModal";

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
    // localStorage.clear(); // TEMPORARY: Clear local storage to force default courses to load
    const savedCourses = localStorage.getItem("courses");
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      // Default courses organized by category
      const defaultCourses: Course[] = [
        // ITI COURSES
        {
          id: "1",
          title: "REFRIGERATION AND AC ENGINEERING",
          description:
            "Comprehensive training in refrigeration and air conditioning systems installation, maintenance, and repair.",
          duration: "1 year",
          category: "ITI COURSES",
        },
        {
          id: "2",
          title: "ELECTRICAL ENGINEERING",
          description:
            "Complete electrical engineering course covering wiring, motor control, and electrical systems.",
          duration: "1 year",
          category: "ITI COURSES",
        },
        {
          id: "3",
          title: "AUTOMOBILE TECHNICIAN",
          description:
            "Hands-on training in automobile maintenance, repair, and diagnostics.",
          duration: "1 year",
          category: "ITI COURSES",
        },
        {
          id: "4",
          title: "COMPUTER HARDWARE",
          description:
            "Computer hardware installation, troubleshooting, and maintenance training.",
          duration: "1 year",
          category: "ITI COURSES",
        },
        // COMPUTER COURSES
        {
          id: "5",
          title: "PGDCA (POST GRADUATE DIPLOMA IN COMPUTER APPLICATION)",
          description:
            "Advanced computer applications course for graduates seeking specialization in IT.",
          duration: "1 year",
          category: "COMPUTER COURSES",
        },
        {
          id: "6",
          title: "DCTT (DIPLOMA IN COMPUTER TEACHER TRAINING)",
          description:
            "Specialized training for aspiring computer teachers and educators.",
          duration: "6 months",
          category: "COMPUTER COURSES",
        },
        {
          id: "7",
          title: "PGDIT (POST GRADUATE DIPLOMA IN INFORMATION TECHNOLOGY)",
          description:
            "Advanced information technology concepts and practical applications.",
          duration: "1 year",
          category: "COMPUTER COURSES",
        },
        {
          id: "8",
          title: "DCA (DIPLOMA IN COMPUTER APPLICATION)",
          description:
            "Fundamental computer applications and office productivity tools.",
          duration: "6 months",
          category: "COMPUTER COURSES",
        },
        {
          id: "9",
          title: "DTP (DIPLOMA IN DESKTOP PUBLISHING)",
          description:
            "Professional desktop publishing and graphic design training.",
          duration: "3 months",
          category: "COMPUTER COURSES",
        },
        {
          id: "10",
          title: "DOA (DIPLOMA IN OFFICE AUTOMATION)",
          description:
            "Office automation tools and business productivity software training.",
          duration: "3 months",
          category: "COMPUTER COURSES",
        },
        {
          id: "11",
          title: "DIPLOMA IN CAD",
          description:
            "Computer-aided design and drafting using professional CAD software.",
          duration: "6 months",
          category: "COMPUTER COURSES",
        },
        // Other Courses
        {
          id: "12",
          title: "PPTTC COURSE",
          description:
            "Primary Pre-Teacher Training Course for early childhood education.",
          duration: "1 year",
          category: "NTTC COURSES",
        },
        {
          id: "13",
          title: "DNTTC COURSE",
          description:
            "Diploma in Nursery Teacher Training Course for nursery education. This course focuses on foundational teaching skills for early childhood education.",
          duration: "1 year",
          category: "NTTC COURSES",
        },
      ];
      setCourses(defaultCourses);
      localStorage.setItem("courses", JSON.stringify(defaultCourses));
    }
  }, []);

  const handleAddCourse = (courseData: Omit<Course, "id">) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
    };
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    toast({
      title: "Course Added",
      description: `New course has been added to ${courseData.category}.`,
    });
  };

  const handleEditCourse = (courseData: Omit<Course, "id">) => {
    if (editingCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === editingCourse.id
          ? { ...courseData, id: editingCourse.id }
          : course
      );
      setCourses(updatedCourses);
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
      toast({
        title: "Course Updated",
        description: "Course has been updated successfully.",
      });
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    toast({
      title: "Course Deleted",
      description: "Course has been deleted successfully.",
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

  // Group courses by category
  const itiCourses = courses.filter(
    (course) => course.category === "ITI COURSES"
  );
  const computerCourses = courses.filter(
    (course) => course.category === "COMPUTER COURSES"
  );
  const otherCourses = courses.filter(
    (course) => course.category === "NTTC COURSES"
  );

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <CardHeader className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">
              {course.title}
            </CardTitle>
            <CardDescription className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
              {course.description}
            </CardDescription>
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
            <span className="font-medium text-slate-900">
              {course.duration}
            </span>
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
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-secondary text-white relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-40 h-40 bg-cyan-300 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 left-20 w-32 h-32 bg-blue-300 rounded-full blur-2xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-teal-300 rounded-full blur-xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-light mb-4 animate-fade-in">
                Our Courses
              </h1>
              <p
                className="text-lg md:text-xl text-cyan-100 animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                Choose from our comprehensive range of technical courses
                designed to enhance your skills
              </p>
            </div>
            {isAdmin && (
              <div
                className="animate-scale-in"
                style={{ animationDelay: "0.6s" }}
              >
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

      {/* Courses Tabs Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 bg-teal-400 rounded-full blur-xl animate-float"></div>
          <div
            className="absolute bottom-40 left-20 w-24 h-24 bg-cyan-400 rounded-full blur-xl animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-20 h-20 bg-blue-400 rounded-full blur-xl animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Tabs defaultValue="iti" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-3 bg-slate-200 p-1 rounded-lg shadow-inner">
              <TabsTrigger
                value="iti"
                className="text-sm md:text-lg py-3 rounded-md transition-all duration-300 
                           data-[state=active]:bg-blue-600 data-[state=active]:text-white 
                           data-[state=active]:shadow-lg data-[state=active]:scale-105 
                           hover:bg-blue-100 hover:text-blue-800"
              >
                ITI COURSES
              </TabsTrigger>
              <TabsTrigger
                value="computer"
                className="text-sm md:text-lg py-3 rounded-md transition-all duration-300 
                           data-[state=active]:bg-blue-600 data-[state=active]:text-white 
                           data-[state=active]:shadow-lg data-[state=active]:scale-105 
                           hover:bg-blue-100 hover:text-blue-800"
              >
                COMPUTER COURSES
              </TabsTrigger>
              <TabsTrigger
                value="other"
                className="text-sm md:text-lg py-3 rounded-md transition-all duration-300 
                           data-[state=active]:bg-blue-600 data-[state=active]:text-white 
                           data-[state=active]:shadow-lg data-[state=active]:scale-105 
                           hover:bg-blue-100 hover:text-blue-800"
              >
                NTTC COURSES
              </TabsTrigger>
            </TabsList>

            <TabsContent value="iti" className="space-y-8 pt-6">
              {itiCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {itiCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600 mb-4">
                    No ITI courses available yet.
                  </p>
                  {isAdmin && (
                    <Button onClick={openAddModal}>Add ITI Course</Button>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="computer" className="space-y-8 pt-6">
              {computerCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {computerCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600 mb-4">
                    No computer courses available yet.
                  </p>
                  {isAdmin && (
                    <Button onClick={openAddModal}>Add Computer Course</Button>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="other" className="space-y-8 pt-6">
              {otherCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600 mb-4">
                    No NTTC courses available yet.
                  </p>
                  {isAdmin && (
                    <Button onClick={openAddModal}>Add NTTC Course</Button>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
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
