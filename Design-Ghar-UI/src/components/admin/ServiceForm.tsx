import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import { Carousel, CarouselItem, CarouselPrevious, CarouselNext, CarouselContent } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Category } from '@/types';

interface ServiceFormProps {
  mode: 'add' | 'edit';
  initialData?: Partial<Category>;
  onSave: (data: Omit<Category, 'id'>) => void;
  onCancel: () => void;
}

interface ServiceImage {
  id: string;
  name: string;
  file?: File;
  url?: string;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ mode, initialData = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Category, 'id'>>({
    name: '',
    description: '',
    icon: '',
    ...initialData,
  });
  const [serviceImages, setServiceImages] = useState<ServiceImage[]>(
    initialData.icon ? [{ id: 'existing', name: 'Service Icon', url: initialData.icon }] : []
  );
  const dropRef = useRef<HTMLDivElement>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setFormData({
      name: initialData.name || '',
      description: initialData.description || '',
      icon: initialData.icon || '',
    });
    setServiceImages(
      initialData.icon ? [{ id: 'existing', name: 'Service Icon', url: initialData.icon }] : []
    );
  }, [initialData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Drag and drop/image upload handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    handleFiles(files);
  };
  const handleFiles = (files: File[]) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
    const validFiles = files.filter(file => allowedTypes.includes(file.type));
    if (validFiles.length === 0) return;
    // Allow multiple images for service
    const newImages = validFiles.map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: file.name,
      file,
      url: URL.createObjectURL(file),
    }));
    setServiceImages(prev => [...prev, ...newImages]);
    // Optionally, set the first image as the icon for backward compatibility
    setFormData(prev => ({ ...prev, icon: newImages[0]?.url || prev.icon }));
  };
  const handleRemoveImage = (idx: number) => {
    setServiceImages(prev => prev.filter((_, i) => i !== idx));
    // If the removed image was the first, update icon field
    setFormData(prev => ({ ...prev, icon: serviceImages[1]?.url || '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;
    onSave({
      ...formData,
      icon: serviceImages[0]?.url || '/images/services/default.svg',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Service Name *</label>
                <Input
                  placeholder="e.g. T-Shirt Print & Design"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description *</label>
                <Textarea
                  placeholder="Enter service description"
                  value={formData.description}
                  onChange={e => handleInputChange('description', e.target.value)}
                  required
                  className="w-full h-28 resize-none"
                />
              </div>
            </div>
            {/* Right Column - Image Upload and Preview */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Service Icon</label>
                {/* Upload Area */}
                <div
                  ref={dropRef}
                  className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 transition-colors duration-150 ${dragActive ? 'bg-blue-50 border-blue-400' : ''} cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('service-image-upload')?.click()}
                  tabIndex={0}
                  role="button"
                  aria-label="Upload service icon"
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      document.getElementById('service-image-upload')?.click();
                    }
                  }}
                >
                  <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-1">Drop your icon here, or click to select</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPEG allowed</p>
                  {serviceImages.length > 0 && (
                    <div className="mt-2 text-xs font-medium text-blue-700 bg-blue-100 inline-block px-3 py-1 rounded-full">
                      {serviceImages.length} file{serviceImages.length > 1 ? 's' : ''} selected
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="service-image-upload"
                    tabIndex={-1}
                  />
                </div>
                {/* Carousel Preview */}
                {serviceImages.length > 0 && (
                  <div className="mb-2">
                    <Carousel className="w-full h-40 bg-gray-100 rounded-lg relative">
                      <div className="relative h-40">
                        <CarouselContent className="h-40">
                          {serviceImages.map((image, idx) => (
                            <CarouselItem key={image.id} className="h-40">
                              <div className="p-1 h-full flex items-center justify-center relative">
                                <Card className="h-full w-full flex items-center justify-center">
                                  <CardContent className="flex items-center justify-center h-full p-2">
                                    <img
                                      src={image.url}
                                      alt={image.name}
                                      className="object-contain max-h-32 max-w-full rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                                <button
                                  type="button"
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-red-600 focus:outline-none"
                                  aria-label="Remove image"
                                  onClick={() => handleRemoveImage(idx)}
                                >
                                  <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                  </svg>
                                </button>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full border border-gray-300" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full border border-gray-300" />
                      </div>
                    </Carousel>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Action Buttons - bottom left */}
          <div className="flex gap-3 pt-8 justify-start">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              {mode === 'add' ? 'SAVE' : 'UPDATE'}
            </Button>
            <Button type="button" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50" onClick={onCancel}>
              CANCEL
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
