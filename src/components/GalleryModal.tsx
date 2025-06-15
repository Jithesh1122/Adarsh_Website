
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface GalleryImage {
  url: string;
  title: string;
  description: string;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (image: GalleryImage) => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.url && formData.title && formData.description) {
      onSubmit(formData);
      setFormData({ url: '', title: '', description: '' });
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
          <DialogTitle>Add New Image</DialogTitle>
          <DialogDescription>
            Add a new image to the institute gallery.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="url">Image URL</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => handleChange('url', e.target.value)}
              placeholder="Enter image URL"
              required
            />
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter image title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter image description"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Image
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
