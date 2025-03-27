
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
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How We <span className="text-indigo-400">Compare</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            See how our service stacks up against traditional remittance options.
          </p>
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Card className="shadow-lg border-indigo-500/20 bg-gradient-to-br from-indigo-950/70 to-theme-dark/90 backdrop-blur-sm overflow-hidden w-full">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-white/10">
                      <TableHead className="text-indigo-300 py-6 text-base">Service</TableHead>
                      <TableHead className="text-indigo-300 py-6 text-base">Exchange Rate</TableHead>
                      <TableHead className="text-indigo-300 py-6 text-base">Fees</TableHead>
                      <TableHead className="text-indigo-300 py-6 text-base">Transfer Time</TableHead>
                      <TableHead className="text-indigo-300 py-6 text-base">Rate Transparency</TableHead>
                      <TableHead className="text-indigo-300 py-6 text-base">Stablecoin Powered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((item) => (
                      <TableRow 
                        key={item.provider} 
                        className={`border-b border-white/10 hover:bg-indigo-500/5 ${item.highlight ? 'bg-indigo-500/10' : ''}`}
                      >
                        <TableCell className={`font-medium py-6 ${item.highlight ? 'text-indigo-400 text-lg' : ''}`}>
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
