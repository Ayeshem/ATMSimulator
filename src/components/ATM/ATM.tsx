
import React, { useState } from 'react';
import Screen from './Screen';
import Keypad from './Keypad';
import Card from './Card';
import Cash from './Cash';
import Receipt from './Receipt';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Define ATM screen types for our state machine
type ScreenType = 'welcome' | 'pin' | 'menu' | 'balance' | 'withdraw' | 'receipt' | 'exit';

// Initial account state (would typically come from a backend)
const initialAccount = {
  pin: '1234',
  balance: 1000,
  accountNumber: '0123456789',
};

const ATM: React.FC = () => {
  // State management for ATM simulation
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [isCardInserted, setIsCardInserted] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [account, setAccount] = useState(initialAccount);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCashDispensing, setIsCashDispensing] = useState(false);
  const [lastTransaction, setLastTransaction] = useState({
    date: new Date(),
    type: '',
    amount: 0,
  });

  // Handler for inserting card
  const handleCardInsert = () => {
    setIsCardInserted(true);
    // Simulate card processing delay
    setTimeout(() => {
      setCurrentScreen('pin');
    }, 1000);
  };

  // Handler for PIN entry number clicks
  const handlePinNumberClick = (num: number) => {
    if (enteredPin.length < 4) {
      setEnteredPin(prev => prev + num.toString());
    }
  };

  // Handler for clearing PIN entry
  const handlePinClear = () => {
    setEnteredPin('');
  };

  // Handler for PIN submission
  const handlePinSubmit = () => {
    setIsProcessing(true);
    // Simulate PIN verification delay
    setTimeout(() => {
      setIsProcessing(false);
      if (enteredPin === account.pin) {
        setCurrentScreen('menu');
      } else {
        toast.error('Incorrect PIN. Please try again.');
        setEnteredPin('');
      }
    }, 1000);
  };

  // Handler for checking account balance
  const handleCheckBalance = () => {
    setCurrentScreen('balance');
  };

  // Handler for withdrawal amount number clicks
  const handleWithdrawalNumberClick = (num: number) => {
    // Limit withdrawal amount to reasonable digits
    if (withdrawalAmount.toString().length < 4) {
      setWithdrawalAmount(prev => parseInt(prev.toString() + num.toString()));
    }
  };

  // Handler for clearing withdrawal amount
  const handleWithdrawalClear = () => {
    setWithdrawalAmount(0);
  };

  // Handler for withdrawal submission
  const handleWithdrawalSubmit = () => {
    if (withdrawalAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (withdrawalAmount > account.balance) {
      toast.error('Insufficient funds');
      return;
    }

    // Only allow withdrawal in multiples of 20
    if (withdrawalAmount % 20 !== 0) {
      toast.error('Please enter an amount in multiples of $20');
      return;
    }

    setIsProcessing(true);
    // Simulate withdrawal processing delay
    setTimeout(() => {
      // Update account balance
      setAccount(prev => ({
        ...prev,
        balance: prev.balance - withdrawalAmount,
      }));

      // Set transaction details for receipt
      setLastTransaction({
        date: new Date(),
        type: 'WITHDRAWAL',
        amount: withdrawalAmount,
      });

      setIsProcessing(false);
      setIsCashDispensing(true);

      // Simulate cash dispensing delay
      setTimeout(() => {
        setCurrentScreen('receipt');
      }, 2000);
    }, 1000);
  };

  // Handler for returning to main menu
  const handleReturnToMenu = () => {
    setCurrentScreen('menu');
    setWithdrawalAmount(0);
  };

  // Handler for exiting the ATM
  const handleExit = () => {
    setCurrentScreen('exit');
    // Simulate card ejection delay
    setTimeout(() => {
      // Reset ATM state
      setCurrentScreen('welcome');
      setIsCardInserted(false);
      setEnteredPin('');
      setWithdrawalAmount(0);
      setIsCashDispensing(false);
      // Reset account state (in a real app, we'd fetch fresh data)
      setAccount(initialAccount);
    }, 3000);
  };

  // Render different screens based on currentScreen state
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-2xl relative">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 mb-8 text-center">React ATM Simulator</h1>
      
      <div className="bg-gray-900 p-8 rounded-xl shadow-inner border border-gray-700 w-full flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
        
        <div className="mb-8 flex justify-center relative h-32">
          {/* Show card if not inserted yet or being ejected */}
          {(!isCardInserted || currentScreen === 'exit') && (
            <div className={`transition-all duration-500 ${currentScreen === 'exit' ? 'animate-fade-out' : ''}`}>
              <Card isInserting={isCardInserted} />
            </div>
          )}
          
          {/* Cash dispensing container - positioned absolutely so it can overflow the main container */}
          {isCashDispensing && (
            <Cash amount={withdrawalAmount} isDispensing={isCashDispensing} />
          )}
        </div>
        
        <Screen>
          {/* Welcome Screen */}
          {currentScreen === 'welcome' && (
            <div className="flex flex-col items-center justify-center h-full animate-fade-in">
              <h2 className="text-2xl font-bold mb-8">Welcome to the ATM</h2>
              <p className="mb-6 text-center">Please insert your card to begin</p>
              <Button 
                onClick={handleCardInsert} 
                className="bg-atm-green hover:bg-green-700 text-white px-8 py-6"
              >
                Insert Card
              </Button>
            </div>
          )}
          
          {/* PIN Entry Screen */}
          {currentScreen === 'pin' && (
            <div className="flex flex-col items-center h-full animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Enter Your PIN</h2>
              
              <div className="bg-white rounded-md p-4 w-48 mb-6">
                <div className="flex justify-center gap-4">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-4 h-4 rounded-full ${
                        i < enteredPin.length ? 'bg-atm-blue' : 'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              
              {isProcessing ? (
                <p className="text-center">Processing...</p>
              ) : (
                <>
                  <Keypad 
                    onNumberClick={handlePinNumberClick} 
                    onClearClick={handlePinClear} 
                    onEnterClick={handlePinSubmit}
                  />
                  <p className="mt-4 text-xs text-white text-opacity-80">
                    Enter your 4-digit PIN and press Enter
                  </p>
                </>
              )}
            </div>
          )}
          
          {/* Main Menu Screen */}
          {currentScreen === 'menu' && (
            <div className="flex flex-col h-full animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-center">Main Menu</h2>
              <div className="flex flex-col gap-4 flex-grow justify-center">
                <Button 
                  onClick={handleCheckBalance} 
                  className="bg-white text-atm-blue hover:bg-gray-100"
                >
                  Check Balance
                </Button>
                <Button 
                  onClick={() => setCurrentScreen('withdraw')} 
                  className="bg-white text-atm-blue hover:bg-gray-100"
                >
                  Withdraw Cash
                </Button>
                <Button 
                  onClick={handleExit} 
                  className="bg-atm-red hover:bg-red-700 text-white"
                >
                  Exit
                </Button>
              </div>
            </div>
          )}
          
          {/* Balance Screen */}
          {currentScreen === 'balance' && (
            <div className="flex flex-col h-full animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-center">Account Balance</h2>
              
              <div className="bg-white rounded-md p-6 mb-6 text-atm-blue">
                <div className="text-lg font-semibold">Available Balance:</div>
                <div className="text-3xl font-bold my-4">${account.balance.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Account: **** {account.accountNumber.slice(-4)}</div>
              </div>
              
              <div className="mt-auto flex justify-between">
                <Button 
                  onClick={handleReturnToMenu} 
                  className="bg-white text-atm-blue hover:bg-gray-100"
                >
                  Back to Menu
                </Button>
                <Button 
                  onClick={handleExit} 
                  className="bg-atm-red hover:bg-red-700 text-white"
                >
                  Exit
                </Button>
              </div>
            </div>
          )}
          
          {/* Withdraw Screen */}
          {currentScreen === 'withdraw' && (
            <div className="flex flex-col h-full animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-center">Withdraw Cash</h2>
              
              <div className="bg-white rounded-md p-4 mb-4 text-atm-blue">
                <div className="text-sm">Amount to withdraw:</div>
                <div className="text-3xl font-bold">
                  ${withdrawalAmount || '0'}
                </div>
              </div>
              
              <p className="text-sm mb-4 text-white text-opacity-80">
                Enter amount in multiples of $20
              </p>
              
              {isProcessing ? (
                <div className="flex-grow flex items-center justify-center">
                  <p className="text-center">Processing withdrawal...</p>
                </div>
              ) : (
                <>
                  <Keypad 
                    onNumberClick={handleWithdrawalNumberClick} 
                    onClearClick={handleWithdrawalClear} 
                    onEnterClick={handleWithdrawalSubmit}
                  />
                  
                  <div className="mt-6 flex justify-between">
                    <Button 
                      onClick={handleReturnToMenu} 
                      className="bg-white text-atm-blue hover:bg-gray-100"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleWithdrawalSubmit} 
                      className="bg-atm-green hover:bg-green-700 text-white"
                    >
                      Withdraw
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Receipt Screen */}
          {currentScreen === 'receipt' && (
            <div className="flex flex-col h-full animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-center">Transaction Complete</h2>
              
              <Receipt 
                transactionDate={lastTransaction.date}
                accountNumber={account.accountNumber}
                transactionType={lastTransaction.type}
                amount={lastTransaction.amount}
                remainingBalance={account.balance}
              />
              
              <div className="mt-6 flex justify-between">
                <Button 
                  onClick={handleReturnToMenu} 
                  className="bg-white text-atm-blue hover:bg-gray-100"
                >
                  More Transactions
                </Button>
                <Button 
                  onClick={handleExit} 
                  className="bg-atm-red hover:bg-red-700 text-white"
                >
                  Exit
                </Button>
              </div>
            </div>
          )}
          
          {/* Exit Screen */}
          {currentScreen === 'exit' && (
            <div className="flex flex-col items-center justify-center h-full animate-fade-in">
              <h2 className="text-2xl font-bold mb-8">Thank You!</h2>
              <p className="text-center mb-4">Please take your card</p>
              <p className="text-center text-sm text-white text-opacity-80">
                The ATM will reset in a moment...
              </p>
            </div>
          )}
        </Screen>
        
        {/* Decorative ATM elements */}
        <div className="mt-8 flex items-center justify-center space-x-8">
          <div className="h-6 w-24 bg-gray-800 rounded-md border border-gray-700"></div>
          <div className="h-2 w-32 bg-gray-700 rounded-full"></div>
          <div className="h-6 w-24 bg-gray-800 rounded-md border border-gray-700"></div>
        </div>
      </div>
      
      {/* Card slot indicator */}
      <div className="mt-6 flex items-center justify-center space-x-2">
        <div className="h-1 w-10 bg-gray-600 rounded-full"></div>
        <div className="text-xs text-gray-400">Insert Card Here</div>
        <div className="h-1 w-10 bg-gray-600 rounded-full"></div>
      </div>
      
      <p className="mt-6 text-sm text-center text-blue-300/70">
        For testing purposes, use PIN: 1234
      </p>
    </div>
  );
};

export default ATM;
