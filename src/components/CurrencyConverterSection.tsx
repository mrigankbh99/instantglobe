
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
import { RefreshCw, CircleDollarSign, CircleCheck, CheckCircle, XCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

// Currency data with flags and symbols
const currencies = [
  { code: 'USD', country: 'United States', flag: '🇺🇸', symbol: '$' },
  { code: 'GBP', country: 'United Kingdom', flag: '🇬🇧', symbol: '£' },
  { code: 'AED', country: 'United Arab Emirates', flag: '🇦🇪', symbol: 'د.إ' },
];

// Fixed target currency
const targetCurrency = { code: 'INR', country: 'India', flag: '🇮🇳', symbol: '₹' };

// Comparison data for different providers with fees calculation
const getComparisonData = (baseRate: number, currencyCode: string, amount: number) => [
  { 
    provider: 'Our Service', 
    exchangeRate: `${baseRate.toFixed(2)} ₹`, 
    theyReceive: `${(amount * baseRate).toFixed(2)} ₹`,
    fees: 'Zero Fees', 
    transferTime: 'Instant', 
    rateTransparency: true, 
    stablecoinPowered: true, 
    highlight: true 
  },
  { 
    provider: 'Wise', 
    exchangeRate: `${(baseRate * 0.995).toFixed(2)} ₹`, 
    theyReceive: `${(amount * baseRate * 0.995 - 3).toFixed(2)} ₹`,
    fees: '$3-9 per transfer', 
    transferTime: '1-2 days', 
    rateTransparency: true, 
    stablecoinPowered: false, 
    highlight: false 
  },
  { 
    provider: 'Remitly', 
    exchangeRate: `${(baseRate * 0.985).toFixed(2)} ₹`, 
    theyReceive: `${(amount * baseRate * 0.985 - 3.99).toFixed(2)} ₹`,
    fees: '$3.99 per transfer', 
    transferTime: '3-5 days', 
    rateTransparency: false, 
    stablecoinPowered: false, 
    highlight: false 
  },
  { 
    provider: 'Western Union', 
    exchangeRate: `${(baseRate * 0.975).toFixed(2)} ₹`, 
    theyReceive: `${(amount * baseRate * 0.975 - 5).toFixed(2)} ₹`,
    fees: '$5-10 per transfer', 
    transferTime: '2-3 days', 
    rateTransparency: false, 
    stablecoinPowered: false, 
    highlight: false 
  },
  { 
    provider: 'Banks', 
    exchangeRate: `${(baseRate * 0.965).toFixed(2)} ₹`, 
    theyReceive: `${(amount * baseRate * 0.965 - 25).toFixed(2)} ₹`,
    fees: '$25-45 per transfer', 
    transferTime: '3-5 days', 
    rateTransparency: false, 
    stablecoinPowered: false, 
    highlight: false 
  },
];

const CurrencyConverterSection = () => {
  const [sourceCurrency, setSourceCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const [comparisonData, setComparisonData] = useState(getComparisonData(83.12, 'USD', 100));

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
      setLastUpdated(new Date().toLocaleTimeString());
      
      // Update comparison data with new rate and amount
      setComparisonData(getComparisonData(fetchedRate, from, amount));
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
    // Update comparison data with new amount
    setComparisonData(getComparisonData(rate, sourceCurrency.code, amount));
  }, [amount, rate, sourceCurrency.code]);

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
    <div className="max-w-6xl mx-auto space-y-14">
      {/* Converter UI */}
      <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-theme-dark/80 to-theme-dark border border-white/5">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center">
              <CircleDollarSign className="mr-2 text-theme-blue h-6 w-6" />
              Currency Converter
            </h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-theme-purple/10 text-theme-purple border-theme-purple/20 px-3 py-1 flex items-center gap-1.5">
                <CircleCheck className="h-3.5 w-3.5" />
                <span className="font-medium">Zero Fees</span>
              </Badge>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* You Send Section */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-theme-gray">You Send</Label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    className="bg-theme-dark/50 border-white/10 focus-visible:ring-theme-blue focus-visible:border-theme-blue/20 h-14 text-lg"
                    placeholder="Enter amount"
                  />
                </div>
                <div className="w-36">
                  <Select
                    value={sourceCurrency.code}
                    onValueChange={handleSourceCurrencyChange}
                  >
                    <SelectTrigger className="bg-theme-dark/50 border-white/10 focus:ring-theme-blue focus:border-theme-blue/20 h-14">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-theme-dark border border-white/10">
                      {currencies.map((currency) => (
                        <SelectItem 
                          key={currency.code} 
                          value={currency.code}
                          className="focus:bg-theme-blue/10 focus:text-white"
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
            </div>
            
            {/* Exchange Rate Display */}
            <div className="flex justify-between items-center py-2 px-3 rounded-md bg-theme-blue/5 border border-theme-blue/10">
              <div className="text-sm text-theme-gray">
                <span>1 {sourceCurrency.code} = {rate.toFixed(2)} {targetCurrency.code}</span>
              </div>
              <button 
                onClick={handleRefresh} 
                className="p-1.5 rounded-full hover:bg-theme-blue/10 transition-colors"
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 text-theme-blue ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            {/* They Receive Section */}
            <div className="space-y-2">
              <Label htmlFor="converted" className="block text-sm font-medium text-theme-gray">They Receive</Label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    id="converted"
                    type="text"
                    value={convertedAmount.toFixed(2)}
                    readOnly
                    className="bg-theme-dark/50 border-white/10 h-14 text-lg cursor-not-allowed"
                  />
                </div>
                <div className="w-36">
                  <div className="h-14 px-4 border border-white/10 rounded-md bg-theme-dark/50 flex items-center space-x-2">
                    <span className="mr-2 text-base">{targetCurrency.flag}</span>
                    <span>{targetCurrency.code}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Last Updated */}
          <div className="mt-6 text-xs text-theme-gray/70 text-right">
            Last updated: {lastUpdated || 'Just now'}
          </div>
        </div>
      </div>

      {/* Rate Comparison Section */}
      <div className="animate-fade-in-up">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            How We <span className="text-indigo-400">Compare</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            See how our service stacks up against traditional remittance options when sending {amount} {sourceCurrency.code}.
          </p>
        </div>

        <div className="overflow-x-auto bg-gradient-to-br from-indigo-950/70 to-theme-dark/90 backdrop-blur-sm border border-indigo-500/20 rounded-xl shadow-lg">
          <table className="w-full min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="py-4 px-6 text-left text-sm font-medium text-indigo-300">Provider</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-indigo-300">Exchange Rate (1 {sourceCurrency.code})</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-indigo-300">They Receive (for {amount} {sourceCurrency.code})</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-indigo-300">Fees</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-indigo-300">Transfer Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {comparisonData.map((item, index) => (
                <tr 
                  key={index} 
                  className={`${item.highlight ? 'bg-indigo-500/10' : ''} hover:bg-indigo-500/5`}
                >
                  <td className={`py-4 px-6 ${item.highlight ? 'text-indigo-400 font-semibold' : ''}`}>{item.provider}</td>
                  <td className="py-4 px-6">{item.exchangeRate}</td>
                  <td className="py-4 px-6">{item.theyReceive}</td>
                  <td className="py-4 px-6">{item.fees}</td>
                  <td className="py-4 px-6">{item.transferTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-xs text-gray-400">
            *Exchange rates and fees are for comparison purposes only and may vary based on amount and payment method.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterSection;
