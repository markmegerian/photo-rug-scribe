export type SocialPlatform = 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'tiktok';
export type SocialPostStatus = 'draft' | 'scheduled' | 'published';

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  content: string;
  mediaUrl?: string;
  hashtags: string[];
  scheduledFor?: string;
  status: SocialPostStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export const PLATFORM_LIMITS: Record<SocialPlatform, number> = {
  twitter: 280,
  linkedin: 3000,
  instagram: 2200,
  facebook: 63206,
  tiktok: 2200,
};

export const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  twitter: 'Twitter / X',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
};

const STORAGE_KEY = 'rugboost_social_posts';

const defaultPosts: SocialPost[] = [
  {
    id: 'sample-1',
    platform: 'twitter',
    content: 'AI-powered rug inspections in under 60 seconds. No more manual damage documentation or missed details. See how RugBoost is transforming the cleaning industry.',
    hashtags: ['RugCleaning', 'AI', 'BusinessAutomation'],
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: 'Good for product launch announcement',
  },
  {
    id: 'sample-2',
    platform: 'linkedin',
    content: 'The rug care industry is undergoing a digital transformation.\n\nFor decades, professionals have relied on paper forms and manual inspections. But that approach doesn\'t scale—and it introduces human error.\n\nAt RugBoost, we\'re building AI-powered tools that help cleaning businesses:\n• Document damage with photo evidence\n• Generate instant repair estimates\n• Provide transparent client portals\n\nThe result? 94% faster estimates and happier customers.\n\nIs your business ready for the shift?',
    hashtags: ['DigitalTransformation', 'SmallBusiness', 'RugCleaning', 'AI'],
    status: 'scheduled',
    scheduledFor: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: 'Thought leadership piece for B2B audience',
  },
  {
    id: 'sample-3',
    platform: 'instagram',
    content: 'From inspection to estimate in seconds—not hours. Our AI sees what others miss. Swipe to see the difference.',
    mediaUrl: '',
    hashtags: ['RugCleaning', 'CleaningBusiness', 'BeforeAndAfter', 'AITechnology', 'SmallBusinessTools'],
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: 'Needs carousel images showing app screenshots',
  },
];

export function getSocialPosts(): SocialPost[] {
  if (typeof window === 'undefined') return defaultPosts;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
    return defaultPosts;
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return defaultPosts;
  }
}

export function saveSocialPosts(posts: SocialPost[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function generatePostId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
