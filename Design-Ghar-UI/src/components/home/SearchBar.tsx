import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Search query:', query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 mt-6 relative z-10">
      <form
  onSubmit={handleSubmit}
  className="flex w-full max-w-3xl mx-auto overflow-hidden rounded-lg border border-primary"
>
  <div className="relative flex-1">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
    <Input
      type="text"
      placeholder="Search for T-shirts, ID Cards, Canvas..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="h-full w-full pl-12 pr-4 py-3 text-base border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-white text-foreground placeholder-muted-foreground"
    />
  </div>

  <div
    onClick={handleSubmit}
    role="button"
    tabIndex={0}
    className="px-6 flex items-center justify-center bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 rounded-none"
  >
    Search
  </div>
</form>



    </div>
  );
}