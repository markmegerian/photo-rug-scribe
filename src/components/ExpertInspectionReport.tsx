import React, { useState, useMemo } from 'react';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
 import { 
  ChevronDown, ChevronUp, 
  FileText, ImageIcon, Lock, MessageSquare, Shield, ClipboardCheck
 } from 'lucide-react';
 import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
 import { 
   SERVICE_CATEGORIES, 
   categorizeService, 
   type ServiceCategory 
 } from '@/lib/serviceCategories';
 import RugPhoto from '@/components/RugPhoto';
 
 interface Service {
   id: string;
   name: string;
   quantity: number;
   unitPrice: number;
   priority?: string;
 }
 
 interface RugData {
   id: string;
   rug_number: string;
   rug_type: string;
   length: number | null;
   width: number | null;
   photo_urls: string[] | null;
   analysis_report: string | null;
   estimate_id: string;
   services: Service[];
   total: number;
 }
 
 interface ExpertInspectionReportProps {
   rugs: RugData[];
   clientName: string;
   jobNumber: string;
   businessName: string | null;
  onApprove: (acceptedRecommendations: boolean, acceptedPreventative: boolean) => void;
   onRequestClarification?: () => void;
   isProcessing?: boolean;
   totalAmount: number;
 }
 
 // Group services by category
 function groupServicesByCategory(services: Service[]): Record<ServiceCategory, Service[]> {
   const grouped: Record<ServiceCategory, Service[]> = {
     required: [],
     recommended: [],
     preventative: []
   };
   
   services.forEach(service => {
     const category = categorizeService(service.name);
     grouped[category].push(service);
   });
   
   return grouped;
 }
 
 // Calculate category totals
 function calculateCategoryTotal(services: Service[]): number {
   return services.reduce((sum, s) => sum + s.quantity * s.unitPrice, 0);
 }
 
