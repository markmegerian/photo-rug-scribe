import React, { useState } from 'react';
import { Lightbulb, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type FeedbackType = 
  | 'service_correction'
  | 'price_correction'
  | 'missed_issue'
  | 'false_positive'
  | 'identification_error';

interface TeachAIDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inspectionId: string;
  originalServiceName?: string;
  originalPrice?: number;
  correctedServiceName?: string;
  correctedPrice?: number;
  rugType?: string;
  onFeedbackSubmitted?: () => void;
}

const FEEDBACK_TYPES: { value: FeedbackType; label: string; description: string }[] = [
  {
    value: 'price_correction',
    label: 'Price was wrong',
    description: 'The AI estimated an incorrect price for this service',
  },
  {
    value: 'service_correction',
    label: 'Service was misidentified',
    description: 'The AI suggested the wrong type of service',
  },
  {
    value: 'missed_issue',
    label: 'AI missed an issue',
    description: 'There was a problem the AI didn\'t detect',
  },
  {
    value: 'false_positive',
    label: 'Service not needed',
    description: 'The AI recommended a service that wasn\'t necessary',
  },
  {
    value: 'identification_error',
    label: 'Rug identification error',
    description: 'The AI incorrectly identified the rug type, origin, or age',
  },
];

const TeachAIDialog: React.FC<TeachAIDialogProps> = ({
  open,
  onOpenChange,
  inspectionId,
  originalServiceName,
  originalPrice,
  correctedServiceName,
  correctedPrice,
  rugType,
  onFeedbackSubmitted,
}) => {
  const { user } = useAuth();
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('price_correction');
  const [notes, setNotes] = useState('');
  const [correctedIdentification, setCorrectedIdentification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to submit feedback');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('ai_analysis_feedback')
        .insert({
          user_id: user.id,
          inspection_id: inspectionId,
          feedback_type: feedbackType,
          original_service_name: originalServiceName || null,
          original_price: originalPrice || null,
          corrected_service_name: correctedServiceName || null,
          corrected_price: correctedPrice || null,
          corrected_identification: correctedIdentification || null,
          notes: notes || null,
          rug_type: rugType || null,
        });

      if (error) throw error;

      toast.success('Thank you! Your feedback helps improve AI accuracy.');
      onOpenChange(false);
      onFeedbackSubmitted?.();
      
      // Reset form
      setNotes('');
      setCorrectedIdentification('');
      setFeedbackType('price_correction');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Teach the AI
          </DialogTitle>
          <DialogDescription>
            Help improve future estimates by explaining what the AI got wrong.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Feedback Type */}
          <div className="space-y-2">
            <Label htmlFor="feedback-type">What was incorrect?</Label>
            <Select value={feedbackType} onValueChange={(v) => setFeedbackType(v as FeedbackType)}>
              <SelectTrigger id="feedback-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FEEDBACK_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {FEEDBACK_TYPES.find(t => t.value === feedbackType)?.description}
            </p>
          </div>

          {/* Show original vs corrected values if applicable */}
          {(originalServiceName || originalPrice !== undefined) && (
            <div className="rounded-lg bg-muted/50 p-3 space-y-2 text-sm">
              <p className="font-medium text-foreground">Change detected:</p>
              {originalServiceName && correctedServiceName && originalServiceName !== correctedServiceName && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground line-through">{originalServiceName}</span>
                  <span className="text-foreground">→</span>
                  <span className="text-foreground font-medium">{correctedServiceName}</span>
                </div>
              )}
              {originalPrice !== undefined && correctedPrice !== undefined && originalPrice !== correctedPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
                  <span className="text-foreground">→</span>
                  <span className="text-foreground font-medium">${correctedPrice.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          {/* Correct identification (for identification errors) */}
          {feedbackType === 'identification_error' && (
            <div className="space-y-2">
              <Label htmlFor="correct-identification">Correct identification</Label>
              <Textarea
                id="correct-identification"
                placeholder="e.g., This is actually a Turkish Oushak from the 1920s, not a Persian Tabriz"
                value={correctedIdentification}
                onChange={(e) => setCorrectedIdentification(e.target.value)}
                rows={2}
              />
            </div>
          )}

          {/* Additional notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional context (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional details that might help the AI learn..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Feedback'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeachAIDialog;
