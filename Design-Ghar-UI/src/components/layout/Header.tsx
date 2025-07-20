import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const navItems = [
	{ label: 'Home', path: '/' },
	{ label: 'Products', path: '/products' },
	{ label: 'Delivery', path: '/delivery' },
	{ label: 'About', path: '/about' },
	{ label: 'Location', path: '/location' },
	{ label: 'Contact', path: '/contact' },
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const { user, logout } = useAuth();

	// Handle scroll event to change header style
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			<header
				className={cn(
					'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12 lg:px-24',
					isScrolled ? 'py-2' : 'py-4'
				)}
				style={{ boxShadow: 'none', border: 'none', borderColor: 'transparent' }}
			>
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link to="/" className="flex items-center">
						<img src="/logo.png" alt="DesignGhar" className="h-16" />
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={cn(
									'text-sm font-medium transition-colors hover:text-sky-600',
									isScrolled ? 'text-gray-800' : 'text-gray-800'
								)}
							>
								{item.label}
							</Link>
						))}
					</nav>

					{/* Mobile Menu Button */}
					<div className="lg:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => {
								console.log('Menu toggled:', !isOpen);
								setIsOpen(!isOpen);
							}}
							className="relative z-60"
						>
							{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-2 px-4 space-y-1 z-60">
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className="block py-1.5 px-2 text-sm text-gray-800 hover:text-sky-600 hover:bg-gray-50 rounded-md"
								onClick={() => setIsOpen(false)}
							>
								{item.label}
							</Link>
						))}
						<div className="pt-1 mt-1 border-t border-gray-100">
							{user ? (
								<div className="flex flex-col space-y-1.5">
									<Link
										to="/admin"
										className="block"
										onClick={() => setIsOpen(false)}
									>
										<Button variant="outline" className="w-full h-8 text-sm">
											Admin Dashboard
										</Button>
									</Link>
									<Button
										onClick={() => {
											logout();
											setIsOpen(false);
										}}
										variant="ghost"
										className="w-full h-8 text-sm"
									>
										Logout
									</Button>
								</div>
							) : (
								<Link
									to="/login"
									className="block"
									onClick={() => setIsOpen(false)}
								>
									<Button className="w-full h-8 text-sm bg-sky-500 hover:bg-sky-600 text-white">
										Login
									</Button>
								</Link>
							)}
						</div>
					</div>
				)}
			</header>
			<div className='h-20'/>
			{(isOpen || isScrolled) && (
				<div
					className="fixed left-0 top-0 w-full"
					style={{
						height: '5rem',
						zIndex: 40,
						backdropFilter: 'blur(8px)',
						WebkitBackdropFilter: 'blur(8px)',
						background: 'rgba(0,0,0,0.07)',
						pointerEvents: 'none',
					}}
				/>
			)}
		</>
	);
}