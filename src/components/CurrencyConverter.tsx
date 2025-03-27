
import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  const getCurrencyFlag = (code: string): string => {
    if (code === 'INR') return fixedINR.flag;
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.flag : '';
  };

  return (
    <div className="w-full bg-theme-dark/80 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
      {/* You send section */}
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-lg text-gray-300">You send</label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent border-0 border-b border-white/20 rounded-none text-4xl font-light text-green-400 pl-0 pb-2 focus-visible:ring-0 focus-visible:border-white/30"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-10 h-10 bg-theme-dark/50 rounded-full flex items-center justify-center overflow-hidden border border-white/20">
                <span className="text-xl">{getCurrencyFlag(fromCurrency)}</span>
              </div>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-[120px] bg-transparent border-0 text-xl font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-theme-dark border border-white/10">
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span className="text-base">{currency.flag}</span>
                        <span>{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-center my-3">
          <div className="bg-theme-blue/20 rounded-full p-2">
            <ArrowDown className="text-theme-blue h-5 w-5" />
          </div>
        </div>

        {/* They receive section */}
        <div className="space-y-2">
          <label className="block text-lg text-gray-300">They receive</label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                type="text"
                value={convertedAmount.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                readOnly
                className="bg-transparent border-0 border-b border-white/20 rounded-none text-4xl font-light text-green-400 pl-0 pb-2 focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-10 h-10 bg-theme-dark/50 rounded-full flex items-center justify-center overflow-hidden border border-white/20">
                <span className="text-xl">{fixedINR.flag}</span>
              </div>
              <span className="text-xl font-medium">{fixedINR.code}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Rate */}
      <div className="px-6 py-4 bg-theme-dark/40 border-t border-white/10">
        <div className="text-sm text-gray-400">
          <div className="flex justify-between items-center">
            <span>Live market rate: 1 {fromCurrency} = {exchangeRates[fromCurrency].toFixed(2)} {fixedINR.code}</span>
            <span className="text-xs opacity-70">Updated {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
