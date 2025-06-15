
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Trash2, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import GalleryModal from '@/components/GalleryModal';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

const Gallery = () => {
  const { isAdmin } = useAuth();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const savedImages = localStorage.getItem('galleryImages');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    } else {
      // Default gallery images
      const defaultImages: GalleryImage[] = [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          title: 'Computer Lab',
          description: 'State-of-the-art computer laboratory with modern equipment'
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          title: 'Programming Class',
          description: 'Students learning programming concepts'
        },
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          title: 'Web Development Session',
          description: 'Hands-on web development training'
        },
        {
          id: '4',
          url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          title: 'Coding Workshop',
          description: 'Interactive coding workshop in progress'
        },
        {
          id: '5',
          url: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          title: 'Study Environment',
          description: 'Comfortable learning environment for students'
        },
        {
          id: '6',
          url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          title: 'Online Learning',
          description: 'Modern online learning facilities'
        }
      ];
      setImages(defaultImages);
      localStorage.setItem('galleryImages', JSON.stringify(defaultImages));
    }
  }, []);

  const handleAddImage = (imageData: Omit<GalleryImage, 'id'>) => {
    const newImage: GalleryImage = {
      ...imageData,
      id: Date.now().toString()
    };
    const updatedImages = [...images, newImage];
    setImages(updatedImages);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    toast({
      title: 'Image Added',
      description: 'New image has been added to the gallery.',
    });
  };

  const handleDeleteImage = (imageId: string) => {
    const updatedImages = images.filter(image => image.id !== imageId);
    setImages(updatedImages);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    toast({
      title: 'Image Deleted',
      description: 'Image has been removed from the gallery.',
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Institute Gallery</h1>
            <p className="text-xl text-gray-600">
              Explore our facilities, classrooms, and learning environment
            </p>
          </div>
          {isAdmin && (
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.description}</p>
                </div>
                {isAdmin && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(image.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images in the gallery yet.</p>
            {isAdmin && (
              <Button onClick={() => setIsModalOpen(true)} className="mt-4">
                Add Your First Image
              </Button>
            )}
          </div>
        )}

        {/* Image Preview Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl max-h-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <div className="text-white text-center mt-4">
                <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}

        <GalleryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddImage}
        />
      </div>
    </Layout>
  );
};

export default Gallery;
