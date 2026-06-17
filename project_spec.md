# CinePrism - Frontend Project Specification

CinePrism is a high-end, premium cinematic movie and TV show streaming web application prototype. The frontend is designed with a strict, high-contrast typography system, elegant hover transitions, custom curated theme layers, and robust state management structures, offering a highly responsive, app-like desktop and mobile experience.

---

## 1. Core Technology Stack

The application is built on modern web technologies optimized for speed, developer efficiency, and a fluid user experience:

*   **Core UI Library:** React 19.2.0 (leveraging the **React Compiler** for automatic render optimization and high performance)
*   **Language:** TypeScript (strict typing for all components, store states, and API responses)
*   **Build Tool:** Vite 7.2.4 (utilizing Fast Refresh and fast Hot Module Replacement)
*   **Styling (CSS):** TailwindCSS v4.1.18 (integrated via `@tailwindcss/vite` for CSS variables-first compiling and streamlined build size)
*   **State Management:**
    *   **Zustand (Local State):** Persisted state for authentication data and theme parameters
    *   **TanStack React Query v5:** Server state caching, optimistic UI updates, data fetching, mutations, and infinite scroll pagination
*   **Routing:** React Router DOM v7.13.0 (handling protected routes, redirection, page layouts, and dynamic path parameter binding)
*   **HTTP Client:** Axios (custom client with request and response interceptors for JWT token propagation and automatic silent tokens refresh)
*   **WebSockets (Real-time):** Laravel Echo & Pusher JS (integrated with **Laravel Reverb** websocket protocol to push real-time transaction status updates)
*   **Animations:** Framer Motion v12.33.0 (driving header scrolling transitions, modal fade-ins, and layout changes)
*   **Icons:** Lucide React (for uniform vector icons) and Material Symbols

---

## 2. Directory & Component Architecture

The codebase follows a scalable structure, dividing pages, global routing/layout components, feature-specific components, and API integration hooks:

```
src/
├── app/                  # Application Shell & Base Configurations
│   ├── api/              # Axios instance and API configs
│   ├── pages/            # Page/View components (Routes elements)
│   ├── routes/           # Routing configuration and Route guards
│   └── store/            # Global state stores (Zustand)
├── assets/               # Local media assets (images, logos)
├── components/           # Reusable Application-Wide Components
│   ├── auth/             # Authentication-specific sub-components
│   ├── layout/           # Page structural layouts (Navbar, Sidebar, ThemeToggle)
│   ├── shared/           # Generic shared actions (BackButton, ScrollToTop, Spinner)
│   └── ui/               # Modular UI blocks (VipCard, Alert)
├── features/             # Feature-Driven Modules (Encapsulated scopes)
│   └── media/            # Media (Movies/TV) specific feature module
│       ├── api/          # Feature-level API calls
│       ├── components/   # Feature-level UI components (MovieCard, MovieRow, MovieGrid, InfiniteGrid)
│       ├── hooks/        # Feature-level custom hooks (scrolling, fetching)
│       ├── types/        # Feature-level type definitions (Media structures)
│       └── utils/        # Feature-level utility functions (Image URLs)
├── hooks/                # Global React Hooks
├── lib/                  # Third-party service connectors (Laravel Echo setup)
├── queries/              # TanStack Query hook definitions
├── App.css               # Core layout adjustments
├── App.tsx               # Primary React entry point & Router Mapping
├── index.css             # Main styling entry point, typography imports, and Tailwind configuration
└── main.tsx              # DOM mounting and provider wraps (React Query, React compiler)
```

---

## 3. Features Breakdown

### 3.1. Aesthetics & Multi-Theme System
CinePrism is styled around rich, high-contrast, premium layouts using variable-based design tokens. It currently supports three selectable themes:
1.  **Default Dark:** Dark slate charcoal base (`#0f0f12`) with refined gold accents (`#d4af37`).
2.  **Light Theme:** Modern, crisp gray/white base (`#f5f5f7`) with refined gold (`#c9a227`) and distinct borders.
3.  **Cinema Theme:** An ultra-dark, theater-like pitch-black canvas (`#050507`) with vibrant neon gold accents (`#e2b616`) and deep drop shadows.

Theme toggling cycles through these states (`cycleTheme`) via `useThemeStore` (persisted in `localStorage`), dynamically setting the `data-theme` attribute on the `document.documentElement` to reload design tokens seamlessly.

### 3.2. Secure Authentication & User Onboarding
*   **Authentication Forms:** Clean, cinematic layouts for Login and Register pages. Includes the `AuthCard` helper which encapsulates the layout for inputs and authentication transitions.
*   **OTP Verification:** Email verification through One-Time Password (OTP) validation (`/verify-code` backend route) to secure new registrations.
*   **Route Protection:** `ProtectedRoute.tsx` acts as an outlet wrapper. If the client does not have a valid auth token, they are immediately redirected to the Landing Page (`/`).

### 3.3. Spotlight & Hero Sections
*   **Interactive Spotlight:** The Home page features a fullscreen/split header display showcasing trending media, pulling backdrop images, TMDB titles, average ratings, genres, and synopsis descriptions.
*   **Play/Trailer Triggering:** Integration of interactive play/trailer buttons with transition feedback.

