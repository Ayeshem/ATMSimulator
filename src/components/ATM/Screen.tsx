
import React from 'react';

interface ScreenProps {
  children: React.ReactNode;
}

// The Screen component serves as the display area of our ATM
const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="bg-blue-900 p-4 rounded-xl shadow-lg relative">
        {/* Brown/gray middle frame */}
        <div className="bg-blue-700 p-3 rounded-lg">
          {/* Silver/gray inner frame */}
          <div className="bg-neutral-400 p-4 rounded-md relative overflow-hidden">
            {/* Reflection/glare effect */}
            <div className="absolute top-0 right-0 w-full h-32 bg-white opacity-10 skew-x-12 transform -translate-x-20"></div>
            
            {/* Actual screen content area with blue background */}
            <div className="relative bg-sky-500 p-6 rounded-md shadow-inner border-2 border-gray-600 text-white min-h-[260px] flex flex-col items-center justify-center overflow-hidden animate-subtle-pulse">
              {/* Screen light beams */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 h-full w-24 bg-white opacity-10 skew-x-12 transform -translate-x-32 animate-float"></div>
                <div className="absolute top-0 h-full w-16 bg-white opacity-10 skew-x-12 transform translate-x-40 animate-float-delayed"></div>
              </div>
              
              {/* Screen content */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                {children}
              </div>
              
              {/* Screen scan lines effect */}
              <div className="absolute inset-0 bg-scan-lines opacity-5 pointer-events-none"></div>
              
              {/* Bottom screen border detail */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black opacity-20"></div>
              
              {/* Extra animated elements for the screen */}
              <div className="absolute top-2 left-2 h-1 w-1 bg-green-400 rounded-full opacity-70 animate-blink"></div>
              <div className="absolute top-2 left-5 h-1 w-1 bg-red-400 rounded-full opacity-70 animate-blink-delayed"></div>
            </div>
            
            {/* Card slot below screen */}
            <div className="mt-4 flex justify-center">
              <div className="h-2 w-32 bg-gray-600 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen;

