
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Feedback {
  id: string;
  name: string;
  email: string;
  course: string;
  rating: number;
  message: string;
  date: string;
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const savedFeedbacks = localStorage.getItem('feedbacks');
    if (savedFeedbacks) {
      setFeedbacks(JSON.parse(savedFeedbacks));
    } else {
      // Default testimonials
      const defaultFeedbacks: Feedback[] = [
        {
          id: '1',
          name: 'Rajesh Kumar',
          email: 'rajesh@example.com',
          course: 'Web Development',
          rating: 5,
          message: 'Excellent teaching methods and very supportive faculty. The practical approach helped me understand concepts better.',
          date: '2024-01-15'
        },
        {
          id: '2',
          name: 'Priya Sharma',
          email: 'priya@example.com',
          course: 'Programming in C',
          rating: 4,
          message: 'Great institute with modern facilities. The course content is well-structured and industry-relevant.',
          date: '2024-01-10'
        },
        {
          id: '3',
          name: 'Amit Patel',
          email: 'amit@example.com',
          course: 'MS Office Suite',
          rating: 5,
          message: 'Very helpful staff and excellent training. I got placed in a good company after completing the course.',
          date: '2024-01-05'
        }
      ];
      setFeedbacks(defaultFeedbacks);
      localStorage.setItem('feedbacks', JSON.stringify(defaultFeedbacks));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      course: formData.get('course') as string,
      rating,
      message: formData.get('message') as string,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedFeedbacks = [newFeedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));

    toast({
      title: 'Feedback Submitted!',
      description: 'Thank you for your valuable feedback.',
    });

    (e.target as HTMLFormElement).reset();
    setRating(0);
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onStarClick && onStarClick(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Feedback</h1>
          <p className="text-xl text-gray-600">
            Share your experience and help us improve our services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Feedback Form */}
          <Card>
            <CardHeader>
              <CardTitle>Share Your Feedback</CardTitle>
              <CardDescription>
                Your feedback helps us improve our courses and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Enter your full name" required />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                </div>

                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select name="course" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the course you attended" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Fundamentals">Computer Fundamentals</SelectItem>
                      <SelectItem value="MS Office Suite">MS Office Suite</SelectItem>
                      <SelectItem value="Programming in C">Programming in C</SelectItem>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Database Management">Database Management</SelectItem>
                      <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Rating</Label>
                  <div className="mt-2">
                    {renderStars(rating, true, setRating)}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Your Feedback</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Share your experience with us..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Feedbacks */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Our Students Say</h2>
            <div className="space-y-6">
              {feedbacks.slice(0, 5).map((feedback) => (
                <Card key={feedback.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{feedback.name}</h3>
                        <p className="text-sm text-gray-600">{feedback.course}</p>
                      </div>
                      <div className="text-right">
                        {renderStars(feedback.rating)}
                        <p className="text-xs text-gray-500 mt-1">{feedback.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{feedback.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {feedbacks.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-gray-500">No feedback yet. Be the first to share your experience!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{feedbacks.length}</p>
                  <p className="text-gray-600">Total Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    {feedbacks.length > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : '0'}
                  </p>
                  <p className="text-gray-600">Average Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    {feedbacks.filter(f => f.rating === 5).length}
                  </p>
                  <p className="text-gray-600">5-Star Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">98%</p>
                  <p className="text-gray-600">Satisfaction Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
