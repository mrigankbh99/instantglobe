
import React, { useState, useEffect } from 'react';
import { ArrowDown, RefreshCw, CircleDollarSign, CircleCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Currency = {
  code: string;
  name: string;
  flag: string;
};

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
];

const fixedINR: Currency = { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' };

// Exchange rates with INR (simulated)
const exchangeRates: Record<string, number> = {
  USD: 83.12,
  EUR: 90.45,
  GBP: 105.67,
  AED: 22.63,
  CAD: 61.23,
  AUD: 55.89,
  JPY: 0.57,
  SGD: 62.78,
  INR: 1,
};

const CurrencyConverter: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [amount, setAmount] = useState<string>('1000');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Calculate conversion
  useEffect(() => {
    const calculateConversion = () => {
      if (amount && !isNaN(Number(amount))) {
        const rate = exchangeRates[fromCurrency];
        setConvertedAmount(Number(amount) * rate);
      }
    };

    calculateConversion();
  }, [amount, fromCurrency]);

  // Refresh rates
  const handleRefreshRates = () => {
    // In a real app, this would fetch fresh rates from an API
    setLastUpdated(new Date());
  };

  const getCurrencyFlag = (code: string): string => {
    if (code === 'INR') return fixedINR.flag;
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.flag : '';
  };

  return (
    <div className="w-full bg-gradient-to-br from-theme-dark/90 to-theme-dark/80 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl relative">
      {/* Zero Fees Badge */}
      <div className="absolute top-5 right-5">
        <Badge className="bg-theme-blue/20 hover:bg-theme-blue/30 text-white border-theme-blue/30 py-1 px-3 rounded-full flex items-center gap-1.5 text-xs font-medium">
          <CircleCheck className="w-3.5 h-3.5 text-green-400" />
          <span>Zero Fees</span>
        </Badge>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="space-y-8">
          {/* From Currency Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-lg text-gray-300 font-light">You Send</label>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <CircleDollarSign className="w-3.5 h-3.5" />
                <span>1 {fromCurrency} = {exchangeRates[fromCurrency].toFixed(2)} {fixedINR.code}</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-theme-dark/50 border border-white/10 rounded-xl text-2xl md:text-3xl font-light text-white py-6 px-4 focus-visible:ring-theme-blue/50 focus-visible:border-theme-blue/30"
                  placeholder="Enter amount"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-theme-dark/80 rounded-full flex items-center justify-center overflow-hidden border-2 border-theme-blue/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <span className="text-xl">{getCurrencyFlag(fromCurrency)}</span>
                </div>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="w-[130px] bg-theme-dark/80 border border-white/10 rounded-xl text-xl font-medium h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-theme-dark border border-white/10 rounded-xl">
                    {currencies.map((currency) => (
                      <SelectItem 
                        key={currency.code} 
                        value={currency.code}
                        className="text-base hover:bg-theme-blue/10 focus:bg-theme-blue/10 cursor-pointer"
                      >
                        <span>{currency.code}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Divider with Arrow */}
          <div className="flex justify-center my-2">
            <div className="bg-theme-blue/20 rounded-full p-3 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
              <ArrowDown className="text-theme-blue h-5 w-5" />
            </div>
          </div>

          {/* To Currency Section */}
          <div className="space-y-3">
            <label className="block text-lg text-gray-300 font-light">They Receive</label>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="bg-theme-dark/50 border border-white/10 rounded-xl py-6 px-4 h-[72px] flex items-center">
                  <span className="text-2xl md:text-3xl font-light text-green-400">
                    {convertedAmount.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-theme-dark/80 rounded-full flex items-center justify-center overflow-hidden border-2 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <span className="text-xl">{fixedINR.flag}</span>
                </div>
                <div className="w-[130px] bg-theme-dark/80 border border-white/10 rounded-xl text-xl font-medium h-12 flex items-center justify-center">
                  <span>{fixedINR.code}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Rate Footer */}
      <div className="px-6 md:px-8 py-4 bg-theme-dark/70 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRefreshRates}
          className="text-xs text-gray-400 hover:text-white hover:bg-theme-blue/20"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Updated {lastUpdated.toLocaleTimeString()}
        </Button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
