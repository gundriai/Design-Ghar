import { useState } from 'react';
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
	useState(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	return (
		<>
			<header
				className={cn(
					'fixed overflow-hidden top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12 lg:px-24',
					isScrolled ? 'py-2' : 'py-4'
				)}
				style={{ boxShadow: 'none', border: 'none', borderColor: 'transparent' }}
			>
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link to="/" className="flex items-center">
						<img src="/logo.png" alt="DesignGhar" className="h-12" />
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
							onClick={() => setIsOpen(!isOpen)}
							// className={cn(
							// 	'text-gray-800',
							// 	isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
							// )}
						>
							{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 space-y-4">
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className="block py-2 text-gray-800 hover:text-sky-600"
								onClick={() => setIsOpen(false)}
							>
								{item.label}
							</Link>
						))}
						<div className="pt-2 border-t border-gray-100">
							{user ? (
								<div className="flex flex-col space-y-2">
									<Link
										to="/admin"
										className="py-2"
										onClick={() => setIsOpen(false)}
									>
										<Button variant="outline" className="w-full">
											Admin Dashboard
										</Button>
									</Link>
									<Button
										onClick={() => {
											logout();
											setIsOpen(false);
										}}
										variant="ghost"
										className="w-full"
									>
										Logout
									</Button>
								</div>
							) : (
								<Link
									to="/login"
									className="py-2 block"
									onClick={() => setIsOpen(false)}
								>
									<Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">
										Login
									</Button>
								</Link>
							)}
						</div>
					</div>
				)}
			</header>
			<div className={isScrolled ? 'h-16' : 'h-20'} />
			{(isOpen || isScrolled) && (
				<div
					className="fixed left-0 top-0 w-full"
					style={{
						height: isScrolled ? '4rem' : '5rem',
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