import { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useToast } from '@/hooks/use-toast';
import OfferForm from './OfferForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import type { Offer } from '@/types';

export default function OfferTable() {
  const { offers, addOffer, updateOffer, deleteOffer } = useData();
  const { toast } = useToast();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showForm, setShowForm] = useState<'add' | 'edit' | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  // Add/Edit handlers
  const handleAddClick = () => {
    setSelectedOffer(null);
    setShowForm('add');
  };

  const handleEditClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowForm('edit');
  };

  const handleSave = (data: any) => {
    if (showForm === 'add') {
      addOffer(data);
      toast({ title: 'Success', description: 'Offer added successfully' });
    } else if (showForm === 'edit' && selectedOffer) {
      updateOffer({ id: selectedOffer.id, ...data });
      toast({ title: 'Success', description: 'Offer updated successfully' });
    }
    setShowForm(null);
    setSelectedOffer(null);
  };

  const handleCancel = () => {
    setShowForm(null);
    setSelectedOffer(null);
  };

  // Delete handlers
  const handleDeleteClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsDeleteOpen(true);
  };

  const handleDeleteOffer = () => {
    if (!selectedOffer) return;
    deleteOffer(selectedOffer.id);
    toast({ title: 'Success', description: 'Offer deleted successfully' });
    setIsDeleteOpen(false);
    setSelectedOffer(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getAppliesTo = (offer: Offer) => {
    if (offer.appliesTo === 'all') return 'All Products';
    if (offer.appliesTo === 'category') return `Category: ${offer.category}`;
    return 'Specific Products';
  };

  const formatDiscount = (offer: Offer) => {
    if (offer.discountType === 'percentage') {
      return `${offer.discountValue}%`;
    }
    return `Rs. ${offer.discountValue}`;
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb can be added here if needed */}
      {showForm && (
        <OfferForm
          mode={showForm}
          initialData={showForm === 'edit' ? selectedOffer : {}}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <div className="flex justify-end items-center">
        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add Offer
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Offer Name</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Applies To</TableHead>
              <TableHead>Date Range</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell className="font-medium">{offer.name}</TableCell>
                <TableCell>{formatDiscount(offer)}</TableCell>
                <TableCell>{getAppliesTo(offer)}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{formatDate(offer.startDate)}</div>
                    <div className="text-gray-500">to</div>
                    <div>{formatDate(offer.endDate)}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditClick(offer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteClick(offer)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {offers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No offers found. Add a new offer to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete the offer "{selectedOffer?.name}"? 
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteOffer}>
              Delete Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}