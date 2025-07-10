import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import {
  Carousel,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselContent,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { categoryData } from '@/context/CategoryContext';
import { Product } from '@/types';

interface ProductImage {
  id: string;
  name: string;
  file?: File;
  url?: string;
}

interface ProductFormProps {
  mode: 'add' | 'edit';
  initialData: Partial<Product>;
  onSave: (formData: FormData) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ mode, initialData, onSave, onCancel }) => {
  const { categories } = categoryData();
  const [tags, setTags] = useState<string[]>(initialData.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [productImages, setProductImages] = useState<ProductImage[]>(
    initialData.mediaURLs?.map((url, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: `Image-${idx + 1}`,
      url,
    })) || []
  );
  const dropRef = useRef<HTMLDivElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      productName: initialData.name || '',
      description: initialData.description || '',
      categoryId: initialData.categoryId || '',
      categoryName: initialData.categoryName || '',
      sku: initialData.sku || '',
      regularPrice: initialData.basePrice?.toString() || '',
      salePrice: initialData.finalPrice?.toString() || '',
      tags: initialData.tags || [],
    },
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedCategory = categories.find((cat) => cat.id === selectedId);
    setValue('categoryId', selectedId);
    setValue('categoryName', selectedCategory?.name || '');
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim() && tags.length < 5) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const allowedTypes = ['image/png', 'image/jpeg'];
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));
    if (validFiles.length === 0) return;
    const newImages = validFiles.map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: file.name,
      file,
      url: URL.createObjectURL(file),
    }));
    setProductImages((prev) => [...prev, ...newImages]);
  };

  const onSubmit = () => {
    const formValues = getValues();
    const formDataObj = new FormData();

    if (mode === 'add') {
      // Append all values for add mode
      formDataObj.append('name', formValues.productName);
      formDataObj.append('description', formValues.description);
      formDataObj.append('sku', formValues.sku);
      formDataObj.append('categoryName', formValues.categoryName);
      formDataObj.append('categoryId', formValues.categoryId);
      formDataObj.append('basePrice', formValues.regularPrice);
      formDataObj.append('finalPrice', formValues.salePrice);
    } else if (mode === 'edit') {
      // Append only changed values for edit mode
      if (initialData.name !== formValues.productName) {
        formDataObj.append('name', formValues.productName);
      }
      if (initialData.description !== formValues.description) {
        formDataObj.append('description', formValues.description);
      }
      if (initialData.sku !== formValues.sku) {
        formDataObj.append('sku', formValues.sku);
      }
      if (initialData.categoryName !== formValues.categoryName) {
        formDataObj.append('categoryName', formValues.categoryName);
      }
      if (initialData.categoryId !== formValues.categoryId) {
        formDataObj.append('categoryId', formValues.categoryId);
      }
      if (initialData.basePrice?.toString() !== formValues.regularPrice) {
        formDataObj.append('basePrice', formValues.regularPrice);
      }
      if (initialData.finalPrice?.toString() !== formValues.salePrice) {
        formDataObj.append('finalPrice', formValues.salePrice);
      }
    }

    tags.forEach((tag) => formDataObj.append('tags', tag));
    productImages.forEach((image) => {
      if (image.file) {
        formDataObj.append('images', image.file);
      }
    });

    onSave(formDataObj);
    toast({
      title: mode === 'add' ? 'Product created successfully' : 'Product updated successfully',
      description: mode === 'add' ? 'Your product has been added.' : 'Your product has been updated.',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">{mode === 'add' ? 'Add Product' : 'Edit Product'}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form Fields */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Product Name
              </label>
              <Controller
                name="productName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Type name here"
                    className="w-full"
                  />
                )}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Type Description here"
                    className="w-full h-32 resize-none"
                  />
                )}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Category
              </label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleCategoryChange(e);
                    }}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                )}
              />
            </div>


            {/* SKU and Stock Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  SKU
                </label>
                <Controller
                  name="sku"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="w-full"
                    />
                  )}
                />
              </div>
            </div>

            {/* Regular Price and Sale Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Regular Price
                </label>
                <Controller
                  name="regularPrice"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="w-full"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Sale Price
                </label>
                <Controller
                  name="salePrice"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="w-full"
                    />
                  )}
                />
              </div>
            </div>

            {/* Tag */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tag
              </label>
              <div className="border border-gray-300 rounded-md p-1 flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-sm dark:bg-blue-900 dark:text-blue-300"
                  >
                    {tag}
                    <button
                      type="button"
                      className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-xs hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                      onClick={() => handleRemoveTag(index)}
                      aria-label={`Remove tag ${tag}`}
                    >
                      <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Remove badge</span>
                    </button>
                  </span>
                ))}
                {tags.length < 5 && (
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleTagInputKeyDown}
                    className="border-none outline-none bg-transparent text-sm px-2 h-7 align-middle"
                    placeholder={tags.length === 0 ? 'Type and press Enter' : ''}
                    maxLength={20}
                    style={{ minWidth: 60 }}
                  />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Max 5 tags. Press Enter or comma to add.</p>
            </div>
          </div>

          {/* Right Column - Image Upload and Gallery */}
          <div className="space-y-6">
            {/* Main Image Upload Area */}
            {productImages.length > 0 && (
              <Carousel className="w-full h-64 bg-gray-100 rounded-lg relative">
                <div className="relative h-64">
                  <CarouselContent className="h-64">
                    {productImages.map((image, idx) => (
                      <CarouselItem key={image.id} className="h-64">
                        <div className="p-1 h-full flex items-center justify-center relative">
                          <Card className="h-full w-full flex items-center justify-center">
                            <CardContent className="flex items-center justify-center h-full p-2">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="object-contain max-h-56 max-w-full rounded-lg"
                              />
                            </CardContent>
                          </Card>
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-red-600 focus:outline-none"
                            aria-label="Remove image"
                            onClick={() => setProductImages(productImages.filter((_, i) => i !== idx))}
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
            )}

            {/* Product Gallery */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Gallery</h3>
              
              {/* Upload Area */}
              <div
                ref={dropRef}
                className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 transition-colors duration-150 ${dragActive ? 'bg-blue-50 border-blue-400' : ''} cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('image-upload')?.click()}
                tabIndex={0}
                role="button"
                aria-label="Upload product images"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    document.getElementById('image-upload')?.click();
                  }
                }}
              >
                <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-1">Drop your images here, or click to select</p>
                <p className="text-xs text-gray-500">Jpeg, png are allowed</p>
                {productImages.length > 0 && (
                  <div className="mt-2 text-xs font-medium text-blue-700 bg-blue-100 inline-block px-3 py-1 rounded-full">
                    {productImages.length} file{productImages.length > 1 ? 's' : ''} selected
                  </div>
                )}
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  tabIndex={-1}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons - bottom left */}
        <div className="flex gap-3 pt-8 justify-start">
          <Button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {mode === 'add' ? 'Add Product' : 'Save Changes'}
          </Button>
          <Button 
            type="button"
            variant="outline" 
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;