
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { RefreshCw, CircleDollarSign, CircleCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Currency data with flags and symbols
const currencies = [
  { code: 'USD', country: 'United States', flag: '🇺🇸', symbol: '$' },
  { code: 'GBP', country: 'United Kingdom', flag: '🇬🇧', symbol: '£' },
  { code: 'AED', country: 'United Arab Emirates', flag: '🇦🇪', symbol: 'د.إ' },
];

// Fixed target currency
const targetCurrency = { code: 'INR', country: 'India', flag: '🇮🇳', symbol: '₹' };

const HomeConverterWidget = () => {
  const [sourceCurrency, setSourceCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Find currency object by code
  const findCurrencyByCode = (code: string) => {
    return currencies.find(currency => currency.code === code) || currencies[0];
  };

  // Function to fetch exchange rates
  const fetchExchangeRate = async (from: string, to: string) => {
    setIsLoading(true);
    try {
      // In a real app, you would use a proper API here
      // This is a simulation of exchange rate data
      const simulatedRates = {
        'USD-INR': 83.12,
        'GBP-INR': 105.78,
        'AED-INR': 22.64
      };
      
      const key = `${from}-${to}`;
      const fetchedRate = simulatedRates[key as keyof typeof simulatedRates] || 0;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setRate(fetchedRate);
      setConvertedAmount(amount * fetchedRate);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch and whenever currency changes
  useEffect(() => {
    fetchExchangeRate(sourceCurrency.code, targetCurrency.code);
  }, [sourceCurrency.code]);

  // Update converted amount when amount or rate changes
  useEffect(() => {
    setConvertedAmount(amount * rate);
  }, [amount, rate]);

  // Handle source currency change
  const handleSourceCurrencyChange = (value: string) => {
    const newCurrency = findCurrencyByCode(value);
    setSourceCurrency(newCurrency);
  };

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  // Handle refresh button click
  const handleRefresh = () => {
    fetchExchangeRate(sourceCurrency.code, targetCurrency.code);
  };

  return (
    <Card className="shadow-lg border-indigo-500/20 bg-gradient-to-br from-indigo-950/70 to-theme-dark/90 backdrop-blur-sm overflow-hidden w-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <CircleDollarSign className="mr-2 text-indigo-400 h-5 w-5" />
          <h3 className="font-semibold text-lg">Quick Convert</h3>
        </div>
        <Badge variant="outline" className="bg-indigo-600/10 text-indigo-400 border-indigo-500/20 px-2.5 py-0.5 text-xs font-medium flex items-center gap-1">
          <CircleCheck className="h-3 w-3" />
          <span>Zero Fees</span>
        </Badge>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* You Send Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">You Send</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="bg-theme-dark/50 border-white/10 focus-visible:ring-indigo-500 focus-visible:border-indigo-500/20 h-11 appearance-none"
                placeholder="Enter amount"
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              />
              <Select
                value={sourceCurrency.code}
                onValueChange={handleSourceCurrencyChange}
              >
                <SelectTrigger className="w-28 bg-theme-dark/50 border-white/10 focus:ring-indigo-500 focus:border-indigo-500/20 h-11">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent className="bg-theme-dark border border-white/10">
                  {currencies.map((currency) => (
                    <SelectItem 
                      key={currency.code} 
                      value={currency.code}
                      className="focus:bg-indigo-600/10 focus:text-white"
                    >
                      <div className="flex items-center">
                        <span className="mr-2 text-base">{currency.flag}</span>
                        <span>{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Exchange Rate Display */}
          <div className="flex justify-between items-center py-1.5 px-3 rounded-md bg-indigo-600/5 border border-indigo-500/10">
            <div className="text-sm text-gray-300">
              <span>1 {sourceCurrency.code} = {rate.toFixed(2)} {targetCurrency.code}</span>
            </div>
            <button 
              onClick={handleRefresh} 
              className="p-1 rounded-full hover:bg-indigo-500/10 transition-colors"
              disabled={isLoading}
            >
              <RefreshCw className={`h-3.5 w-3.5 text-indigo-400 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          {/* They Receive Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">They Receive</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={convertedAmount.toFixed(2)}
                readOnly
                className="bg-theme-dark/50 border-white/10 h-11 cursor-not-allowed"
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              />
              <div className="w-28 h-11 px-4 border border-white/10 rounded-md bg-theme-dark/50 flex items-center space-x-2">
                <span className="mr-1 text-base">{targetCurrency.flag}</span>
                <span>{targetCurrency.code}</span>
              </div>
            </div>
          </div>

          {/* Button to go to full converter */}
          <div className="pt-2">
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => window.location.href = '/converter'}
            >
              Full Converter
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeConverterWidget;
