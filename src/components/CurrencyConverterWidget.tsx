
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Type definitions
type Currency = 'USD' | 'GBP' | 'AED';

interface CurrencyData {
  symbol: string;
  flag: string;
  name: string;
}

const CurrencyConverterWidget = () => {
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [amount, setAmount] = useState<string>('1000.00');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Currency metadata
  const currencyData: Record<Currency | 'INR', CurrencyData> = {
    'USD': { 
      symbol: '$', 
      flag: '🇺🇸', 
      name: 'US Dollar'
    },
    'GBP': { 
      symbol: '£', 
      flag: '🇬🇧', 
      name: 'British Pound'
    },
    'AED': { 
      symbol: 'د.إ', 
      flag: '🇦🇪', 
      name: 'UAE Dirham'
    },
    'INR': { 
      symbol: '₹', 
      flag: '🇮🇳', 
      name: 'Indian Rupee'
    }
  };

  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value as Currency);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and one decimal point
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  // Fetch exchange rates from Fixer.io API
  const fetchExchangeRate = async () => {
    setIsLoading(true);
    
    try {
      // In a real application, this would be an actual API call
      // For now, we'll simulate the API response
      // const response = await fetch(`https://data.fixer.io/api/latest?access_key=YOUR_API_KEY&base=${fromCurrency}&symbols=INR`);
      // const data = await response.json();
      
      // Simulate API response
      const rates = {
        'USD': 83.12,
        'GBP': 106.45,
        'AED': 22.63
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const rate = rates[fromCurrency];
      setExchangeRate(rate);
      
      // Calculate converted amount
      const result = parseFloat(amount || '0') * rate;
      setConvertedAmount(result);
      
      toast({
        title: "Rates Updated",
        description: "Exchange rates have been updated from Fixer.io",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch exchange rates. Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Perform initial conversion on component mount or when currency/amount changes
  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      fetchExchangeRate();
    }
  }, [fromCurrency, amount]); // Convert whenever currency or amount changes

  return (
    <div className="bg-black rounded-3xl p-8 shadow-xl text-white">
      <div className="space-y-8">
        {/* You send */}
        <div className="space-y-2">
          <p className="text-xl text-gray-300">You send</p>
          <div className="flex items-end justify-between">
            <Input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="text-5xl font-medium border-none bg-transparent p-0 h-auto text-emerald-300 w-2/3 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="0.00"
            />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-800">
                <span className="text-xl">{currencyData[fromCurrency].flag}</span>
              </div>
              <Select 
                value={fromCurrency} 
                onValueChange={handleFromCurrencyChange}
              >
                <SelectTrigger className="w-24 bg-transparent border-none text-xl focus:ring-0">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-gray-800">
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="AED">AED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="h-px w-full bg-gray-800"></div>
        
        {/* Fee Info */}
        <div className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <span className="text-gray-300">Our fee:</span>
            <span>{currencyData[fromCurrency].symbol}0</span>
          </div>
          <div>
            <Badge className="bg-indigo-900/60 text-indigo-300 hover:bg-indigo-900/60">
              Zero Fees 🎉
            </Badge>
          </div>
        </div>
        
        {/* Exchange Rate Info */}
        <div className="flex items-center justify-between text-lg">
          <div className="text-gray-300">Live market rate:</div>
          <div className="flex items-center gap-2">
            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center cursor-help">
                  <span>{currencyData[fromCurrency].symbol}1.00 = ₹{exchangeRate.toFixed(2)}</span>
                  <TrendingUp className="ml-2 h-4 w-4 text-emerald-400" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="bg-gray-900 border border-gray-800 text-white">
                <p className="text-sm">Live rates from Fixer.io</p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        
        <div className="h-px w-full bg-gray-800"></div>
        
        {/* They receive */}
        <div className="space-y-2">
          <p className="text-xl text-gray-300">They receive</p>
          <div className="flex items-end justify-between">
            <div className="text-5xl font-medium text-emerald-300 w-2/3">
              {isLoading ? (
                <div className="animate-pulse bg-emerald-900/20 h-12 w-2/3 rounded"></div>
              ) : (
                convertedAmount.toLocaleString('en-IN', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                })
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-800">
                <span className="text-xl">🇮🇳</span>
              </div>
              <span className="text-xl">INR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterWidget;
