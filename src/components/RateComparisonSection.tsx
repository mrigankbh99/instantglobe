
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle } from 'lucide-react';

// Updated comparison data with new columns
const comparisonData = [
  { 
    provider: 'Our Service', 
    exchangeRate: 'Google Forex Rate', 
    fees: 'Zero Fees', 
    transferTime: 'Instant', 
    rateTransparency: true, 
    stablecoinPowered: true, 
    highlight: true 
  },
  { 
    provider: 'Wise', 
    exchangeRate: '0.5-1% below Google', 
    fees: '$3-9 per transfer', 
    transferTime: '1-2 days', 
    rateTransparency: true, 
    stablecoinPowered: false, 
    highlight: false 
  },
  { 
    provider: 'Remitly', 
    exchangeRate: '1-1.5% below Google', 
    fees: '$3.99 per transfer', 
    transferTime: '3-5 days', 
    rateTransparency: false, 
    stablecoinPowered: false, 
    highlight: false 
  },
  { 
    provider: 'Western Union', 
    exchangeRate: '1.5-2% below Google', 
    fees: '$5-10 per transfer', 
    transferTime: '2-3 days', 
    rateTransparency: false, 
    stablecoinPowered: false, 
    highlight: false 
  },
  { 
    provider: 'Banks', 
    exchangeRate: '3-4% below Google', 
    fees: '$25-45 per transfer', 
    transferTime: '3-5 days', 
    rateTransparency: false, 
    stablecoinPowered: false, 
    highlight: false 
  },
];

const RateComparisonSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-theme-blue/15 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-theme-cyan/15 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-4">
            How We <span className="gradient-text">Compare</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            See how our service stacks up against traditional remittance options.
          </p>
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Card className="shadow-xl glass-card border-none overflow-hidden w-full">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-white/10">
                      <TableHead className="text-theme-cyan py-6 text-base font-space">Service</TableHead>
                      <TableHead className="text-theme-cyan py-6 text-base font-space">Exchange Rate</TableHead>
                      <TableHead className="text-theme-cyan py-6 text-base font-space">Fees</TableHead>
                      <TableHead className="text-theme-cyan py-6 text-base font-space">Transfer Time</TableHead>
                      <TableHead className="text-theme-cyan py-6 text-base font-space">Rate Transparency</TableHead>
                      <TableHead className="text-theme-cyan py-6 text-base font-space">Stablecoin Powered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((item) => (
                      <TableRow 
                        key={item.provider} 
                        className={`border-b border-white/10 hover:bg-white/5 transition-colors ${item.highlight ? 'bg-gradient-to-r from-theme-blue/10 to-theme-cyan/10' : ''}`}
                      >
                        <TableCell className={`font-medium py-6 ${item.highlight ? 'text-theme-cyan text-lg font-space' : ''}`}>
                          {item.provider}
                        </TableCell>
                        <TableCell className="py-6">{item.exchangeRate}</TableCell>
                        <TableCell className="py-6">{item.fees}</TableCell>
                        <TableCell className="py-6">{item.transferTime}</TableCell>
                        <TableCell className="py-6">
                          {item.rateTransparency ? 
                            <CheckCircle className="h-6 w-6 text-green-500" /> : 
                            <XCircle className="h-6 w-6 text-red-500" />}
                        </TableCell>
                        <TableCell className="py-6">
                          {item.stablecoinPowered ? 
                            <CheckCircle className="h-6 w-6 text-green-500" /> : 
                            <XCircle className="h-6 w-6 text-red-500" />}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="p-6 text-xs text-gray-400">
                *Exchange rates and fees are for comparison purposes only and may vary based on amount and payment method.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RateComparisonSection;
