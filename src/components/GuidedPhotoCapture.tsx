import React, { useRef, useState } from 'react';
import { Camera, X, Check, ChevronLeft, ChevronRight, AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Photo step definitions with guidance
const PHOTO_STEPS = [
  {
    id: 'overall-front',
    title: 'Overall Front',
    instruction: 'Capture the entire rug from directly above, showing the full front/top surface',
    tip: 'Stand back far enough to fit the whole rug in frame',
    required: true,
    icon: '📷',
  },
  {
    id: 'overall-back',
    title: 'Overall Back',
    instruction: 'Flip the rug and capture the entire back surface',
    tip: 'This helps identify construction type and hidden damage',
    required: true,
    icon: '🔄',
  },
  {
    id: 'fringe-end-a',
    title: 'Fringe - End A',
    instruction: 'Close-up of the fringe on one end of the rug',
    tip: 'Show the full width of the fringe clearly',
    required: true,
    icon: '〰️',
  },
  {
    id: 'fringe-end-b',
    title: 'Fringe - End B',
    instruction: 'Close-up of the fringe on the opposite end',
    tip: 'Capture any differences in condition from End A',
    required: true,
    icon: '〰️',
  },
  {
    id: 'edge-side-a',
    title: 'Edge/Binding - Side A',
    instruction: 'Close-up of one side edge/binding of the rug',
    tip: 'Show the binding or selvedge condition',
    required: true,
    icon: '📏',
  },
  {
    id: 'edge-side-b',
    title: 'Edge/Binding - Side B',
    instruction: 'Close-up of the opposite side edge/binding',
    tip: 'Note any wear, loose threads, or damage',
    required: true,
    icon: '📏',
  },
] as const;

// Optional damage/issue photos
const OPTIONAL_PHOTO_SLOTS = 4; // Photos 7-10

interface PhotoData {
  file: File;
  stepId: string;
  label: string;
}

interface GuidedPhotoCaptureProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
  maxPhotos?: number;
}

