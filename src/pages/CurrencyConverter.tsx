
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

type Currency = 'USD' | 'GBP' | 'AED';

interface ExchangeRate {
  currency: Currency;
  rateToINR: number;
  symbol: string;
}

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [amount, setAmount] = useState<string>('100');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Simulated exchange rates (in a real app, these would be fetched from an API)
  const exchangeRates: ExchangeRate[] = [
    { currency: 'USD', rateToINR: 83.12, symbol: '$' },
    { currency: 'GBP', rateToINR: 106.45, symbol: '£' },
    { currency: 'AED', rateToINR: 22.63, symbol: 'د.إ' },
  ];

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

  const getExchangeRate = (currency: Currency): number => {
    const rate = exchangeRates.find(rate => rate.currency === currency);
    return rate ? rate.rateToINR : 0;
  };

  const getCurrencySymbol = (currency: Currency): string => {
    const rate = exchangeRates.find(rate => rate.currency === currency);
    return rate ? rate.symbol : '';
  };

  const convert = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const rate = getExchangeRate(fromCurrency);
      const result = parseFloat(amount || '0') * rate;
      setConvertedAmount(result);
      setIsLoading(false);
      
      toast({
        title: "Conversion Complete",
        description: `${amount} ${fromCurrency} = ₹${result.toFixed(2)} INR`,
        duration: 3000,
      });
    }, 800);
  };

  const refreshRates = () => {
    setIsLoading(true);
    
    // Simulate refreshing rates
    setTimeout(() => {
      setIsLoading(false);
      convert();
      
      toast({
        title: "Rates Updated",
        description: "Exchange rates have been updated to the latest values.",
        duration: 3000,
      });
    }, 1000);
  };

  // Perform initial conversion on component mount
  useEffect(() => {
    convert();
  }, [fromCurrency]); // Convert whenever currency changes

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Live Currency Converter</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get real-time exchange rates for your international transfers with zero fees.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 shadow-lg">
            {/* Converter Card */}
            <div className="space-y-8">
              {/* Input Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* From Currency */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">From</label>
                  <div className="space-y-2">
                    <Select 
                      value={fromCurrency} 
                      onValueChange={handleFromCurrencyChange}
                    >
                      <SelectTrigger className="w-full bg-white/5 border-white/10">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="bg-theme-dark border border-white/10">
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                        <SelectItem value="AED">UAE Dirham (AED)</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="relative">
                      <Input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        className="pl-8 pr-4 py-2 text-lg font-medium bg-white/5 border-white/10"
                        placeholder="Enter amount"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {getCurrencySymbol(fromCurrency)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* To Currency */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">To</label>
                  <div className="space-y-2">
                    <Select disabled defaultValue="INR">
                      <SelectTrigger className="w-full bg-white/5 border-white/10">
                        <SelectValue placeholder="Indian Rupee (INR)" />
                      </SelectTrigger>
                      <SelectContent className="bg-theme-dark border border-white/10">
                        <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="relative bg-white/5 rounded-md flex items-center h-12 px-3 py-2 border border-white/10">
                      <span className="text-gray-300 mr-2">₹</span>
                      <span className="text-lg font-medium">{convertedAmount.toFixed(2)}</span>
                      <div className="absolute right-3">
                        <Badge className="bg-theme-green text-white hover:bg-theme-green/90">Zero Fees</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Divider with arrow */}
              <div className="relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-theme-dark p-2 rounded-full border border-white/10">
                  <ArrowRight className="h-5 w-5 text-theme-blue" />
                </div>
                <div className="w-full h-px bg-white/10"></div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={convert}
                  className="flex-1 bg-theme-blue hover:bg-theme-blue/90 transition-all duration-300"
                  disabled={isLoading || !amount || parseFloat(amount) <= 0}
                >
                  Convert Now
                </Button>
                <Button 
                  variant="outline" 
                  onClick={refreshRates}
                  className="flex-1 border-white/10 hover:bg-white/5"
                  disabled={isLoading}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh Rates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CurrencyConverter;
