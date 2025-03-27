
import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Currency = {
  code: string;
  name: string;
  flag?: string;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  // Simulate fetching exchange rates
  const refreshRates = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-theme-dark border border-white/5 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-white/5">
        <h3 className="text-lg font-medium">Currency Converter</h3>
      </div>

      {/* Form */}
      <div className="p-5 space-y-5">
        {/* From */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">You send</label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-transparent border-white/10 text-lg"
              placeholder="Enter amount"
            />
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-[140px] bg-transparent border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-theme-dark border border-white/10">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="bg-theme-blue/20 rounded-full p-2">
            <ArrowDown className="text-theme-blue h-5 w-5" />
          </div>
        </div>

        {/* To (Fixed to INR) */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">They receive</label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={convertedAmount.toFixed(2)}
              readOnly
              className="flex-1 bg-transparent border-white/10 text-lg"
            />
            <div className="w-[140px] px-3 py-2 border border-white/10 rounded-md flex items-center">
              <span>{fixedINR.code}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Exchange Rate */}
      <div className="p-5 bg-theme-dark/50 border-t border-white/5 text-center text-sm text-gray-400">
        <div className="flex justify-center items-center gap-2">
          <span>1 {fromCurrency} = {exchangeRates[fromCurrency]?.toFixed(2)} {fixedINR.code}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
