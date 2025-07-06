import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OfferFormProps {
  mode: 'add' | 'edit';
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const productCategories = [
  { value: 'tshirt', label: 'T-Shirts' },
  { value: 'idcard', label: 'ID Cards' },
  { value: 'canvas', label: 'Canvas' },
  { value: 'lanyard', label: 'Lanyards & Keyrings' },
];

export default function OfferForm({ mode, initialData = {}, onSave, onCancel }: OfferFormProps) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    discountType: initialData.discountType || 'percentage',
    discountValue: initialData.discountValue || 0,
    appliesTo: initialData.appliesTo || 'all',
    category: initialData.category || 'tshirt',
    productIds: initialData.productIds || [],
    startDate: initialData.startDate || new Date().toISOString().split('T')[0],
    endDate: initialData.endDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'discountValue') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.discountValue) return;
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
                <label className="block text-sm font-semibold text-gray-900 mb-2">Offer Name *</label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Mother's Day Special"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Discount Type</label>
                  <Select 
                    value={formData.discountType} 
                    onValueChange={(value) => handleSelectChange('discountType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="flat">Flat Amount (Rs.)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Discount Value *</label>
                  <Input
                    id="discountValue"
                    name="discountValue"
                    type="number"
                    placeholder={formData.discountType === 'percentage' ? "e.g. 20" : "e.g. 100"}
                    value={formData.discountValue || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Applies To</label>
                <Select 
                  value={formData.appliesTo} 
                  onValueChange={(value) => handleSelectChange('appliesTo', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select application" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="category">Specific Category</SelectItem>
                    <SelectItem value="specific">Specific Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.appliesTo === 'category' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                  <Select 
                    value={formData.category || 'tshirt'} 
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            {/* Right Column - Date Fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Start Date</label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">End Date</label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons - bottom left */}
          <div className="flex gap-3 pt-8 justify-start">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              {mode === 'add' ? 'Add Offer' : 'Update Offer'}
            </Button>
            <Button type="button" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
