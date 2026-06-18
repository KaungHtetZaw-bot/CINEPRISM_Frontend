# Codebase Architecture: Feature-Based Folder Structure

This document outlines the design patterns, directory architecture, and coding conventions for the **CINEPRISM Frontend** codebase, which has been refactored and standardized into a **Feature-Based Pattern**.

---

## 1. Core Philosophy of Feature-Based Architecture

In this architecture (often referred to as Feature-Driven React Architecture), code is grouped by **business domain/feature** rather than by technical role (e.g., hooks, pages, components).

### Key Benefits
* **High Cohesion**: All code related to a single business capability (e.g., Authentication, Subscription, Media Browsing) lives in one folder. If you change a feature, you work inside that folder.
* **Low Coupling**: Features are isolated from each other. Communication across features is limited, and shared logic is explicitly placed in the `shared/` directory, reducing spaghetti code.
* **Scalability**: As the application grows, adding new features is as simple as adding a new feature folder under `src/features/`, without cluttering global directories.
* **Developer Velocity**: Finding components, API hooks, queries, and state management for a specific feature is fast and intuitive.

---

## 2. Directory Structure

The codebase is organized into three primary structural zones:
1. **`src/app/`**: Global App Shell configurations, core routing guards, and the primary HTTP client.
2. **`src/features/`**: Business domains. Each subdirectory represents a self-contained feature module containing its own pages, components, hooks, stores, and types.
3. **`src/shared/`**: Global infrastructure and UI blocks (layout wrapper, navbar, sidebar, buttons, alerts, landing/404 pages) that do not belong to a single feature.

Below is the complete, current file layout:

