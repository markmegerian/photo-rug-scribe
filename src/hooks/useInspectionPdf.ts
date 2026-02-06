import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { isNative } from '@/lib/platformUrls';

interface ServiceItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  priority?: string;
  adjustedTotal: number;
}

interface RugData {
  id: string;
  rug_number: string;
  rug_type: string;
  length: number | null;
  width: number | null;
  services: ServiceItem[];
  total: number;
  analysis_report?: string | null;
}

interface BusinessBranding {
  business_name: string | null;
  business_phone: string | null;
  business_email: string | null;
  business_address?: string | null;
}

interface GenerateInspectionPdfParams {
  jobId: string;
  jobNumber: string;
  clientName: string;
  rugs: RugData[];
  totalAmount: number;
  createdAt: string;
  branding?: BusinessBranding | null;
}

/**
 * Save and open PDF in native Capacitor environment
 */
async function saveAndOpenPdfNative(
  pdfBase64: string,
  filename: string
): Promise<boolean> {
  try {
    // Dynamic imports to avoid bundling issues on web
    const { Filesystem, Directory } = await import('@capacitor/filesystem');
    const { Share } = await import('@capacitor/share');

    // Save PDF to device
    const result = await Filesystem.writeFile({
      path: filename,
      data: pdfBase64,
      directory: Directory.Cache,
    });

    console.log('[PDF] Saved to:', result.uri);

    // Use Share to open the PDF (works across iOS/Android)
    await Share.share({
      title: filename.replace('.pdf', ''),
      url: result.uri,
      dialogTitle: 'Open Inspection Report',
    });

    return true;
  } catch (error) {
    console.error('[PDF] Native save/open failed:', error);
    return false;
  }
}

/**
 * Download PDF in web browser environment
 */
function downloadPdfWeb(pdfBase64: string, filename: string): void {
  const byteCharacters = atob(pdfBase64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Hook for generating Expert Inspection Report PDFs via server-side edge function
 */
export function useInspectionPdf() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAndDownload = useCallback(async (params: GenerateInspectionPdfParams) => {
    setIsGenerating(true);

    try {
      // Build condition summaries from analysis reports
      const rugDetails = params.rugs.map(rug => {
        // Generate condition summary from services
        const hasStain = rug.services.some(s => s.name.toLowerCase().includes('stain'));
        const hasOdor = rug.services.some(s => s.name.toLowerCase().includes('odor') || s.name.toLowerCase().includes('urine'));
        const hasRepair = rug.services.some(s => s.name.toLowerCase().includes('repair') || s.name.toLowerCase().includes('fringe'));

        const conditions: string[] = [];
        if (hasStain) conditions.push('visible staining');
        if (hasOdor) conditions.push('odor contamination');
        if (hasRepair) conditions.push('structural concerns');

        const conditionSummary = conditions.length > 0
          ? `Assessment indicates ${conditions.join(', ')}. Services address identified conditions.`
          : 'Standard cleaning and care recommended based on material type.';

        return {
          id: rug.id,
          rugNumber: rug.rug_number,
          rugType: rug.rug_type,
          dimensions: rug.length && rug.width ? `${rug.length}' × ${rug.width}'` : 'TBD',
          conditionSummary,
          photoCount: 0, // Photos not included in server-side PDF for now
          services: rug.services,
          total: rug.total,
        };
      });

      const { data, error } = await supabase.functions.invoke('generate-inspection-pdf', {
        body: {
          jobId: params.jobId,
          jobNumber: params.jobNumber,
          clientName: params.clientName,
          businessName: params.branding?.business_name,
          businessEmail: params.branding?.business_email,
          businessPhone: params.branding?.business_phone,
          businessAddress: params.branding?.business_address,
          rugs: rugDetails,
          totalAmount: params.totalAmount,
          createdAt: params.createdAt,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      const filename = data.filename || `Inspection_Report_${params.jobNumber}.pdf`;

      // Platform-aware PDF handling
      if (isNative()) {
        // Native: Save to filesystem and open via Share
        const success = await saveAndOpenPdfNative(data.pdfBase64, filename);
        if (!success) {
          throw new Error('Unable to open PDF. Please try again.');
        }
        toast.success('Report ready to view');
      } else {
        // Web: Standard download
        downloadPdfWeb(data.pdfBase64, filename);
        toast.success('Report downloaded successfully');
      }

      return { success: true };
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate PDF');
      return { success: false, error };
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    generateAndDownload,
    isGenerating,
  };
}

/**
 * Send "Inspection Ready" email to client
 */
export async function sendInspectionReadyEmail(params: {
  jobId: string;
  clientEmail: string;
  clientName: string;
  jobNumber: string;
  portalUrl: string;
  rugCount: number;
  totalAmount: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('send-inspection-ready', {
      body: params,
    });

    if (error) throw error;
    if (data.error) throw new Error(data.error);

    return { success: true };
  } catch (error) {
    console.error('Error sending inspection ready email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}
