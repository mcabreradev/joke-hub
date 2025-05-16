export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
  rating?: number;
}

export interface RatingsMap {
  [key: number]: number
}