```
src/
├── app/                              # Global App Shell & Entry Configurations
│   ├── api/
│   │   └── axios.ts                  # Axios client configured with baseURL and interceptors
│   ├── routes/
│   │   └── ProtectedRoute.tsx        # Router guard checking for auth tokens
│   └── store/
│       └── themeStore.ts             # Global layout & theme state (Zustand)
│
├── features/                         # Business Domains
│   │
│   ├── auth/                         # Authentication & Account Access
│   │   ├── api/                      # (Placeholder for auth-specific api handlers)
│   │   ├── components/               # Auth components (AuthLayout, OTPModal, OTPInput)
│   │   ├── pages/                    # Auth pages (LoginPage, RegisterPage, AuthCard)
│   │   ├── store/                    # useAuthStore.ts (Zustand auth state & api client logic)
│   │   └── types/
│   │       └── index.ts              # Common types (User interface definition)
│   │
│   ├── media/                        # Media Browsing, Genre lists, Detail views, and Search
│   │   ├── api/
│   │   │   └── mediaQueries.ts       # React Query hooks (useSearch, useGenres, useMediaDetails, etc.)
│   │   ├── components/               # Media display and rows
│   │   │   ├── skeleton/             # Loading skeleton components (MovieSkeleton, MovieDetailSkeleton, SpotlightSkeleton)
│   │   │   ├── Hero.tsx              # Large media billboard banner
│   │   │   ├── MovieCard.tsx         # Media poster thumbnail card
│   │   │   ├── MovieRow.tsx          # Row slider of movie cards
│   │   │   ├── Spotlight.tsx         # Featured slider carousel
│   │   │   ├── MovieGrid.tsx         # Flex/grid layout for movies
│   │   │   └── InfiniteGrid.tsx      # Infinite scrolling media grid
│   │   ├── pages/
│   │   │   ├── HomePage.tsx          # Main "/browse" hub
│   │   │   ├── MediaDetailsPage.tsx  # Detailed view ("/details/:type/:id")
│   │   │   ├── MediaPage.tsx         # Paginated category overview ("/media/:type")
│   │   │   ├── GenrsPage.tsx         # Genre filtering ("media/genres/movie")
│   │   │   └── SearchPage.tsx        # Search interface ("/search")
│   │   ├── types/
│   │   │   └── media.type.ts         # TypeScript types for Movie, TV series, etc.
│   │   └── utils/
│   │       ├── getImageUrl.ts        # Helper converting paths to TMDB image URLs
│   │       └── useMediaNavigation.ts # Custom navigation utility for media routes
│   │
│   ├── subscription/                 # VIP Membership & Billing
│   │   ├── api/
│   │   │   ├── useGetPayments.ts     # React Query hooks fetching payments
│   │   │   ├── useGetPlans.ts        # React Query hooks fetching membership plans
│   │   │   └── usePurchase.ts        # React Query mutation hook for submitting slips
│   │   ├── components/
│   │   │   └── VipCard.tsx           # VIP tier pricing display
│   │   ├── hooks/
│   │   │   └── usePurchaseBroadcast.ts # Echo broadcast listener hook for real-time slip approvals
│   │   ├── lib/
│   │   │   └── echo.ts               # Laravel Echo websocket config
│   │   └── pages/
│   │       └── VIPPurchasePage.tsx   # Payment slip submission page
│   │
│   └── user/                         # Profiles & Personal Watchlists
│       ├── api/
│       │   └── useListQueries.ts     # React Query hooks (useGetLists, useAddToLists, useRemoveFromLists)
│       └── pages/
│           ├── ProfilePage.tsx       # User profile edit & settings page ("/profile")
│           └── UserListPage.tsx      # Watchlists & Favorites view ("/mylist/:type")
│
├── shared/                           # Reusable UI & Core Shell
│   ├── components/                   # Generic elements
│   │   ├── Alert.tsx                 # Alert alerts and messages
│   │   ├── BackButton.tsx            # Navigation back helper
│   │   ├── Logo.tsx                  # CinePrism logo SVG
│   │   ├── ScrollToTop.tsx           # Router navigation window reset
│   │   ├── Spinner.tsx               # Simple CSS loader/spinner
│   │   └── ThemeToggle.tsx           # Color scheme toggle
│   │
│   ├── layout/                       # App frame and layout structures
│   │   ├── MainLayout.tsx            # Base page container with navigation elements
│   │   ├── Navbar.tsx                # Desktop top navigation header
│   │   ├── Sidebar.tsx               # Desktop sidebar panel
│   │   ├── MobileHeader.tsx          # Mobile header bar
│   │   └── BottomNav.tsx             # Mobile navigation footer
│   │
│   └── pages/                        # Non-feature page entrypoints
│       ├── LandingPage.tsx           # Landing/marketing page ("/")
│       └── NotFoundPage.tsx          # Standard 404 page
│
├── assets/                           # Global static files
│   └── images/
│       ├── auth_bg.jpg               # Login/register background image
│       ├── default-poster.png        # Media poster image fallback
│       └── tv_display.png            # Static mockup asset
│
├── App.css                           # Root layouts and variables
├── App.tsx                           # Central router mapping paths to pages
├── index.css                         # Tailwind CSS initialization & global base styles
└── main.tsx                          # App entrypoint initializing QueryClient
```

---

## 3. Historical File Relocation Log

The following table details the path transformations executed during the refactoring process:

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
| `src/app/pages/GenrsPage.tsx` | `src/features/media/pages/GenrsPage.tsx` | Genre browse page (`GenrsPage.tsx`) |
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
| `src/queries/mediaQueries.ts` (subset) | `src/features/user/api/useListQueries.ts` | `useGetLists`, `useAddToLists`, `useRemoveFromLists` |
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

## 4. Architectural Principles for Feature Boundaries

To maintain this directory layout and prevent code degradation:

### 1. Concept of Strict Feature Isolation
* A component or page inside `features/auth/` should **never** import directly from internal modules of another feature (e.g., `import { MovieCard } from '../media/components/MovieCard'`).
* Feature boundaries must be respected:
  * If a component, hook, or utility is domain-independent and used across **three or more features**, it belongs in `src/shared/`.
  * If it belongs to a specific domain (e.g. `Movie` types under `features/media`), keep it there and reference it using relative pathing.

### 2. Relative Imports and Path Mapping
* Use explicit, clean relative paths when importing modules.
* Avoid importing components or hooks from files deep in folders of other features. Keep interactions modularized.

### 3. API Query Isolation
* Keep queries associated with specific backend routes organized under their respective features (e.g., watchlists under `features/user/api/useListQueries.ts`, payments under `features/subscription/api/`).
* Avoid combining queries from different domain routes into a single queries file.
