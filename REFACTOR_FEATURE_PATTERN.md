# Refactoring Guide: Feature-Based Folder Structure

This document outlines the design patterns, target architecture, and step-by-step process for refactoring the **CINEPRISM Frontend** codebase from a mixed folder structure to a standardized **Feature-Based Pattern**.

---

## 1. Core Philosophy of Feature-Based Architecture

In a feature-based folder structure (often referred to as Feature-Driven or Domain-Driven React Architecture), code is grouped by **business domain/feature** rather than by technical role (e.g., hooks, pages, components). 

### Key Benefits
* **High Cohesion**: All code related to a single business capability (e.g., Authentication, Subscription, Media Browsing) lives in one folder. If you change a feature, you work inside that folder.
* **Low Coupling**: Features communicate with each other through explicit public interfaces (via `index.ts` files acting as API boundaries), reducing spaghetti imports.
* **Scalability**: As the application grows, adding new features is as simple as adding a new feature folder, without cluttering global directories.
* **Developer Velocity**: Finding components, API hooks, queries, and state management for a specific feature is fast and intuitive.

---

## 2. Directory Structure Comparison

### Current Structure (Mixed Pattern)
At present, the project has a partially implemented `features/` directory but retains separate global folders for pages, hooks, Redux/Zustand stores, UI components, and React Query queries, leading to scattering of related logic:

```
src/
├── app/
│   ├── api/
│   │   └── axios.ts
│   ├── pages/            <-- Contains pages from all features mixed together
│   │   ├── AuthCard.tsx
│   │   ├── GenrsPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── MediaDetailsPage.tsx
│   │   ├── MediaPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── UserListPage.tsx
│   │   └── VIPPurchasePage.tsx
│   ├── routes/
│   │   └── ProtectedRoute.tsx
│   └── store/
│       ├── themeStore .ts
│       └── useAuthStore.ts
├── components/          <-- Global components directory (some feature-specific)
│   ├── auth/            <-- Auth-specific components
│   ├── layout/          <-- App shell layouts
│   ├── shared/          <-- General helpers
│   └── ui/              <-- UI controls (some feature-specific like VipCard.tsx)
├── features/
│   └── media/           <-- Partial media feature implementation
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── utils/
├── hooks/               <-- Global hooks (some feature-specific)
│   ├── subscription/    <-- Subscription-specific hooks
│   └── usePurchaseBroadcast.ts
├── queries/
│   └── mediaQueries.ts  <-- Mixed media queries and user list queries
├── shared/              <-- Duplicate shared layout assets and components
│   └── ui/
│       ├── components/media/Hero.tsx, Spotlight.tsx
│       └── media/Spotlight.tsx
└── App.tsx
```

### Proposed Structure (Standardized Feature-Based)
In the new architecture, we organize all code under two primary zones:
1. **`src/features/`**: Sub-folders grouped by domain. Each folder contains its own api hooks, pages, components, hooks, and types.
2. **`src/shared/`**: Global reusable items (common UI components, app layout, configuration, global state) that do not belong to a single feature.

