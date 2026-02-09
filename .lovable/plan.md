
# Social Media Content Manager - Implementation Plan

## Overview
Add a dedicated section within the existing Blog Admin panel to create, edit, store, and manage social media marketing posts. This will use the same localStorage persistence pattern as the blog system for standalone compatibility, and leverage the existing admin authentication flow.

## Architecture Decision

**Option chosen: Add tabs to existing BlogAdmin page**

Rather than creating a separate page and route, we'll add a tabbed interface to the existing `/blog-admin` page. This approach:
- Keeps all content management in one place
- Reuses the existing authentication and admin role check
- Maintains a cleaner URL structure
- Reduces code duplication

## Data Model

```text
SocialPost {
  id: string              // Unique identifier
  platform: string        // twitter, linkedin, instagram, facebook, tiktok
  content: string         // Post text content
  mediaUrl?: string       // Optional image/video URL
  hashtags: string[]      // Array of hashtags
  scheduledFor?: string   // Optional scheduled date/time
  status: string          // draft, scheduled, published
  createdAt: string       // Creation timestamp
  updatedAt: string       // Last update timestamp
  notes?: string          // Internal notes (not for posting)
}
```

## UI Components

### 1. Tab Navigation
Convert the BlogAdmin page to use Radix Tabs:
- **Blog Posts** tab (existing functionality)
- **Social Content** tab (new functionality)

### 2. Social Content List View
- Cards showing each post with platform icon, preview text, status badge, and scheduled date
- Filter by platform (All, Twitter, LinkedIn, Instagram, etc.)
- Filter by status (All, Draft, Scheduled, Published)
- Quick actions: Edit, Duplicate, Delete

### 3. Social Post Editor
- Platform selector dropdown
- Content textarea with character count (platform-specific limits)
- Hashtag input field
- Media URL input with preview
- Schedule date/time picker
- Status toggle (Draft/Scheduled/Published)
- Internal notes field
- Save and Cancel buttons

### 4. Platform-Specific Features
Character limits displayed:
- Twitter/X: 280 characters
- LinkedIn: 3,000 characters  
- Instagram: 2,200 characters
- Facebook: 63,206 characters
- TikTok: 2,200 characters

## File Changes

### New Files
1. **`src/lib/socialPosts.ts`**
   - Type definitions for SocialPost
   - localStorage getter/setter functions
   - Default sample posts

2. **`src/components/admin/SocialPostEditor.tsx`**
   - Form component for creating/editing social posts
   - Platform selector, content input, media preview
   - Character counter with platform-specific limits

3. **`src/components/admin/SocialPostCard.tsx`**
   - Card component for displaying a social post in the list
   - Platform icon, content preview, status badge, action buttons

4. **`src/components/admin/SocialContentTab.tsx`**
   - Main container component for the social content section
   - List of posts with filters, editor modal/section

### Modified Files
1. **`src/pages/BlogAdmin.tsx`**
   - Wrap existing content in Tabs component
   - Add Social Content tab that renders SocialContentTab
   - Keep all existing blog functionality intact

## Technical Details

### localStorage Keys
- Existing: `rugboost_blog_posts`
- New: `rugboost_social_posts`

### Platform Icons
Using lucide-react icons:
- Twitter: `Twitter` or custom X icon
- LinkedIn: `Linkedin`
- Instagram: `Instagram`
- Facebook: `Facebook`
- TikTok: Custom or generic `Video`

### Status Badges
- Draft: Gray badge
- Scheduled: Yellow/amber badge with clock icon
- Published: Green badge with check icon

## Implementation Steps

1. Create `src/lib/socialPosts.ts` with types and localStorage utilities
2. Create `SocialPostCard.tsx` component for displaying posts
3. Create `SocialPostEditor.tsx` component for the post form
4. Create `SocialContentTab.tsx` to orchestrate the social content section
5. Update `BlogAdmin.tsx` to add tabs and integrate social content
6. Add sample posts to demonstrate functionality

## Sample Data

Three pre-populated sample posts will be included:
1. A Twitter post about AI-powered inspections
2. A LinkedIn thought leadership post
3. An Instagram post with hashtags

This gives users immediate examples of how to structure their content.
