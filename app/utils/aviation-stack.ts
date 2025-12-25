import { AviationStackResponse } from '../types/aviation-stack';

const AVIATION_STACK_API_URL = 'http://api.aviationstack.com/v1/flights';

interface FetchFlightsParams {
    access_key: string;
    flight_iata?: string;
    limit?: number;
}

export async function fetchFlights(params: FetchFlightsParams): Promise<AviationStackResponse> {
    const url = new URL(AVIATION_STACK_API_URL);

    // Add required access_key
    url.searchParams.append('access_key', params.access_key);

    // Add optional parameters if they exist
    if (params.flight_iata) {
        url.searchParams.append('flight_iata', params.flight_iata);
    }

    if (params.limit) {
        url.searchParams.append('limit', params.limit.toString());
    }

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Cache for 1 hour to avoid hitting API limits during dev
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`Aviation Stack API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Basic validation to ensure we got what we expect
        if (!data || !data.data) {
            console.error('Unexpected API response structure:', data);
            throw new Error('Invalid API response structure');
        }

        return data as AviationStackResponse;
    } catch (error) {
        console.error('Error fetching flights:', error);
        throw error;
    }
}
