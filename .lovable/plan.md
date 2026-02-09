
# Feature Comparison Table for Pricing Section

## Overview
Add a comprehensive feature comparison table below the pricing cards that clearly shows which features are included in each tier. This helps users quickly compare plans and make informed decisions.

## Implementation Details

### 1. Create Comparison Data Structure
Define a comprehensive list of all features across tiers with clear availability indicators:

**Feature Categories:**
- **Core Features**: Workflow management, Client portal, Online payments, Professional estimates
- **Team & Collaboration**: Staff users (1, up to 5, unlimited)
- **Operations**: Operations checklist, AR damage documentation, Workflow automation
- **Analytics & Growth**: Analytics dashboard, Upsell recommendations, Customer retention tools
- **Integrations**: Custom integrations
- **Support**: Email support, Priority support, Dedicated account manager
- **Admin**: Admin controls (role-based permissions, multi-location)

### 2. Table Design
- Responsive layout: Full table on desktop, collapsible accordion or scrollable on mobile
- Clear visual indicators: Checkmarks for included, dashes or X for not included, text for specific limits
- Highlighted "Growth" column to match the "Most Popular" badge
- Sticky header row with plan names and prices for easy reference while scrolling

### 3. UI Components Used
- Existing `Table` components from `@/components/ui/table`
- `Check` and `Minus` icons from Lucide for availability indicators
- Scroll animation hooks for smooth reveal
- TooltipProvider for feature explanations

### 4. Visual Styling
- Alternating row backgrounds for readability
- Primary color highlighting for the Growth (Most Popular) column
- Subtle borders and spacing consistent with existing design
- "Compare all features" toggle button to show/hide the table

---

## Technical Implementation

### File to Modify
`src/components/landing/LandingPricing.tsx`

### Changes
1. Add `comparisonFeatures` data array with feature categories and tier availability
2. Add a "Compare all features" toggle button below the pricing cards
3. Add the comparison table component that renders conditionally
4. Use `useState` for show/hide toggle
5. Import Table components and Minus icon

### Comparison Table Structure

```text
+------------------+-----------+-----------+-----------+
| Feature          | Starter   | Growth    | Pro       |
+------------------+-----------+-----------+-----------+
| CORE FEATURES                                        |
+------------------+-----------+-----------+-----------+
| Workflow mgmt    |    [check]    |    [check]    |    [check]    |
| Client portal    |    [check]    |    [check]    |    [check]    |
| Online payments  |    [check]    |    [check]    |    [check]    |
| Pro estimates    |    [check]    |    [check]    |    [check]    |
+------------------+-----------+-----------+-----------+
| TEAM & USERS                                         |
+------------------+-----------+-----------+-----------+
| Staff users      |     1     |  Up to 5  | Unlimited |
+------------------+-----------+-----------+-----------+
| OPERATIONS                                           |
+------------------+-----------+-----------+-----------+
| Ops checklist    |     -     |    [check]    |    [check]    |
| AR documentation |     -     |    [check]    |    [check]    |
| Workflow auto    |     -     |     -     |    [check]    |
+------------------+-----------+-----------+-----------+
| ANALYTICS                                            |
+------------------+-----------+-----------+-----------+
| Dashboard        |     -     |    [check]    |    [check]    |
| AI upsells       |     -     |    [check]    |    [check]    |
| Retention tools  |     -     |     -     |    [check]    |
+------------------+-----------+-----------+-----------+
| SUPPORT                                              |
+------------------+-----------+-----------+-----------+
| Email support    |    [check]    |    [check]    |    [check]    |
| Priority support |     -     |    [check]    |    [check]    |
| Account manager  |     -     |     -     |    [check]    |
+------------------+-----------+-----------+-----------+
| ADMIN & INTEGRATIONS                                 |
+------------------+-----------+-----------+-----------+
| Admin controls   |     -     |     -     |    [check]    |
| Custom integrations|   -     |     -     |    [check]    |
+------------------+-----------+-----------+-----------+
```

### Mobile Responsiveness
- On mobile, the table will be horizontally scrollable within a container
- Feature names column stays sticky on the left for reference
- Clear visual cues that the table is scrollable
