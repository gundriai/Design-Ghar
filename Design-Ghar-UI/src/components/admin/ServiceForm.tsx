import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Category } from '@/types';

interface ServiceFormProps {
  mode: 'add' | 'edit';
  initialData?: Partial<Category>;
  onSave: (data: FormData) => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ mode, initialData = {}, onSave, onCancel }) => {
  const [name, setName] = useState(initialData.name || '');
  const [sku, setSku] = useState(initialData.sku || '');
  const [sequence, setSequence] = useState(initialData.sequence || 1);
  const [tags, setTags] = useState<string[]>(initialData.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [isActive, setIsActive] = useState(initialData.isActive !== undefined ? initialData.isActive : true);
  const [description, setDescription] = useState(initialData.description || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData.imageUrl || '');
  const dropRef = useRef<HTMLDivElement>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setName(initialData.name || '');
    setSku(initialData.sku || '');
    setSequence(initialData.sequence || 1);
    setTags(initialData.tags || []);
    setIsActive(initialData.isActive !== undefined ? initialData.isActive : true);
    setDescription(initialData.description || '');
    setImagePreview(initialData.imageUrl || '');
    setImageFile(null);
  }, [initialData]);

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
    const validFile = files.find(file => allowedTypes.includes(file.type));
    if (!validFile) return;
    setImageFile(validFile);
    setImagePreview(URL.createObjectURL(validFile));
  };
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku || !description || !sequence) return;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', sku);
    formData.append('description', description);
    formData.append('sequence', String(sequence));
    formData.append('isActive', String(isActive));
    tags.forEach(tag => formData.append('tags', tag));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    onSave(formData);
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
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">SKU *</label>
                <Input
                  placeholder="e.g. tshirt-design"
                  value={sku}
                  onChange={e => setSku(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Sequence *</label>
                <Input
                  type="number"
                  min={1}
                  value={sequence}
                  onChange={e => setSequence(Number(e.target.value))}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <span key={tag} className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      {tag}
                      <button type="button" className="ml-1 text-blue-500 hover:text-red-500" onClick={() => handleRemoveTag(tag)} aria-label={`Remove tag ${tag}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <Input
                  placeholder="Add tag and press Enter"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="block text-sm font-semibold text-gray-900">Active</label>
                <button
                  type="button"
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                  onClick={() => setIsActive(!isActive)}
                  aria-pressed={isActive}
                >
                  <span
                    className={`h-4 w-4 bg-white rounded-full shadow transform transition-transform duration-200 ${isActive ? 'translate-x-6' : ''}`}
                  />
                </button>
                <span className="text-xs text-gray-600">{isActive ? 'On' : 'Off'}</span>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description *</label>
                <Textarea
                  placeholder="Enter service description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
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
                  {imagePreview && (
                    <div className="mt-2 text-xs font-medium text-blue-700 bg-blue-100 inline-block px-3 py-1 rounded-full">
                      1 file selected
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
                {/* Preview */}
                {imagePreview && (
                  <div className="mb-2">
                    <Card className="h-40 w-full flex items-center justify-center relative bg-gray-100 rounded-lg">
                      <CardContent className="flex items-center justify-center h-full p-2">
                        <img
                          src={imagePreview}
                          alt="Service Icon Preview"
                          className="object-contain max-h-32 max-w-full rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-red-600 focus:outline-none"
                          aria-label="Remove image"
                          onClick={handleRemoveImage}
                        >
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </button>
                      </CardContent>
                    </Card>
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
