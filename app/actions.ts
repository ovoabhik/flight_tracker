'use server';

export interface Flight {
  flightNumber: string;
  startTime: string;
  endTime: string;
  startLocation: string;
  endLocation: string;
  timeZoneStart: string;
  timeZoneEnd: string;
}

import { MOCK_FLIGHTS } from './data/mock-flights';

export async function searchFlight(query: string): Promise<Flight[]> {
  // Simulate network delay logic is handled effectively by the real API call duration or implicitly for mock

  if (!query) return [];

  const normalizedQuery = query.toUpperCase().trim();

  // 1. Try Real API if Key is present
  const apiKey = process.env.AVIATION_STACK_ACCESS_KEY;
  if (apiKey) {
    console.log('Using Real Aviation Stack API for query:', normalizedQuery);
    try {
      const { fetchFlights } = await import('./utils/aviation-stack');
      const response = await fetchFlights({
        access_key: apiKey,
        flight_iata: normalizedQuery
      });

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(item => ({
        flightNumber: item.flight.iata || item.flight.number,
        startTime: item.departure.scheduled,
        endTime: item.arrival.scheduled,
        startLocation: item.departure.airport,
        endLocation: item.arrival.airport,
        timeZoneStart: item.departure.timezone,
        timeZoneEnd: item.arrival.timezone,
      }));
    } catch (error) {
      console.error('Real API Call Failed, returning empty results to avoid mock confusion', error);
      throw error;
    }
  }

  // 2. Fallback to Mock Data
  console.log('Using Mock Data (No API Key found)');
  await new Promise((resolve) => setTimeout(resolve, 500));

  return MOCK_FLIGHTS.filter((flight) =>
    flight.flightNumber.includes(normalizedQuery)
  );
}

export async function getMockFlightNumbers(): Promise<string[]> {
  return MOCK_FLIGHTS.map((f) => f.flightNumber);
}
