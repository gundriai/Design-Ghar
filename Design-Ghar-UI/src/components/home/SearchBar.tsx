import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Search query:', query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
      <form 
        onSubmit={handleSubmit}
        className="flex items-stretch bg-white shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-xl"
      >
        <Input
          type="text"
          placeholder="Search for T-shirts, ID Cards, Canvas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-6 px-6 text-base"
        />
        <Button 
          type="submit" 
          className="rounded-none bg-sky-500 hover:bg-sky-600 text-white px-6"
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </form>
    </div>
  );
}