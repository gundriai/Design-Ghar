import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface BannerFormProps {
  mode: 'add' | 'edit';
  initialData?: Partial<{
    title: string;
    imageUrl: string;
    redirectUrl: string;
    startDate: string;
    endDate: string;
    priority: number;
  }>;
  onSave: (data: FormData) => void | Promise<void>;
  onCancel: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ mode, initialData = {}, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [redirectUrl, setRedirectUrl] = useState(initialData.redirectUrl || '');
  const [startDate, setStartDate] = useState(initialData.startDate || new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(initialData.endDate || '');
  const [priority, setPriority] = useState(initialData.priority || 1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initialData.imageUrl || '');
  const [loading, setLoading] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Fix: Only reset state when switching to edit mode (not on every render)
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTitle(initialData.title || '');
      setRedirectUrl(initialData.redirectUrl || '');
      setStartDate(initialData.startDate || new Date().toISOString().split('T')[0]);
      setEndDate(initialData.endDate || '');
      setPriority(initialData.priority || 1);
      setImagePreview(initialData.imageUrl || '');
      setImageFile(null);
    }
  }, [initialData, mode]);

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
    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/gif'];
    const validFile = files.find(file => allowedTypes.includes(file.type));
    if (!validFile) return;
    setImageFile(validFile);
    setImagePreview(URL.createObjectURL(validFile));
  };
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startDate || !priority || (!imageFile && !imagePreview)) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('startDate', startDate);
    if (endDate) formData.append('endDate', endDate);
    formData.append('sequence', String(priority));
    if (redirectUrl) formData.append('redirectUrl', redirectUrl);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    const result = onSave(formData);
    if (result instanceof Promise) {
      await result;
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      {/* Blur and spinner overlay when loading */}
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <span className="ml-4 text-blue-700 font-semibold text-lg">Saving...</span>
        </div>
      )}
      <div className={loading ? 'pointer-events-none filter blur-sm select-none' : ''}>
        <form onSubmit={handleSubmit} className={loading ? 'pointer-events-none blur-sm select-none' : ''}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Banner Title *</label>
                <Input
                  placeholder="e.g. Mother's Day Special - 50% OFF"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Redirect URL</label>
                <Input
                  placeholder="e.g. /offers/mothers-day"
                  value={redirectUrl}
                  onChange={e => setRedirectUrl(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Start Date *</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">End Date</label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Priority *</label>
                <Input
                  type="number"
                  min="1"
                  value={priority}
                  onChange={e => setPriority(Number(e.target.value))}
                  required
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers will be shown first (1 is highest priority)</p>
              </div>
            </div>
            {/* Right Column - Image Upload and Preview */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Banner Image *</label>
                {/* Upload Area */}
                <div
                  ref={dropRef}
                  className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 transition-colors duration-150 ${dragActive ? 'bg-blue-50 border-blue-400' : ''} cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('banner-image-upload')?.click()}
                  tabIndex={0}
                  role="button"
                  aria-label="Upload banner image"
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      document.getElementById('banner-image-upload')?.click();
                    }
                  }}
                >
                  <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-1">Drop your image here, or click to select</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPEG, GIF allowed (1200×400 recommended)</p>
                  {imagePreview && (
                    <div className="mt-2 text-xs font-medium text-blue-700 bg-blue-100 inline-block px-3 py-1 rounded-full">
                      1 file selected
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml, image/gif"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="banner-image-upload"
                    tabIndex={-1}
                  />
                </div>
                {/* Preview */}
                {imagePreview && (
                  <div className="mb-2">
                    <Card className="w-full h-40 bg-gray-100 rounded-lg relative flex items-center justify-center">
                      <CardContent className="flex items-center justify-center h-full p-2">
                        <img
                          src={imagePreview}
                          alt="Banner Preview"
                          className="object-contain max-h-36 max-w-full rounded-lg"
                        />
                      </CardContent>
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

export default BannerForm;
