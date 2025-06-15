
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
}

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (course: Omit<Course, 'id'>) => void;
  course?: Course | null;
}

const CourseModal: React.FC<CourseModalProps> = ({ isOpen, onClose, onSubmit, course }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    level: '',
    category: ''
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        duration: course.duration,
        level: course.level,
        category: course.category
      });
    } else {
      setFormData({
        title: '',
        description: '',
        duration: '',
        level: '',
        category: ''
      });
    }
  }, [course, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.duration && formData.level && formData.category) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{course ? 'Edit Course' : 'Add New Course'}</DialogTitle>
          <DialogDescription>
            {course ? 'Update the course information below.' : 'Fill in the details for the new course.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter course title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter course description"
              required
            />
          </div>

          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="e.g., 3 months"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              placeholder="e.g., Programming, Design"
              required
            />
          </div>

          <div>
            <Label htmlFor="level">Level</Label>
            <Select value={formData.level} onValueChange={(value) => handleChange('level', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {course ? 'Update Course' : 'Add Course'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseModal;