const GuidedPhotoCapture: React.FC<GuidedPhotoCaptureProps> = ({
  photos,
  onPhotosChange,
  maxPhotos = 10,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [photoData, setPhotoData] = useState<PhotoData[]>([]);
  const [captureMode, setCaptureMode] = useState<'guided' | 'additional'>('guided');

  const totalRequiredSteps = PHOTO_STEPS.length;
  const completedRequiredSteps = photoData.filter(p => 
    PHOTO_STEPS.some(s => s.id === p.stepId)
  ).length;
  const additionalPhotos = photoData.filter(p => p.stepId.startsWith('additional-'));

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const file = files[0];
    
    if (captureMode === 'guided') {
      const step = PHOTO_STEPS[currentStep];
      const newPhotoData: PhotoData = {
        file,
        stepId: step.id,
        label: step.title,
      };

      // Replace or add photo for current step
      const existingIndex = photoData.findIndex(p => p.stepId === step.id);
      let updatedPhotoData: PhotoData[];
      
      if (existingIndex >= 0) {
        updatedPhotoData = [...photoData];
        updatedPhotoData[existingIndex] = newPhotoData;
      } else {
        updatedPhotoData = [...photoData, newPhotoData];
      }

      setPhotoData(updatedPhotoData);
      syncPhotos(updatedPhotoData);

      // Auto-advance to next step if not on last required step
      if (currentStep < totalRequiredSteps - 1) {
        setTimeout(() => setCurrentStep(currentStep + 1), 300);
      } else if (currentStep === totalRequiredSteps - 1) {
        // After last required step, switch to additional mode
        setTimeout(() => setCaptureMode('additional'), 300);
      }
    } else {
      // Additional photo mode
      const additionalCount = photoData.filter(p => p.stepId.startsWith('additional-')).length;
      if (additionalCount >= OPTIONAL_PHOTO_SLOTS) return;

      const newPhotoData: PhotoData = {
        file,
        stepId: `additional-${additionalCount + 1}`,
        label: `Issue Close-up ${additionalCount + 1}`,
      };

      const updatedPhotoData = [...photoData, newPhotoData];
      setPhotoData(updatedPhotoData);
      syncPhotos(updatedPhotoData);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const syncPhotos = (data: PhotoData[]) => {
    // Maintain order: required photos first (in step order), then additional photos
    const orderedPhotos: File[] = [];
    
    // Add required photos in order
    PHOTO_STEPS.forEach(step => {
      const photo = data.find(p => p.stepId === step.id);
      if (photo) orderedPhotos.push(photo.file);
    });
    
    // Add additional photos
    data
      .filter(p => p.stepId.startsWith('additional-'))
      .sort((a, b) => a.stepId.localeCompare(b.stepId))
      .forEach(p => orderedPhotos.push(p.file));

    onPhotosChange(orderedPhotos);
  };

  const removePhoto = (stepId: string) => {
    const updatedPhotoData = photoData.filter(p => p.stepId !== stepId);
    setPhotoData(updatedPhotoData);
    syncPhotos(updatedPhotoData);

    // If removing a required photo, go back to guided mode and that step
    const stepIndex = PHOTO_STEPS.findIndex(s => s.id === stepId);
    if (stepIndex >= 0) {
      setCaptureMode('guided');
      setCurrentStep(stepIndex);
    }
  };

  const openCamera = () => {
    fileInputRef.current?.click();
  };

  const getPhotoForStep = (stepId: string) => {
    return photoData.find(p => p.stepId === stepId);
  };

  const canProceedToAdditional = completedRequiredSteps === totalRequiredSteps;

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">
            {captureMode === 'guided' 
              ? `Step ${currentStep + 1} of ${totalRequiredSteps}: ${PHOTO_STEPS[currentStep].title}`
              : 'Additional Photos (Optional)'
            }
          </span>
          <span className="text-muted-foreground">
            {completedRequiredSteps}/{totalRequiredSteps} required
          </span>
        </div>
        <div className="flex gap-1">
          {PHOTO_STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => {
                setCaptureMode('guided');
                setCurrentStep(index);
              }}
              className={cn(
                "h-2 flex-1 rounded-full transition-all",
                getPhotoForStep(step.id)
                  ? "bg-primary"
                  : index === currentStep && captureMode === 'guided'
                  ? "bg-primary/40"
                  : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      {/* Capture Mode Toggle */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={captureMode === 'guided' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCaptureMode('guided')}
          className="flex-1"
        >
          Required Photos
        </Button>
        <Button
          type="button"
          variant={captureMode === 'additional' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCaptureMode('additional')}
          disabled={!canProceedToAdditional}
          className="flex-1"
        >
          Issue Close-ups ({additionalPhotos.length}/{OPTIONAL_PHOTO_SLOTS})
        </Button>
      </div>

      {/* Guided Capture View */}
      {captureMode === 'guided' && (
        <div className="space-y-4">
          {/* Current Step Card */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{PHOTO_STEPS[currentStep].icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {PHOTO_STEPS[currentStep].title}
                  {PHOTO_STEPS[currentStep].required && (
                    <span className="ml-2 text-xs text-destructive">Required</span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {PHOTO_STEPS[currentStep].instruction}
                </p>
                <p className="text-xs text-primary mt-2 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {PHOTO_STEPS[currentStep].tip}
                </p>
              </div>
            </div>

            {/* Photo Preview or Capture Button */}
            {getPhotoForStep(PHOTO_STEPS[currentStep].id) ? (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={URL.createObjectURL(getPhotoForStep(PHOTO_STEPS[currentStep].id)!.file)}
                  alt={PHOTO_STEPS[currentStep].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={openCamera}
                    className="gap-1"
                  >
                    <Camera className="h-3 w-3" />
                    Retake
                  </Button>
                  <button
                    type="button"
                    onClick={() => removePhoto(PHOTO_STEPS[currentStep].id)}
                    className="rounded-full bg-destructive p-1.5 text-destructive-foreground hover:bg-destructive/90 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Captured
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={openCamera}
                className="w-full aspect-video rounded-lg border-2 border-dashed border-primary/50 bg-primary/5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary hover:bg-primary/10 transition-all"
              >
                <div className="rounded-full bg-primary/20 p-4">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">
                  Tap to capture {PHOTO_STEPS[currentStep].title}
                </span>
              </button>
            )}
          </div>

          {/* Step Navigation */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (currentStep < totalRequiredSteps - 1) {
                  setCurrentStep(currentStep + 1);
                } else {
                  setCaptureMode('additional');
                }
              }}
              disabled={currentStep === totalRequiredSteps - 1 && !canProceedToAdditional}
              className="flex-1"
            >
              {currentStep < totalRequiredSteps - 1 ? 'Next' : 'Add Issue Photos'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Additional Photos View */}
      {captureMode === 'additional' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">🔍</span>
              <div>
                <h3 className="font-semibold text-foreground">Issue Close-ups</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Capture close-up photos of any stains, damage, wear, moth damage, or notable areas
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {additionalPhotos.map((photo, index) => (
                <div
                  key={photo.stepId}
                  className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                >
                  <img
                    src={URL.createObjectURL(photo.file)}
                    alt={photo.label}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.stepId)}
                    className="absolute top-2 right-2 rounded-full bg-destructive p-1.5 text-destructive-foreground hover:bg-destructive/90 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="absolute bottom-2 left-2 rounded-full bg-foreground/70 px-2 py-0.5 text-xs text-background">
                    Issue {index + 1}
                  </div>
                </div>
              ))}

              {additionalPhotos.length < OPTIONAL_PHOTO_SLOTS && (
                <button
                  type="button"
                  onClick={openCamera}
                  className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all"
                >
                  <Plus className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Add Issue</span>
                </button>
              )}
            </div>
          </div>

          {additionalPhotos.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No issues to document? You can skip this step.
            </p>
          )}
        </div>
      )}

      {/* Photo Summary Grid */}
      {photoData.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">
            All Photos ({photoData.length}/{maxPhotos})
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {PHOTO_STEPS.map((step, index) => {
              const photo = getPhotoForStep(step.id);
              return (
                <div
                  key={step.id}
                  onClick={() => {
                    setCaptureMode('guided');
                    setCurrentStep(index);
                  }}
                  className={cn(
                    "aspect-square rounded-lg overflow-hidden cursor-pointer transition-all",
                    photo 
                      ? "ring-2 ring-primary ring-offset-2" 
                      : "border-2 border-dashed border-muted-foreground/30 bg-muted/30"
                  )}
                >
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo.file)}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-lg opacity-50">{step.icon}</span>
                    </div>
                  )}
                </div>
              );
            })}
            {additionalPhotos.map((photo) => (
              <div
                key={photo.stepId}
                onClick={() => setCaptureMode('additional')}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer ring-2 ring-secondary ring-offset-2"
              >
                <img
                  src={URL.createObjectURL(photo.file)}
                  alt={photo.label}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidedPhotoCapture;
