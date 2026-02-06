// Minimal demo data for screenshot components on landing page

export interface DemoJob {
  id: string;
  job_number: string;
  client_name: string;
  status: 'active' | 'in-progress' | 'completed';
  rug_count: number;
  notes?: string;
}

export interface DemoRug {
  rug_number: string;
  rug_type: string;
  width: number;
  length: number;
}

export interface DemoService {
  name: string;
  price: number;
  isRequired?: boolean;
}

export interface DemoEstimate {
  rugNumber: string;
  rugType: string;
  dimensions: string;
  total: number;
  services: DemoService[];
}

export interface DemoAnalytics {
  totalJobs: number;
  totalRevenue: number;
  avgJobValue: number;
  completionRate: number;
  monthlyData: { month: string; revenue: number; jobs: number }[];
}

export const demoJobs: DemoJob[] = [
  { id: '1', job_number: 'JOB-2024-001', client_name: 'Katherine Morrison', status: 'active', rug_count: 3, notes: 'Persian collection' },
  { id: '2', job_number: 'JOB-2024-002', client_name: 'James Richardson', status: 'in-progress', rug_count: 2, notes: 'Antique restoration' },
  { id: '3', job_number: 'JOB-2024-003', client_name: 'Sarah Chen', status: 'completed', rug_count: 5 },
  { id: '4', job_number: 'JOB-2024-004', client_name: 'Michael Thompson', status: 'active', rug_count: 1, notes: 'Silk cleaning' },
  { id: '5', job_number: 'JOB-2024-005', client_name: 'Emily Watson', status: 'in-progress', rug_count: 4 },
];

export const demoRugs: DemoRug[] = [
  { rug_number: 'RUG-001', rug_type: 'Antique Persian Tabriz', width: 8, length: 10 },
  { rug_number: 'RUG-002', rug_type: 'Modern Turkish Oushak', width: 6, length: 9 },
  { rug_number: 'RUG-003', rug_type: 'Vintage Moroccan Berber', width: 5, length: 8 },
];

export const demoEstimates: DemoEstimate[] = [
  {
    rugNumber: 'RUG-001',
    rugType: 'Antique Persian Tabriz',
    dimensions: '8\' × 10\' (80 sq ft)',
    total: 1250,
    services: [
      { name: 'Deep Cleaning', price: 640, isRequired: true },
      { name: 'Fringe Repair', price: 180, isRequired: true },
      { name: 'Moth Treatment', price: 120 },
      { name: 'Deodorizing', price: 80 },
      { name: 'Stain Protection', price: 230 },
    ],
  },
  {
    rugNumber: 'RUG-002',
    rugType: 'Modern Turkish Oushak',
    dimensions: '6\' × 9\' (54 sq ft)',
    total: 890,
    services: [
      { name: 'Standard Cleaning', price: 432, isRequired: true },
      { name: 'Edge Binding', price: 150 },
      { name: 'Color Restoration', price: 180 },
      { name: 'Padding', price: 128 },
    ],
  },
  {
    rugNumber: 'RUG-003',
    rugType: 'Vintage Moroccan Berber',
    dimensions: '5\' × 8\' (40 sq ft)',
    total: 720,
    services: [
      { name: 'Deep Cleaning', price: 320, isRequired: true },
      { name: 'Fiber Repair', price: 200 },
      { name: 'Moth Prevention', price: 100 },
      { name: 'Storage Prep', price: 100 },
    ],
  },
];

export const demoAnalytics: DemoAnalytics = {
  totalJobs: 247,
  totalRevenue: 189500,
  avgJobValue: 767,
  completionRate: 94,
  monthlyData: [
    { month: 'Jan', revenue: 12400, jobs: 18 },
    { month: 'Feb', revenue: 14200, jobs: 21 },
    { month: 'Mar', revenue: 15800, jobs: 24 },
    { month: 'Apr', revenue: 13900, jobs: 19 },
    { month: 'May', revenue: 16500, jobs: 22 },
    { month: 'Jun', revenue: 18200, jobs: 26 },
    { month: 'Jul', revenue: 21400, jobs: 29 },
    { month: 'Aug', revenue: 19800, jobs: 27 },
    { month: 'Sep', revenue: 17600, jobs: 25 },
    { month: 'Oct', revenue: 15200, jobs: 20 },
    { month: 'Nov', revenue: 12800, jobs: 17 },
    { month: 'Dec', revenue: 11700, jobs: 15 },
  ],
};

export function calculateGrandTotal(estimates: DemoEstimate[]): number {
  return estimates.reduce((sum, e) => sum + e.total, 0);
}
