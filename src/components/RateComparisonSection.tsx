
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CircleDollarSign, CircleCheck } from 'lucide-react';

// Comparison data for USD to INR
const comparisonData = [
  { provider: 'InstantGlobe', rate: 83.12, fees: 0, deliveryTime: '10 minutes', highlight: true },
  { provider: 'Wise', rate: 82.67, fees: 3.50, deliveryTime: '1-2 days', highlight: false },
  { provider: 'Remitly', rate: 82.45, fees: 2.99, deliveryTime: '3-5 days', highlight: false },
  { provider: 'WorldRemit', rate: 82.12, fees: 3.99, deliveryTime: '1-3 days', highlight: false },
  { provider: 'Western Union', rate: 81.75, fees: 4.99, deliveryTime: '1-5 days', highlight: false },
  { provider: 'Banks (Avg)', rate: 80.40, fees: 25.00, deliveryTime: '3-5 days', highlight: false },
];

const RateComparisonSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How We <span className="text-indigo-400">Compare</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            See how our rates stack up against other money transfer services. We offer the best exchange rates with zero fees.
          </p>
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Card className="shadow-lg border-indigo-500/20 bg-gradient-to-br from-indigo-950/70 to-theme-dark/90 backdrop-blur-sm overflow-hidden w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <CircleDollarSign className="mr-2 text-indigo-400 h-5 w-5" />
                USD → INR Rate Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-white/10">
                      <TableHead className="text-indigo-300">Provider</TableHead>
                      <TableHead className="text-indigo-300 text-right">Rate</TableHead>
                      <TableHead className="text-indigo-300 text-right">Fees</TableHead>
                      <TableHead className="text-indigo-300">Delivery Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((item) => (
                      <TableRow 
                        key={item.provider} 
                        className={`border-b border-white/10 hover:bg-indigo-500/5 ${item.highlight ? 'bg-indigo-500/10' : ''}`}
                      >
                        <TableCell className={`font-medium ${item.highlight ? 'text-indigo-400' : ''}`}>
                          {item.highlight && <CircleCheck className="inline-block mr-1.5 h-4 w-4 text-indigo-400" />}
                          {item.provider}
                        </TableCell>
                        <TableCell className="text-right">₹{item.rate.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          {item.fees === 0 ? (
                            <span className="text-indigo-400">Free</span>
                          ) : (
                            `$${item.fees.toFixed(2)}`
                          )}
                        </TableCell>
                        <TableCell>{item.deliveryTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-3 text-xs text-gray-400">
                *Rates and fees are for comparison purposes only and may vary based on amount and payment method.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RateComparisonSection;
