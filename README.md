# CinePrism - React Frontend

[Live demo](https://cineprism-frontend.vercel.app/) · [Laravel API](https://github.com/KaungHtetZaw-bot/movie-app-backend) · [Vue admin dashboard](https://github.com/KaungHtetZaw-bot/CINEPRISM-admin-dashboard)

CinePrism is a movie and TV discovery experience built with React and TypeScript. It lets users explore TMDB-powered media, manage personal collections, and purchase VIP access through a receipt-based subscription flow.

## Highlights

- Browse popular media, genres, search results, trailers, credits, and recommendations
- Create and manage watchlist, favorites, and recently viewed collections
- Use OTP registration, JWT authentication, protected routes, and token refresh
- Upload a VIP payment receipt and receive approval or rejection in real time
- Keep catalogue and collection interactions responsive with TanStack Query caching
- Receive subscription status changes through Laravel Reverb private WebSocket channels

## Stack

- React 19 and TypeScript
- Vite and Tailwind CSS
- TanStack Query, Zustand, React Router, Axios, and Framer Motion
- Laravel Echo, Pusher JS, and Laravel Reverb for real-time events

## How it fits together

```text
React customer app
  -> Laravel REST API
  -> TMDB media data, authentication, collections, and VIP purchases
  -> Laravel Reverb private channels for purchase decisions

Vue admin dashboard
  -> Reviews VIP purchases and manages operational data
```

## Run locally

Prerequisites: a running CinePrism Laravel API and Node.js.

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_REVERB_APP_KEY=
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

Then start the development server:

```bash
npm run dev
```

## Available scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Project status

The public React frontend is available at [cineprism-frontend.vercel.app](https://cineprism-frontend.vercel.app/). The project is an end-to-end streaming-platform prototype; it does not claim commercial subscriber scale or licensed media ownership.