// Generate condition summary based on services
function generateConditionSummary(services: Service[]): string {
  const hasStainRemoval = services.some(s => s.name.toLowerCase().includes('stain'));
  const hasOdorTreatment = services.some(s => s.name.toLowerCase().includes('odor') || s.name.toLowerCase().includes('urine'));
  const hasRepair = services.some(s => s.name.toLowerCase().includes('repair') || s.name.toLowerCase().includes('fringe'));
  const hasProtection = services.some(s => s.name.toLowerCase().includes('protection') || s.name.toLowerCase().includes('scotchgard'));
  
  const conditions: string[] = [];
  if (hasStainRemoval) conditions.push('visible staining');
  if (hasOdorTreatment) conditions.push('odor contamination');
  if (hasRepair) conditions.push('structural concerns');
  if (hasProtection) conditions.push('fiber vulnerability');
  
  if (conditions.length === 0) {
    return 'Standard cleaning and care recommended based on material type and general condition.';
  }
  
  return `Assessment indicates ${conditions.join(', ')}. Services outlined below address identified conditions.`;
}

 const ExpertInspectionReport: React.FC<ExpertInspectionReportProps> = ({
   rugs,
   clientName,
   jobNumber,
   businessName,
   onApprove,
   onRequestClarification,
   isProcessing = false,
   totalAmount
 }) => {
   const [expandedRugs, setExpandedRugs] = useState<Set<string>>(new Set(rugs.map(r => r.id)));
   const [showReport, setShowReport] = useState<string | null>(null);
  const [acceptRecommendations, setAcceptRecommendations] = useState(true);
  const [acceptPreventative, setAcceptPreventative] = useState(true);
   
   // Aggregate services across all rugs
   const allServices = rugs.flatMap(r => r.services);
   const allGrouped = groupServicesByCategory(allServices);
   
   const requiredTotal = calculateCategoryTotal(allGrouped.required);
   const recommendedTotal = calculateCategoryTotal(allGrouped.recommended);
   const preventativeTotal = calculateCategoryTotal(allGrouped.preventative);

  // Calculate final total based on selections
  const finalTotal = useMemo(() => {
    let total = requiredTotal;
    if (acceptRecommendations) total += recommendedTotal;
    if (acceptPreventative) total += preventativeTotal;
    return total;
  }, [requiredTotal, recommendedTotal, preventativeTotal, acceptRecommendations, acceptPreventative]);
   
   const toggleRug = (rugId: string) => {
     setExpandedRugs(prev => {
       const newSet = new Set(prev);
       if (newSet.has(rugId)) {
         newSet.delete(rugId);
       } else {
         newSet.add(rugId);
       }
       return newSet;
     });
   };
 
   return (
     <div className="space-y-6">
      {/* 1. Header Section - Trust Establishment */}
      <Card className="border-border bg-card">
         <CardHeader>
           <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
              <ClipboardCheck className="h-6 w-6 text-foreground" />
             </div>
             <div className="flex-1">
               <CardTitle className="text-xl">Expert Inspection Report</CardTitle>
               <CardDescription className="text-sm mt-1">
                Prepared following professional inspection and industry-standard care guidelines
               </CardDescription>
             </div>
           </div>
         </CardHeader>
         <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-muted pl-4">
            This report outlines the services required to safely clean and preserve your {rugs.length === 1 ? 'rug' : `${rugs.length} rugs`}. 
            All recommendations are based on observed condition, material characteristics, and established industry protocols.
           </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">{businessName || 'Professional Rug Care'}</span>
            <span>•</span>
            <span>Report #{jobNumber}</span>
            <span>•</span>
            <span>Prepared for {clientName}</span>
          </div>
         </CardContent>
       </Card>
 
      {/* 2. Rug Assessments - Context, Not Choice */}
       {rugs.map((rug) => {
         const groupedServices = groupServicesByCategory(rug.services);
         const isExpanded = expandedRugs.has(rug.id);
         const isShowingReport = showReport === rug.id;
        const conditionSummary = generateConditionSummary(rug.services);
         
         return (
          <Card key={rug.id} className="overflow-hidden">
             <Collapsible
               open={isExpanded}
               onOpenChange={() => toggleRug(rug.id)}
             >
               <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors pb-3">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       {rug.photo_urls && rug.photo_urls.length > 0 ? (
                         <RugPhoto
                           filePath={rug.photo_urls[0]}
                           alt={rug.rug_number}
                           className="w-14 h-14 object-cover rounded-lg border"
                           loadingClassName="w-14 h-14"
                         />
                       ) : (
                         <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                         </div>
                       )}
                       <div>
                         <CardTitle className="text-lg">{rug.rug_number}</CardTitle>
                         <CardDescription>
                           {rug.rug_type} • {rug.length && rug.width ? `${rug.length}' × ${rug.width}'` : 'Dimensions TBD'}
                         </CardDescription>
                       </div>
                     </div>
                    <div className="flex items-center gap-2">
                       {isExpanded ? (
                         <ChevronUp className="h-5 w-5 text-muted-foreground" />
                       ) : (
                         <ChevronDown className="h-5 w-5 text-muted-foreground" />
                       )}
                     </div>
                   </div>
                 </CardHeader>
               </CollapsibleTrigger>
               
               <CollapsibleContent>
                 <CardContent className="pt-0 space-y-4">
                  {/* Condition Summary */}
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground italic">
                      {conditionSummary}
                    </p>
                  </div>

                   {/* Photos */}
                   {rug.photo_urls && rug.photo_urls.length > 0 && (
                     <div className="flex gap-2 overflow-x-auto pb-2">
                       {rug.photo_urls.slice(0, 4).map((url, idx) => (
                         <RugPhoto
                           key={idx}
                           filePath={url}
                           alt={`${rug.rug_number} photo ${idx + 1}`}
                           className="w-20 h-20 object-cover rounded-lg border flex-shrink-0"
                           loadingClassName="w-20 h-20"
                         />
                       ))}
                       {rug.photo_urls.length > 4 && (
                         <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground flex-shrink-0">
                           +{rug.photo_urls.length - 4}
                         </div>
                       )}
                     </div>
                   )}
                   
                   {/* View Report Toggle */}
                   {rug.analysis_report && (
                     <Button
                       variant="ghost"
                       size="sm"
                       onClick={(e) => {
                         e.stopPropagation();
                         setShowReport(isShowingReport ? null : rug.id);
                       }}
                      className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                     >
                       <FileText className="h-4 w-4" />
                       {isShowingReport ? 'Hide Detailed Assessment' : 'View Detailed Assessment'}
                     </Button>
                   )}
                   
                   {/* Analysis Report */}
                   {isShowingReport && rug.analysis_report && (
                     <div className="bg-muted/30 rounded-lg p-4 text-sm">
                       <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                         {rug.analysis_report}
                       </pre>
                     </div>
                   )}
                 </CardContent>
               </CollapsibleContent>
             </Collapsible>
           </Card>
         );
       })}
 
      {/* 3. Services Required for Proper Care - Non-Negotiable */}
      {requiredTotal > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-foreground" />
              <CardTitle className="text-base">Services Required for Proper Care</CardTitle>
            </div>
            <CardDescription className="text-xs">
              These services are necessary to safely clean and stabilize the rug.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {allGrouped.required.map((service, idx) => (
                <div key={service.id || idx} className="flex items-start gap-3 py-2">
                  <Lock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{service.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Standard protocol for this material and condition type
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 4. Expert-Recommended Enhancements - Grouped Acceptance */}
      {recommendedTotal > 0 && (
        <Card className={!acceptRecommendations ? 'opacity-60' : ''}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Expert-Recommended Enhancements</CardTitle>
                <CardDescription className="text-xs mt-1">
                  These services are recommended to improve results and reduce long-term risk.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="accept-recommended"
                  checked={acceptRecommendations}
                  onCheckedChange={setAcceptRecommendations}
                />
                <Label htmlFor="accept-recommended" className="text-xs text-muted-foreground sr-only">
                  Accept recommendations
                </Label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {allGrouped.recommended.map((service, idx) => (
                <div key={service.id || idx} className="flex items-start gap-3 py-2">
                  <div className="h-4 w-4 rounded-full border border-muted-foreground/30 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{service.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Addresses identified condition factors
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {!acceptRecommendations && (
              <p className="text-xs text-muted-foreground mt-3 italic">
                Expert recommendations declined. Required services will proceed as scheduled.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* 5. Preventative Care Recommendations - Softer Visual */}
      {preventativeTotal > 0 && (
        <Card className={`border-dashed ${!acceptPreventative ? 'opacity-50' : 'opacity-80'}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <CardTitle className="text-base text-muted-foreground">Preventative Care</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Not required at this time, but recommended to reduce future deterioration.
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="accept-preventative"
                  checked={acceptPreventative}
                  onCheckedChange={setAcceptPreventative}
                />
                <Label htmlFor="accept-preventative" className="text-xs text-muted-foreground sr-only">
                  Accept preventative care
                </Label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {allGrouped.preventative.map((service, idx) => (
                <div key={service.id || idx} className="flex items-start gap-3 py-2 text-muted-foreground">
                  <Shield className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-50" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{service.name}</p>
                    <p className="text-xs opacity-70">
                      Long-term protection measure
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 6. Risk & Disclosure Section */}
      <div className="bg-muted/30 rounded-lg p-4 border border-dashed">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Professional Notice:</span>{' '}
          Rugs of varying age and condition may exhibit pre-existing weaknesses that cannot be fully 
          corrected through cleaning alone. The services outlined represent our professional assessment 
          of appropriate care based on current condition. Authorization confirms understanding that 
          results depend on material condition at time of service.
        </p>
      </div>

      {/* 7. Total Investment - Single Moment */}
      <Card className="border-foreground/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Investment for Authorized Work
          </CardTitle>
         </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight">
            ${finalTotal.toFixed(2)}
           </div>
          <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
            {requiredTotal > 0 && (
              <p>Required services: ${requiredTotal.toFixed(2)}</p>
            )}
            {recommendedTotal > 0 && acceptRecommendations && (
              <p>Expert recommendations: ${recommendedTotal.toFixed(2)}</p>
            )}
            {preventativeTotal > 0 && acceptPreventative && (
              <p>Preventative care: ${preventativeTotal.toFixed(2)}</p>
            )}
           </div>
         </CardContent>
       </Card>
 
      {/* 8. Primary CTA - One Action */}
      <div className="space-y-4">
         <Button 
           onClick={() => onApprove(acceptRecommendations, acceptPreventative)}
           disabled={isProcessing}
          className="w-full h-14 text-lg font-medium"
           size="lg"
         >
           {isProcessing ? (
            <span className="animate-pulse">Processing Authorization...</span>
           ) : (
            'Approve & Authorize Work'
           )}
         </Button>
         
        <p className="text-xs text-center text-muted-foreground">
          Approval authorizes the services outlined above and initiates payment.
        </p>
        
         {onRequestClarification && (
           <Button 
             variant="ghost"
             onClick={onRequestClarification}
            className="w-full text-muted-foreground hover:text-foreground"
             size="sm"
           >
             <MessageSquare className="h-4 w-4 mr-2" />
             Request Clarification
           </Button>
         )}
       </div>
     </div>
   );
 };
 
 export default ExpertInspectionReport;