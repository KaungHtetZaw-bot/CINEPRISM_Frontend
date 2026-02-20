export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  key: string;
  site: string;
  type: string;
}

export interface Movie {
  id: number;
  // Use optional chaining for titles since TMDB toggles between 'title' and 'name'
  title?: string; 
  name?: string; 
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  release_date?: string;
  first_air_date?: string; // For TV Shows
  
  // Custom properties for your Backend Flow
  type: 'movie' | 'tv';
  media_type?: 'movie' | 'tv' | 'person';

  // Detail-specific fields (make these optional)
  genres?: Genre[];
  runtime?: number;
  episode_run_time?: number[];
  status?: string;
  tagline?: string;
  vote_count:number;
  production_companies?: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  videos?: {
    results: Video[];
  };
  recommendations?: {
    results: Movie[];
  };
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
      order: number;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
      department: string;
    }[];
  };
}