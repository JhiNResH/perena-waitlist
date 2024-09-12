import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-2 sm:py-3 md:py-4 border-t border-brand-purple">
      <div className="w-full mx-auto sm:px-[var(--40px)] max-w-[var(--max-width)] flex flex-col lg:flex-row justify-between items-center">
        <div className="text-sm text-brand-purple order-3 lg:order-none mb-4 lg:mb-0 lg:w-1/3 lg:text-left">
          <p style={{ fontFamily: '"Plusjakartasans", serif' }}>© 2024 Perena.org</p>
        </div>
        <div className="hidden lg:flex space-x-4 text-sm text-brand-purple order-2 lg:order-none mb-4 lg:mb-0 lg:w-1/3 lg:justify-center">
          <a href="/privacy-policy" className="hover:underline"
            style={{ fontFamily: '"Plusjakartasans", serif' }}
          >Privacy Policy</a>
          <a href="/terms-of-use" className="hover:underline"
            style={{ fontFamily: '"Plusjakartasans", serif' }}
          >Terms of Use</a>
        </div>
        <div className="flex space-x-4 order-1 lg:order-none mb-4 lg:mb-0 lg:w-1/3 lg:justify-end">
          <a 
            href="https://x.com/Perena__" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brand-purple hover:text-[#d2bb94] transition-colors active:scale-95 active:opacity-80 duration-150 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-300 group-hover:rotate-12">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a 
            href="http://t.me/perena_community"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brand-purple hover:text-[#d2bb94] transition-colors active:scale-95 active:opacity-80 duration-150 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;