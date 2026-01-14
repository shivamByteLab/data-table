import type { OverlayPanel } from "primereact/overlaypanel";

export interface Artwork {
  id: number;
  title: string;
  place_of_origin: string | null;
  artist_display: string | null;
  inscriptions: string | null;
  date_start: number | null;
  date_end: number | null;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string | null;
}

export interface ArtworksApiResponse {
  data: Artwork[];
  pagination: Pagination;
}

export interface OverlayPanalType {
  bulkOverlayRef: React.RefObject<OverlayPanel | null>;
  bulkTarget: number | null;
  selectedIds: Set<number>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
  products: Artwork[];
  setBulkTarget: React.Dispatch<React.SetStateAction<number | null>>;
  setBulkActive: React.Dispatch<React.SetStateAction<boolean>>;
}