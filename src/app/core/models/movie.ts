export type Movie = {
  id: string;
  name: string;
  wallpaper: string;
};

export type Page<T> = {
  totalItems: number;
  totalPages: number;
  isLast: boolean;
  content: T[];
}