### 3.4. Advanced Media Grid & Row Components
*   **MovieCard:** High-contrast borders, lazy loaded poster graphics, hover zoom effect (`scale-110`), and navigation links to dynamic details pages.
*   **MovieRow:** A horizontally scrollable row element allowing users to swipe or scroll through collections (e.g., *Trending Now*, *Popular*).
*   **MovieGrid:** A CSS Grid layout organizing movies and shows uniformly across all viewports.
*   **Skeleton Loaders:** CSS pulse-animation skeletons (`MovieSkeleton`, `MovieDetailSkeleton`) map layouts while resources are loading, preventing layout shifts.

### 3.5. Infinite Scrolling Catalog Explorer (`InfiniteGrid`)
To avoid heavy rendering and network overhead, lists of movies or TV series are loaded dynamically:
*   Utilizes React Query’s `useInfiniteQuery` to handle paginated API endpoints.
*   Uses a browser-native `IntersectionObserver` that triggers `fetchNextPage` once the user scrolls to a loading marker at the bottom of the page, ensuring a smooth, endless scroll.

### 3.6. Search Engine with Debouncing
*   Accessible at `/search`, allowing users to find movies, shows, and key personnel.
*   Features a **300ms input debounce** implemented with `setTimeout` inside a `useEffect` hook. This ensures search API calls are only fired when typing stops, optimizing server load.

### 3.7. Personal Collections (Watchlist & Favorites)
Users can curate their viewing preferences in three list categories:
1.  **Watchlist (Bookmarks):** Media targeted for future viewing.
2.  **Favorites:** Media marked as loved by the user.
3.  **Recent:** Recently viewed movies and shows.

These lists use TanStack Query mutations (`useAddToLists`, `useRemoveFromLists`) to post entries to the backend API (`/user/lists/*`) and immediately invalidate client query caches so changes reflect instantly across the interface.

### 3.8. VIP Subscription & Payment Gateway
A premium portal `/vip-purchase` allows standard users to purchase VIP status:
1.  **Select Payment Provider:** Fetches active vendor accounts (e.g., KPay, WaveMoney) and displays account numbers with a quick-copy clipboard action.
2.  **Select Subscription Plan:** Displays different billing durations (e.g., 1 Month, 6 Months) with structured prices.
3.  **Upload Proof of Deposit:** Users can upload a photo/screenshot of the bank receipt slip, which is loaded as an image preview and submitted as `multipart/form-data`.
4.  **Real-Time WebSocket Sync:** 
    *   The application initiates a background socket subscription (Laravel Echo/Reverb) listening to `App.Models.User.{userId}`.
    *   When an administrator approves or rejects the subscription on the backend, Reverb triggers a websocket event (`.purchase.approved` or `.purchase.rejected`).
    *   On approval, the store state is instantly updated with the new User object (`is_vip: 1`), granting the user premium perks without requiring a manual refresh.
*   **VIP Progress bar (`VipCard`):** Displays a progress bar representing the duration left on the VIP membership, complete with a live ticking countdown timer down to the second.

---

## 4. Navigation & Route Mapping

| Route Path | Layout Wrap | Guarded? | Description |
| :--- | :--- | :--- | :--- |
| `/` | *None* | No | Public Landing page introducing features and showing trending movies |
| `/login` | *None* | No | Login screen with email and password inputs |
| `/register` | *None* | No | User registration page |
| `/auth` | *None* | No | Integrated Authentication Card (OTP Code Verification / Auth flow) |
| `/browse` | `MainLayout` | **Yes** | Home dashboard displaying Spotlight and curated horizontal shelves |
| `/search` | `MainLayout` | **Yes** | Debounced search screen mapping results into a structured grid |
| `/media/:type` | `MainLayout` | **Yes** | Infinite-scrolling movie (`/media/movie`) or TV show (`/media/tv`) list |
| `/media/genres/movie` | `MainLayout` | **Yes** | Explorer view filtering movies and series by genre categories |
| `/mylist/:type` | `MainLayout` | **Yes** | Displays Personal Collections: `recent`, `watchlist`, or `favorite` |
| `/profile` | `MainLayout` | **Yes** | Profile Settings, library indicators, and basic credentials change actions |
| `/vip-purchase` | `MainLayout` | **Yes** | Premium purchase screen with payment configurations and slip upload |
| `/details/:type/:id` | *None* | **Yes** | Detailed overview page for a specific media item (rating, genres, play actions, credits, recommendations) |
| `*` | *None* | **Yes** | 404 Not Found fallback screen |

---

## 5. Key Tech Implementations Detail

### 5.1. Axios JWT Auto-Refresh Interceptor
The application handles token expiration gracefully in `/src/app/api/axios.ts`:
*   **Request Interceptor:** Automatically appends the Bearer token from the Zustand auth store to the `Authorization` header of all outgoing API requests.
*   **Response Interceptor:** Intercepts `401 Unauthorized` responses. If a 401 is encountered, it pauses the request queue, makes a POST request to `/refresh` to request a new access token, updates the Zustand store and `localStorage` with the new token, and retries the original failed request. If the refresh request itself fails or returns a 401, the user is logged out, and redirected to `/login`.

### 5.2. Laravel Reverb Real-Time Channel Setup
The Reverb WebSocket initialization (`/src/lib/echo.ts`):
*   Reads socket credentials (`VITE_REVERB_APP_KEY`, `VITE_REVERB_HOST`, `VITE_REVERB_PORT`) and instantiates a `Laravel Echo` instance using the `'reverb'` broadcaster.
*   Uses a private channel authentication endpoint (`/api/broadcasting/auth`) passing the bearer token.
*   Subscribes the user to their private channel (`App.Models.User.{id}`) in `/src/hooks/usePurchaseBroadcast.ts` to listen for `.purchase.approved` and `.purchase.rejected` events.
