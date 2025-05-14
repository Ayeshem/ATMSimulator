
import React from 'react';

interface CashProps {
  amount: number;
  isDispensing: boolean;
}

// The Cash component represents the dispensed money in our ATM simulation
const Cash: React.FC<CashProps> = ({ amount, isDispensing }) => {
  // Generate multiple bills for visual effect
  const billCount = Math.min(5, Math.ceil(amount / 100));
  const bills = Array.from({ length: billCount }, (_, i) => i);

  return (
    <div className={`absolute z-50 left-1/2 transform -translate-x-1/2 ${isDispensing ? 'visible' : 'invisible'}`}
         style={{ bottom: '-60px' }}>
      {/* Cash dispenser slot */}
      <div className="relative h-6 w-48 bg-gray-300 border-2 border-gray-400 rounded-md mb-1 z-10">
        <div className="absolute inset-0.5 bg-gray-600 rounded-sm"></div>
      </div>
      
      {/* Stack of bills */}
      {bills.map((bill, index) => (
        <div 
          key={bill}
          className={`
            absolute bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-600 p-4 rounded-sm w-40 text-center
            shadow-lg transform transition-all duration-700
            ${isDispensing ? 'animate-bill-slide' : ''}
          `} 
          style={{
            top: `-${index * 3 - 10}px`, 
            left: `${index * 2}px`,
            animationDelay: `${index * 0.15}s`,
            zIndex: 100 - index
          }}
        >
          <div className="text-green-800 font-bold text-lg flex items-center justify-center gap-1">
            <span className="text-sm">$</span>{amount / billCount}
          </div>
          <div className="absolute top-1 left-1 right-1 bottom-1 border border-dashed border-green-600 rounded-sm opacity-70"></div>
          {/* Bill details */}
          <div className="absolute bottom-1 right-2 text-xs text-green-800 opacity-80">$20</div>
          <div className="absolute top-1 left-2 text-xs text-green-800 opacity-80">$20</div>
          {/* Serial number */}
          <div className="absolute bottom-1 left-2 text-[8px] text-green-800 opacity-60">A123456789B</div>
        </div>
      ))}
    </div>
  );
};

export default Cash;
