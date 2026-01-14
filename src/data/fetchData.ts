import type { ArtworksApiResponse } from "../types/DataTypes";

async function fetchArtworks(page:number):Promise<ArtworksApiResponse> {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default fetchArtworks;