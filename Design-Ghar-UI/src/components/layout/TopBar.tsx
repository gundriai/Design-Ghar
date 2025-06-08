import Header from '@/components/layout/Header';
import SearchBar from '@/components/home/SearchBar';
import { GradientBackground } from '@/components/layout/GradientBackground';

export default function TopBar() {
  return (
    <>
      {/* <GradientBackground /> */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
        <div className="border-b border-transparent" />
        <SearchBar />
      </div>
      {/* Spacer for fixed TopBar (adjust height as needed) */}
      <div className="h-[140px] w-full" />
    </>
  );
}
