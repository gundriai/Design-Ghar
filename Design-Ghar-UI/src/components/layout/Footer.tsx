import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-3">DesignGhar</h3>
            <p className="text-gray-400 mb-5 leading-relaxed">
              Premium printing services for all your needs. From custom T-shirts to ID cards and canvas prints.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors duration-200">
          <Facebook size={22} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-200">
          <Instagram size={22} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors duration-200">
          <Twitter size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
          <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
            Home
          </Link>
              </li>
              <li>
          <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-200">
            Products
          </Link>
              </li>
              <li>
          <Link to="/delivery" className="text-gray-400 hover:text-white transition-colors duration-200">
            Delivery
          </Link>
              </li>
              <li>
          <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
            About Us
          </Link>
              </li>
              <li>
          <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
            Contact
          </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-bold mb-3">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
          <Phone size={18} />
          <span>9857879166, 9810900028</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
          <Mail size={18} />
          <span>design.ghar0@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
          <MapPin size={18} className="mt-1 flex-shrink-0" />
          <span>Ghorahi 15, Dang</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
{/* Business Hours */}
<div>
  <h3 className="text-2xl font-bold mb-3">Business Hours</h3>
  <ul className="space-y-4 text-gray-400">
    <li className="flex flex-col">
      <span>Sunday - Friday</span>
      <span className="text-sm">10:00 AM - 7:00 PM</span>
    </li>
    <li className="flex flex-col">
      <span>Saturday</span>
      <span className="text-sm">Closed</span>
    </li>
  </ul>
</div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© 2025 DesignGhar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}