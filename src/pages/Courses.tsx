
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Trash2, Plus, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import CourseModal from '@/components/CourseModal';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
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
      // Default courses based on the poster
      const defaultCourses: Course[] = [
        {
          id: '1',
          title: 'Computer Fundamentals',
          description: 'Learn basic computer operations, file management, and essential applications.',
          duration: '2 months',
          level: 'Beginner',
          category: 'Basic Computer'
        },
        {
          id: '2',
          title: 'MS Office Suite',
          description: 'Master Microsoft Word, Excel, PowerPoint, and Outlook for professional use.',
          duration: '1.5 months',
          level: 'Beginner',
          category: 'Office Applications'
        },
        {
          id: '3',
          title: 'Programming in C',
          description: 'Learn the fundamentals of programming with C language.',
          duration: '3 months',
          level: 'Intermediate',
          category: 'Programming'
        },
        {
          id: '4',
          title: 'Web Development (HTML/CSS/JS)',
          description: 'Build modern websites using HTML, CSS, and JavaScript.',
          duration: '4 months',
          level: 'Intermediate',
          category: 'Web Development'
        },
        {
          id: '5',
          title: 'Database Management (SQL)',
          description: 'Learn database design and management with SQL.',
          duration: '2.5 months',
          level: 'Intermediate',
          category: 'Database'
        },
        {
          id: '6',
          title: 'Graphic Design',
          description: 'Master Adobe Photoshop and design principles.',
          duration: '3 months',
          level: 'Beginner',
          category: 'Design'
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

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
            <p className="text-xl text-gray-600">
              Choose from our comprehensive range of technical courses designed to enhance your skills
            </p>
          </div>
          {isAdmin && (
            <Button onClick={openAddModal}>
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </div>
                  {isAdmin && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(course)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Category:</span>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Level:</span>
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                  </div>
                </div>
                <Link to={`/courses/${course.id}`}>
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No courses available at the moment.</p>
            {isAdmin && (
              <Button onClick={openAddModal} className="mt-4">
                Add Your First Course
              </Button>
            )}
          </div>
        )}

        <CourseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={editingCourse ? handleEditCourse : handleAddCourse}
          course={editingCourse}
        />
      </div>
    </Layout>
  );
};

export default Courses;
