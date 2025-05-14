
import React from 'react';

interface CardProps {
  isInserting: boolean;
}

// The Card component represents the bank card for our ATM simulation
const Card: React.FC<CardProps> = ({ isInserting }) => {
  return (
    <div 
      className={`
        relative w-64 h-40 bg-gradient-to-br from-blue-700 to-purple-700 rounded-xl shadow-lg overflow-hidden
        transition-transform duration-1000
        ${isInserting ? 'animate-card-insert' : 'translate-y-0'}
      `}
    >
      {/* Holographic effect */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent"></div>
      
      {/* Chip */}
      <div className="absolute top-6 left-6 h-8 w-10 bg-yellow-500 rounded-md overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-yellow-400"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 to-transparent"></div>
      </div>
      
      {/* Bank logo */}
      <div className="absolute top-6 right-6 text-white font-bold tracking-wider text-lg">
        <span className="opacity-90">BANK</span>
        <span className="text-blue-200">24</span>
      </div>
      
      {/* Card number */}
      <div className="absolute bottom-14 left-6 right-6">
        <div className="text-white text-opacity-90 font-mono tracking-wider text-sm">
          **** **** **** 1234
        </div>
      </div>
      
      {/* Card holder name */}
      <div className="absolute bottom-6 left-6">
        <div className="text-white font-medium tracking-wider">JOHN DOE</div>
      </div>
      
      {/* Expiry date */}
      <div className="absolute bottom-6 right-6 flex flex-col">
        <div className="text-white text-opacity-70 text-[10px]">VALID THRU</div>
        <div className="text-white font-medium text-sm">12/25</div>
      </div>
    </div>
  );
};

export default Card;
