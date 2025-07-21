import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  overview?: string;
  learningOutcomes?: string;
}

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      const docRef = doc(db, "courses", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCourse({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Course, "id">),
        });
      } else {
        setCourse(null);
      }
    };
    fetchCourse();
  }, [id]);

  const formatTextToList = (text: string) => {
    if (!text) return [];
    return text.split("\n").filter((line) => line.trim() !== "");
  };

  if (!course) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Course Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The course you're looking for doesn't exist.
            </p>
            <Link to="/courses">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link to="/courses">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl mb-4">{course.title}</CardTitle>
                <CardDescription className="text-lg">
                  {course.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold">Duration</p>
                  <p className="text-gray-600">{course.duration}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold">Category</p>
                  <Badge variant="outline">{course.category}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {course.overview ? (
                <div className="text-gray-600 whitespace-pre-line">
                  {course.overview}
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    This comprehensive course is designed to provide you with
                    practical skills and knowledge in{" "}
                    {course.category.toLowerCase()}. Our experienced instructors
                    will guide you through hands-on projects and real-world
                    applications.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>
                      Comprehensive curriculum covering all essential topics
                    </li>
                    <li>Hands-on practical sessions and projects</li>
                    <li>Industry-relevant skills and techniques</li>
                    <li>Expert guidance from experienced instructors</li>
                    <li>Certificate upon successful completion</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              {course.learningOutcomes ? (
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {formatTextToList(course.learningOutcomes).map(
                    (outcome, index) => (
                      <li key={index}>{outcome}</li>
                    )
                  )}
                </ul>
              ) : (
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Fundamental concepts and principles</li>
                  <li>Practical application of theoretical knowledge</li>
                  <li>Industry best practices and standards</li>
                  <li>Problem-solving techniques</li>
                  <li>Project-based learning approach</li>
                  <li>Career guidance and placement assistance</li>
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ready to Enroll?</CardTitle>
            <CardDescription>
              Contact us to learn more about this course and enrollment details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="flex-1">
                <Button className="w-full">Contact for Enrollment</Button>
              </Link>
              <Link to="/courses" className="flex-1">
                <Button variant="outline" className="w-full">
                  View Other Courses
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CourseDetails;
