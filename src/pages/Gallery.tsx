
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
      {/* Hero Section - Reduced height */}
      <section className="gradient-secondary text-white relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-light mb-4 animate-fade-in">Institute Gallery</h1>
              <p className="text-lg md:text-xl text-cyan-100 animate-slide-up" style={{animationDelay: '0.3s'}}>
                Explore our facilities, classrooms, and learning environment
              </p>
            </div>
            {isAdmin && (
              <div className="animate-scale-in" style={{animationDelay: '0.6s'}}>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-teal-600 hover:bg-cyan-50 hover:scale-105 transition-all duration-300 font-semibold px-6 py-3 shadow-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Image
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 bg-teal-400 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-cyan-400 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-blue-400 rounded-full blur-xl animate-float" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-4 animate-scale-in"
                style={{animationDelay: `${0.1 * index}s`}}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-light mb-2">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                  {isAdmin && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
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
            <div className="text-center py-20 animate-fade-in">
              <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-4">No images in the gallery yet</h3>
              <p className="text-slate-600 text-lg mb-8">Start building your gallery by adding some images.</p>
              {isAdmin && (
                <Button 
                  onClick={() => setIsModalOpen(true)} 
                  className="gradient-primary hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-3 text-lg shadow-xl"
                >
                  Add Your First Image
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full animate-scale-in">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-white text-center mt-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-2xl font-light mb-2">{selectedImage.title}</h3>
              <p className="text-cyan-200 text-lg">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddImage}
      />
    </Layout>
  );
};

export default Gallery;
