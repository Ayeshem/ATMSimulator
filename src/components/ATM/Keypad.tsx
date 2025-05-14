
import React from 'react';
import { Button } from '@/components/ui/button';

interface KeypadProps {
  onNumberClick: (num: number) => void;
  onClearClick: () => void;
  onEnterClick: () => void;
  showEnter?: boolean;
}

// The Keypad component provides the numeric input interface for our ATM
const Keypad: React.FC<KeypadProps> = ({ 
  onNumberClick, 
  onClearClick, 
  onEnterClick,
  showEnter = true
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-xs mx-auto mt-6">
      {/* Generate number buttons 1-9 */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Button 
          key={num} 
          onClick={() => onNumberClick(num)} 
          variant="outline"
          className="h-12 w-12 font-bold bg-white text-atm-blue border-2 border-atm-gray hover:bg-gray-100"
        >
          {num}
        </Button>
      ))}
      
      {/* Clear button */}
      <Button 
        onClick={onClearClick} 
        variant="destructive"
        className="h-12 w-12 font-bold"
      >
        C
      </Button>
      
      {/* Zero button */}
      <Button 
        onClick={() => onNumberClick(0)} 
        variant="outline"
        className="h-12 w-12 font-bold bg-white text-atm-blue border-2 border-atm-gray hover:bg-gray-100"
      >
        0
      </Button>
      
      {/* Enter button */}
      {showEnter && (
        <Button 
          onClick={onEnterClick} 
          variant="default"
          className="h-12 w-12 font-bold bg-atm-green text-white hover:bg-green-700"
        >
          E
        </Button>
      )}
    </div>
  );
};

export default Keypad;
