'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L from 'leaflet';
import { fetchFlightStates, OpenSkyState } from '@/app/services/opensky';

interface FlightMapProps {
    initialCenter?: [number, number];
    zoom?: number;
}

export default function FlightMap({ initialCenter = [20, 0], zoom = 2 }: FlightMapProps) {
    const [flights, setFlights] = useState<OpenSkyState[]>([]);
    const [selectedFlight, setSelectedFlight] = useState<string | null>(null);

    // Poll for flight data
    useEffect(() => {
        const fetchData = async () => {
            // Fetch specifically for a region if needed, or all (limit processing if too many)
            // For demo, let's fetch a bounding box around Europe or US to show density without crashing
            // Or fetch all and slice. fetchFlightStates handles args.
            // Let's try getting all but limiting rendering count.
            const data = await fetchFlightStates();
            setFlights(data);
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // 10 seconds
        return () => clearInterval(interval);
    }, []);

    // Filter valid flights
    const validFlights = useMemo(() => {
        return flights.filter(f => f.latitude !== null && f.longitude !== null && !f.onGround).slice(0, 500); // Limit to 500 for performance in demo
    }, [flights]);

    return (
        <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 relative">
            <MapContainer center={initialCenter} zoom={zoom} style={{ height: '100%', width: '100%' }} className="z-0">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* Density Rendering (Simple Circle Markers with low opacity) */}
                {validFlights.map((flight) => (
                    <CircleMarker
                        key={`density-${flight.icao24}`}
                        center={[flight.latitude!, flight.longitude!]}
                        radius={20}
                        pathOptions={{
                            color: 'transparent',
                            fillColor: '#3b82f6',
                            fillOpacity: 0.1
                        }}
                    />
                ))}

                {/* Flight Markers */}
                {validFlights.map((flight) => (
                    <Marker
                        key={flight.icao24}
                        position={[flight.latitude!, flight.longitude!]}
                        icon={L.divIcon({
                            className: 'bg-transparent',
                            html: `<div style="transform: rotate(${flight.trueTrack || 0}deg); transition: all 0.5s ease-in-out;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="#60a5fa"/>
                        </svg>
                      </div>`,
                            iconSize: [24, 24],
                            iconAnchor: [12, 12]
                        })}
                        eventHandlers={{
                            click: () => setSelectedFlight(flight.icao24)
                        }}
                    >
                        <Popup>
                            <div className="text-sm font-sans">
                                <p><strong>Callsign:</strong> {flight.callsign || 'N/A'}</p>
                                <p><strong>Origin:</strong> {flight.originCountry}</p>
                                <p><strong>Altitude:</strong> {flight.baroAltitude} m</p>
                                <p><strong>Velocity:</strong> {flight.velocity} m/s</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-4 rounded-lg text-white z-[1000] border border-white/10">
                <h3 className="font-bold text-sm mb-1">Live Air Traffic</h3>
                <p className="text-xs text-gray-300">Tracking {validFlights.length} flights</p>
                <p className="text-xs text-gray-400 mt-1">Updates every 10s</p>
            </div>
        </div>
    );
}