```
src/
├── app/                      <-- Global App Shell & Entry Configurations
│   ├── api/
│   │   └── axios.ts          # Global axios client
│   ├── providers/
│   │   └── QueryProvider.tsx # TanStack Query configuration
│   ├── routes/
│   │   ├── AppRoutes.tsx     # Router configuration
│   │   └── ProtectedRoute.tsx# Route guard
│   └── store/
│       └── themeStore.ts     # Global UI/Theme state (fixed typo name)
│
├── features/                 <-- Business Domains
│   │
│   ├── auth/                 <-- Authentication Feature
│   │   ├── api/              # Auth API calls (login, register, verify-code)
│   │   ├── components/       # Auth components (OTPInput, OTPModal, AuthLayout)
│   │   ├── pages/            # Auth pages (LoginPage, RegisterPage, AuthCard)
│   │   ├── store/            # useAuthStore (Zustand auth state)
│   │   ├── types/            # User, AuthState declarations
│   │   └── index.ts          # Public exports
│   │
│   ├── media/                <-- Media / Browse / Search Feature
│   │   ├── api/              # Popular, trending, search, genres, media details queries
│   │   ├── components/       # MovieCard, MovieRow, Hero, Spotlight, InfiniteGrid, skeletons
│   │   ├── pages/            # HomePage, MediaDetailsPage, MediaPage, GenresPage, SearchPage
│   │   ├── types/            # Movie, TV, Genre, Media types
│   │   ├── utils/            # getImageUrl, useMediaNavigation
│   │   └── index.ts          # Public exports
│   │
│   ├── subscription/         <-- Billing & VIP Membership Feature
│   │   ├── api/              # useGetPlans, useGetPayments, useCreatePurchase
│   │   ├── components/       # VipCard
│   │   ├── hooks/            # usePurchaseBroadcast
│   │   ├── pages/            # VIPPurchasePage
│   │   └── index.ts          # Public exports
│   │
│   └── user/                 <-- User Lists, Watchlist, Profile Feature
│       ├── api/              # Watchlist, favorites, recents (useGetLists, useAddToLists, etc.)
│       ├── pages/            # ProfilePage, UserListPage
│       └── index.ts          # Public exports
│
├── shared/                   <-- Global Shared Infrastructure
│   ├── components/           # UI elements (Alert, BackButton, ScrollToTop, Spinner, Logo)
│   ├── layout/               # MainLayout, Sidebar, Navbar, BottomNav, MobileHeader
│   └── pages/                # Generic/Utility pages
│       ├── LandingPage.tsx   # Marketing landing page
│       └── NotFoundPage.tsx  # Fallback 404 page
│
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

---

## 3. Step-by-Step Refactoring Process

Follow these steps sequentially to move the codebase to the target architecture safely.

### Step 1: Initialize New Feature Folders
Create the necessary feature folders to support the division of labor:
* `src/features/auth/` (with `api`, `components`, `pages`, `store`, `types`)
* `src/features/subscription/` (with `api`, `components`, `hooks`, `pages`)
* `src/features/user/` (with `api`, `pages`)
* Create `src/shared/components/` and `src/shared/layout/` structures.

### Step 2: Migrate Shared Resources
Consolidate layout and generic UI elements into the global `src/shared` directory to clear out `src/components`:
1. Move `src/components/layout/*` to `src/shared/layout/`.
2. Move `src/components/shared/*` to `src/shared/components/`.
3. Move `src/components/ui/Alert.tsx` to `src/shared/components/Alert.tsx`.
4. Move `src/components/layout/ThemeToggle.tsx` and `src/components/layout/Logo.tsx` to `src/shared/components/` as they are general UI blocks used within the layout.
5. Move `src/app/pages/LandingPage.tsx` and `src/app/pages/NotFoundPage.tsx` to `src/shared/pages/` (or keep them directly in a unified routes system, but classified as shared pages).
6. Resolve duplicates under `src/shared/ui/`:
   * Clean up the redundant directories and merge `Hero.tsx` and `Spotlight.tsx` into `src/features/media/components/`.

### Step 3: Refactor the `auth` Feature
Gather auth-related scripts and pages in `src/features/auth`:
1. **Types**: Create `src/features/auth/types/index.ts` containing the `User` and `AuthState` interface definitions.
2. **Store**: Move `src/app/store/useAuthStore.ts` to `src/features/auth/store/useAuthStore.ts`.
3. **Components**: Move `src/components/auth/AuthLayout.tsx`, `OTPInput.tsx`, and `OTPModal.tsx` to `src/features/auth/components/`.
4. **Pages**: Move `src/app/pages/LoginPage.tsx`, `RegisterPage.tsx`, and `AuthCard.tsx` to `src/features/auth/pages/`.
5. **Entrypoint**: Create `src/features/auth/index.ts` to expose essential elements:
   ```typescript
   export { default as LoginPage } from './pages/LoginPage';
   export { default as RegisterPage } from './pages/RegisterPage';
   export { default as AuthCard } from './pages/AuthCard';
   export { useAuthStore } from './store/useAuthStore';
   export type { User } from './types';
   ```

### Step 4: Refactor the `media` Feature
Consolidate the rest of the media services and components:
1. **Query Migration**: Split queries inside `src/queries/mediaQueries.ts`.
   * Move the media-specific hooks (`useSearch`, `useGenres`, `useMediaDetails`) into `src/features/media/api/mediaQueries.ts` (or individual files in `src/features/media/api/`).
2. **Pages**: Move media-related pages from `src/app/pages/` to `src/features/media/pages/`:
   * `HomePage.tsx`
   * `MediaDetailsPage.tsx` (renamed from `Details` imports for clarity)
   * `MediaPage.tsx`
   * `GenrsPage.tsx` (suggest renaming to `GenresPage.tsx`)
   * `SearchPage.tsx`
3. **Components**: Incorporate the duplicate/legacy media layout assets (like `Hero.tsx` and `Spotlight.tsx` from `src/shared/ui/`) directly into `src/features/media/components/`.
4. **Entrypoint**: Create `src/features/media/index.ts`:
   ```typescript
   export { default as HomePage } from './pages/HomePage';
   export { default as MediaDetailsPage } from './pages/MediaDetailsPage';
   export { default as MediaPage } from './pages/MediaPage';
   export { default as GenresPage } from './pages/GenrsPage';
   export { default as SearchPage } from './pages/SearchPage';
   ```

### Step 5: Refactor the `subscription` Feature
Isolate payment and membership tools:
1. **API/Hooks**: Move `src/hooks/subscription/*` (`useGetPayments.ts`, `useGetPlans.ts`, `usePurchase.ts`) to `src/features/subscription/api/`.
2. **Hooks**: Move `src/hooks/usePurchaseBroadcast.ts` to `src/features/subscription/hooks/usePurchaseBroadcast.ts`.
3. **Components**: Move `src/components/ui/VipCard.tsx` to `src/features/subscription/components/VipCard.tsx`.
4. **Pages**: Move `src/app/pages/VIPPurchasePage.tsx` to `src/features/subscription/pages/VIPPurchasePage.tsx`.
5. **Entrypoint**: Create `src/features/subscription/index.ts`:
   ```typescript
   export { default as VIPPurchasePage } from './pages/VIPPurchasePage';
   export { usePurchaseBroadcast } from './hooks/usePurchaseBroadcast';
   ```

### Step 6: Refactor the `user` Feature
Gather personal lists and profiles:
1. **API/Queries**: Move the user list queries (`useGetLists`, `useAddToLists`, `useRemoveFromLists`) from `src/queries/mediaQueries.ts` into `src/features/user/api/listQueries.ts`.
2. **Pages**: Move `src/app/pages/ProfilePage.tsx` and `src/app/pages/UserListPage.tsx` to `src/features/user/pages/`.
3. **Entrypoint**: Create `src/features/user/index.ts`:
   ```typescript
   export { default as ProfilePage } from './pages/ProfilePage';
   export { default as UserListPage } from './pages/UserListPage';
   export { useGetLists, useAddToLists, useRemoveFromLists } from './api/listQueries';
   ```

### Step 7: Update Routing, Imports, and Clean Up
1. **Theme Store Fix**: Rename `src/app/store/themeStore .ts` to `src/app/store/themeStore.ts` (removing the accidental space in the filename) and update imports.
2. **App.tsx Routing**: Update all routes to import directly from feature gateways (`index.ts` files):
   ```typescript
   import { LoginPage, RegisterPage, AuthCard } from './features/auth';
   import { HomePage, MediaPage, GenresPage, SearchPage, MediaDetailsPage } from './features/media';
   import { VIPPurchasePage } from './features/subscription';
   import { ProfilePage, UserListPage } from './features/user';
   import MainLayout from './shared/layout/MainLayout';
   import LandingPage from './shared/pages/LandingPage';
   import NotFoundPage from './shared/pages/NotFoundPage';
   ```
3. **Delete Empty Directories**: Remove the old global folders `src/queries/`, `src/components/`, `src/hooks/`, and empty folders within `src/app/pages/`.

---

## 4. File Relocation Mapping Table

The following table details the path transformations for every file in the refactoring process:

| Original Path | Target Path | Notes |
| :--- | :--- | :--- |
| **Authentication Feature** | | |
| `src/app/store/useAuthStore.ts` | `src/features/auth/store/useAuthStore.ts` | Handles Zustand auth state |
| `src/components/auth/AuthLayout.tsx` | `src/features/auth/components/AuthLayout.tsx` | UI Shell wrapper for auth cards |
| `src/components/auth/OTPInput.tsx` | `src/features/auth/components/OTPInput.tsx` | Code input fields |
| `src/components/auth/OTPModal.tsx` | `src/features/auth/components/OTPModal.tsx` | OTP verification modal |
| `src/app/pages/LoginPage.tsx` | `src/features/auth/pages/LoginPage.tsx` | Sign-in page |
| `src/app/pages/RegisterPage.tsx` | `src/features/auth/pages/RegisterPage.tsx` | Sign-up page |
| `src/app/pages/AuthCard.tsx` | `src/features/auth/pages/AuthCard.tsx` | Alternate auth route / flow card |
| **Media Feature** | | |
| `src/queries/mediaQueries.ts` (subset) | `src/features/media/api/mediaQueries.ts` | `useSearch`, `useGenres`, `useMediaDetails` |
| `src/app/pages/HomePage.tsx` | `src/features/media/pages/HomePage.tsx` | Main browse portal |
| `src/app/pages/MediaDetailsPage.tsx` | `src/features/media/pages/MediaDetailsPage.tsx` | Detailed view of movies/shows |
| `src/app/pages/MediaPage.tsx` | `src/features/media/pages/MediaPage.tsx` | Media listings page |
| `src/app/pages/GenrsPage.tsx` | `src/features/media/pages/GenrsPage.tsx` | Genre browse page (recommend renaming to `GenresPage.tsx`) |
| `src/app/pages/SearchPage.tsx` | `src/features/media/pages/SearchPage.tsx` | Dedicated search experience |
| `src/shared/ui/components/media/Hero.tsx` | `src/features/media/components/Hero.tsx` | Promo billboard hero |
| `src/shared/ui/components/media/Spotlight.tsx` | `src/features/media/components/Spotlight.tsx` | Spotlight row slider component |
| **Subscription Feature** | | |
| `src/hooks/subscription/useGetPayments.ts`| `src/features/subscription/api/useGetPayments.ts` | React Query for payment providers |
| `src/hooks/subscription/useGetPlans.ts` | `src/features/subscription/api/useGetPlans.ts` | React Query for VIP tier list |
| `src/hooks/subscription/usePurchase.ts` | `src/features/subscription/api/usePurchase.ts` | React Query mutation for slips |
| `src/hooks/usePurchaseBroadcast.ts` | `src/features/subscription/hooks/usePurchaseBroadcast.ts`| Real-time Echo broadcast listener |
| `src/components/ui/VipCard.tsx` | `src/features/subscription/components/VipCard.tsx`| VIP features card display |
| `src/app/pages/VIPPurchasePage.tsx` | `src/features/subscription/pages/VIPPurchasePage.tsx` | Slip purchase upload portal |
| **User/Lists Feature** | | |
| `src/queries/mediaQueries.ts` (subset) | `src/features/user/api/listQueries.ts` | `useGetLists`, `useAddToLists`, `useRemoveFromLists` |
| `src/app/pages/ProfilePage.tsx` | `src/features/user/pages/ProfilePage.tsx` | User profile, session, and info |
| `src/app/pages/UserListPage.tsx` | `src/features/user/pages/UserListPage.tsx` | Lists browser (Watchlist, Favorites) |
| **Shared Shell & UI Infrastructure** | | |
| `src/components/layout/BottomNav.tsx` | `src/shared/layout/BottomNav.tsx` | Mobile navigation footer |
| `src/components/layout/Sidebar.tsx` | `src/shared/layout/Sidebar.tsx` | Desktop side navigation pane |
| `src/components/layout/MobileHeader.tsx` | `src/shared/layout/MobileHeader.tsx` | Mobile header bar |
| `src/components/layout/Navbar.tsx` | `src/shared/layout/Navbar.tsx` | Top desktop navbar |
| `src/components/layout/MainLayout.tsx` | `src/shared/layout/MainLayout.tsx` | Root shell dashboard layout |
| `src/components/layout/Logo.tsx` | `src/shared/components/Logo.tsx` | Brand identity logo SVG |
| `src/components/layout/ThemeToggle.tsx` | `src/shared/components/ThemeToggle.tsx` | Light/dark mode toggle button |
| `src/components/shared/BackButton.tsx` | `src/shared/components/BackButton.tsx` | Standardized back navigation |
| `src/components/shared/ScrollToTop.tsx` | `src/shared/components/ScrollToTop.tsx` | Router viewport reset listener |
| `src/components/shared/Spinner.tsx` | `src/shared/components/Spinner.tsx` | Loading screen indicator |
| `src/components/ui/Alert.tsx` | `src/shared/components/Alert.tsx` | Notification / error banner |
| `src/app/pages/LandingPage.tsx` | `src/shared/pages/LandingPage.tsx` | General public entry page |
| `src/app/pages/NotFoundPage.tsx` | `src/shared/pages/NotFoundPage.tsx` | 404 Route placeholder page |
| `src/app/store/themeStore .ts` | `src/app/store/themeStore.ts` | Global layout store (fixed space typo in filename) |

---

## 5. Architectural Principles for Feature Boundaries

To maintain this directory layout, developers should follow these coding conventions:

1. **Strict Feature Isolation (Encapsulation)**:
   * A component in `features/auth/` should **never** import directly from internal modules of `features/media/` (e.g., `import { MovieCard } from '../media/components/MovieCard'`).
   * If an item is needed outside its feature, it must be exported from the feature's `index.ts` file, and imported from the feature boundary (e.g., `import { MovieCard } from '@/features/media'`).

2. **When to Move Code to `shared/`**:
   * If a component, hook, or utility is used across **three or more features** and does not represent a specific business domain, it belongs in `src/shared/`.
   * Examples: `Alert`, generic custom inputs, theme status hooks, local storage wrappers.

3. **No Direct Inter-Feature Database/API Queries**:
   * If feature A requires data controlled by feature B, it should utilize queries or hooks exported from feature B's public boundary, rather than rewriting Axios/Query instances pointing to the other domain's backend endpoints.
