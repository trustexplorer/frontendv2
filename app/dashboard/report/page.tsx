'use client';

// import { ReportForm } from "@/components/scam-report/report-form";

import  ReportScams  from '@/components/scam-report/report-scam';

export default function ReportPage() {
  
  return (
    <div className="container mx-auto px-4 pb-24 sm:pb-32 flex flex-col items-center">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 mt-8">Report a Scam</h1>
        <p className="text-xl text-muted-foreground">
          Help protect our community by reporting scams you&apos;ve encountered or suspicious activities.
        </p>
      </div>
      
      {/* <ReportForm /> */}
      <ReportScams />
    </div>
  );
}