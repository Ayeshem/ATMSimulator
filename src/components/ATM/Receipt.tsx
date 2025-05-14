
import React from 'react';

interface ReceiptProps {
  transactionDate: Date;
  accountNumber: string;
  transactionType: string;
  amount: number;
  remainingBalance: number;
}

// The Receipt component shows transaction details after withdrawal
const Receipt: React.FC<ReceiptProps> = ({ 
  transactionDate, 
  accountNumber, 
  transactionType, 
  amount, 
  remainingBalance 
}) => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded-md w-full max-w-xs mx-auto text-gray-800 shadow-lg receipt-print">
      <div className="border-b-2 border-gray-300 pb-3 mb-4">
        <h3 className="text-center font-bold text-xl">ATM RECEIPT</h3>
        <p className="text-center text-xs text-gray-500">
          {transactionDate.toLocaleDateString()} {transactionDate.toLocaleTimeString()}
        </p>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Account:</span>
          <span className="font-mono">**** {accountNumber.slice(-4)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Transaction:</span>
          <span>{transactionType}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Amount:</span>
          <span className="font-semibold">${amount.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-300 pt-3 mt-3 flex justify-between">
          <span className="font-medium">Remaining Balance:</span>
          <span className="font-bold">${remainingBalance.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-6 text-center text-xs text-gray-500 border-t border-gray-200 pt-3">
        <p>Thank you for using our ATM</p>
        <p className="text-blue-500 font-medium">Have a nice day!</p>
        <div className="mt-2 text-[8px] font-mono">TXN: 789012345-AB</div>
      </div>
    </div>
  );
};

export default Receipt;
