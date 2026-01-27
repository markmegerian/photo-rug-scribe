-- Create AI feedback table for learning from staff corrections
CREATE TABLE ai_analysis_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  inspection_id UUID REFERENCES inspections(id) ON DELETE SET NULL,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN (
    'service_correction',
    'price_correction', 
    'missed_issue',
    'false_positive',
    'identification_error'
  )),
  
  -- Original AI output
  original_service_name TEXT,
  original_price NUMERIC,
  original_rug_identification TEXT,
  
  -- Corrected values
  corrected_service_name TEXT,
  corrected_price NUMERIC,
  corrected_identification TEXT,
  
  -- Context
  notes TEXT,
  rug_type TEXT,
  rug_origin TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_analysis_feedback ENABLE ROW LEVEL SECURITY;

-- Staff can manage their own feedback
CREATE POLICY "Users can manage their own feedback" 
  ON ai_analysis_feedback 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index for efficient lookups
CREATE INDEX idx_ai_analysis_feedback_user_id ON ai_analysis_feedback(user_id);
CREATE INDEX idx_ai_analysis_feedback_created_at ON ai_analysis_feedback(created_at DESC);