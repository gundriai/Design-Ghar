import React from 'react';
import { MapPin, Clock } from 'lucide-react';

export const Location: React.FC = () => {
  return (
    <section id="location" className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-800 mb-4">Find Us</h2>
          <div className="w-20 h-1 bg-rose-500 mx-auto mb-4"></div>
          <p className="max-w-2xl mx-auto text-slate-600 mb-8">
            Come experience our Design Services at our conveniently located House.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-lg">
          {/* Google Maps iframe */}
          <div className="md:w-2/3 h-64 md:h-auto">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3521.348851388879!2d82.4870243!3d28.0443711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39979550b0310757%3A0xa70d0f20e2fc5ba4!2sDesign%20Ghar!5e0!3m2!1sen!2sin!4v1752328002795!5m2!1sen!2sin" 
              width="100%"
               height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Saundarya Beauty Parlor location"
            ></iframe>
          </div>
          
          {/* Contact information */}
          <div className="md:w-1/3 bg-white p-6 md:p-8 flex flex-col justify-center">
            <h3 className="font-playfair text-2xl font-bold text-slate-800 mb-4">Our Location</h3>
            
            <div className="flex items-start mb-6">
              <div className="mr-4 p-2 bg-pink-50 rounded-full shrink-0">
                <MapPin className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="text-slate-800 font-medium mb-1">Address</p>
                <p className="text-slate-600">
                  Dang CTP Center<br />
                  Ghorahi 15, Dang <br />
                  Nepal
                </p>
                <a 
                  href="https://www.google.com/maps/place/Design+Ghar/@28.044371,82.487024,16z/data=!4m6!3m5!1s0x39979550b0310757:0xa70d0f20e2fc5ba4!8m2!3d28.0443711!4d82.4870243!16s%2Fg%2F11kqtc3jlj?hl=en&entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-rose-600 hover:text-rose-700 font-medium mt-2 inline-block"
                >
                  Get Directions
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 p-2 bg-pink-50 rounded-full shrink-0">
                <Clock className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="text-slate-800 font-medium mb-1">Business Hours</p>
                <p className="text-slate-600">
                  Sunday to Friday: 10:00 AM - 07:00 PM<br />
                  Saturday : Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};