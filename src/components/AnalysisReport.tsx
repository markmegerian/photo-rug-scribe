import React from 'react';
import { FileText, DollarSign, Wrench, ArrowLeft, Download, ClipboardList, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { generatePDF } from '@/lib/pdfGenerator';

interface AnalysisReportProps {
  report: string;
  rugInfo: {
    clientName: string;
    rugNumber: string;
    rugType: string;
    dimensions: string;
  };
  onNewInspection: () => void;
  onReviewEstimate?: () => void;
  onReanalyze?: () => void;
  isReanalyzing?: boolean;
}


const AnalysisReport: React.FC<AnalysisReportProps> = ({
  report,
  rugInfo,
  onNewInspection,
  onReviewEstimate,
  onReanalyze,
  isReanalyzing = false,
}) => {
  const handleDownloadPDF = async () => {
    try {
      // Parse dimensions
      const dimMatch = rugInfo.dimensions.match(/([0-9.]+)'?\s*[×x]\s*([0-9.]+)/);
      const length = dimMatch ? parseFloat(dimMatch[1]) : null;
      const width = dimMatch ? parseFloat(dimMatch[2]) : null;

      await generatePDF({
        id: '',
        client_name: rugInfo.clientName,
        client_email: null,
        client_phone: null,
        rug_number: rugInfo.rugNumber,
        rug_type: rugInfo.rugType,
        length,
        width,
        notes: null,
        photo_urls: null,
        analysis_report: report,
        created_at: new Date().toISOString(),
      });
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF');
    }
  };

  // Parse the report into sections for better display
  const formatReport = (text: string) => {
    // Clean up any remaining markdown artifacts
    const cleanText = text
      .replace(/^#{1,3}\s*/gm, '') // Remove heading markers
      .replace(/\*\*/g, '') // Remove bold markers
      .replace(/^\* /gm, '• ') // Convert asterisk bullets to proper bullets
      .replace(/^- /gm, '• '); // Convert dash bullets to proper bullets

    return cleanText.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      // Empty lines become breaks
      if (trimmedLine === '') {
        return <br key={index} />;
      }
      
      // Lines that look like section headers (ALL CAPS or ending with colon)
      if (/^[A-Z][A-Z\s&]+:?$/.test(trimmedLine) || /^[A-Z][A-Z\s&]+$/.test(trimmedLine)) {
        return (
          <h3 key={index} className="font-display text-lg font-semibold text-foreground mt-6 mb-3 first:mt-0">
            {trimmedLine}
          </h3>
        );
      }
      
      // Lines starting with "Dear" or "Sincerely" - greeting/closing
      if (trimmedLine.startsWith('Dear ') || trimmedLine.startsWith('Sincerely')) {
        return (
          <p key={index} className="text-foreground font-medium mt-4 mb-2">
            {trimmedLine}
          </p>
        );
      }
      
      // Lines that look like rug headers (Rug #...)
      if (/^Rug\s*#/i.test(trimmedLine)) {
        return (
          <h4 key={index} className="font-display font-semibold text-foreground mt-4 mb-2">
            {trimmedLine}
          </h4>
        );
      }
      
      // Lines with dollar amounts (service line items)
      if (/\$[\d,]+(\.\d{2})?/.test(trimmedLine)) {
        // Check if it's a total line
        if (/total|subtotal/i.test(trimmedLine)) {
          return (
            <p key={index} className="font-semibold text-foreground border-t border-border pt-2 mt-2">
              {trimmedLine}
            </p>
          );
        }
        return (
          <p key={index} className="text-foreground/90 font-mono text-sm pl-4">
            {trimmedLine}
          </p>
        );
      }
      
      // Bullet points
      if (trimmedLine.startsWith('•')) {
        return (
          <li key={index} className="ml-4 text-foreground/90 mb-1 list-none">
            {trimmedLine}
          </li>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="text-foreground/80 mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onNewInspection}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          New Inspection
        </Button>
        {onReanalyze && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReanalyze}
            disabled={isReanalyzing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isReanalyzing ? 'animate-spin' : ''}`} />
            {isReanalyzing ? 'Re-analyzing...' : 'Re-analyze'}
          </Button>
        )}
      </div>

      {/* Rug Summary Card */}
      <Card className="shadow-card border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 font-display">
            <FileText className="h-5 w-5 text-primary" />
            Inspection Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Client</p>
              <p className="font-medium">{rugInfo.clientName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Rug Number</p>
              <p className="font-medium">{rugInfo.rugNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium">{rugInfo.rugType}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Dimensions</p>
              <p className="font-medium">{rugInfo.dimensions}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Report */}
      <Card className="shadow-medium">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2 font-display">
            <Wrench className="h-5 w-5 text-primary" />
            AI Analysis & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose prose-sm max-w-none">
            {formatReport(report)}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="default" 
          size="lg" 
          className="flex-1 gap-2"
          onClick={handleDownloadPDF}
        >
          <Download className="h-4 w-4" />
          Download PDF Report
        </Button>
        {onReviewEstimate && (
          <Button 
            variant="warm" 
            size="lg" 
            className="flex-1 gap-2"
            onClick={onReviewEstimate}
          >
            <ClipboardList className="h-4 w-4" />
            Review Estimate
          </Button>
        )}
      </div>
    </div>
  );
};

export default AnalysisReport;
