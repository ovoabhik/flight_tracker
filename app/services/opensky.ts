
export interface OpenSkyState {
    icao24: string;
    callsign: string;
    originCountry: string;
    timePosition: number | null;
    lastContact: number;
    longitude: number | null;
    latitude: number | null;
    baroAltitude: number | null;
    onGround: boolean;
    velocity: number | null;
    trueTrack: number | null;
    verticalRate: number | null;
    sensors: number[] | null;
    geoAltitude: number | null;
    squawk: string | null;
    spi: boolean;
    positionSource: number;
}

export interface OpenSkyResponse {
    time: number;
    states: (string | number | boolean | number[] | null)[][];
}

export async function fetchFlightStates(
    lamin?: number,
    lomin?: number,
    lamax?: number,
    lomax?: number
): Promise<OpenSkyState[]> {
    const baseUrl = 'https://opensky-network.org/api/states/all';
    const params = new URLSearchParams();

    if (lamin && lomin && lamax && lomax) {
        params.append('lamin', lamin.toString());
        params.append('lomin', lomin.toString());
        params.append('lamax', lamax.toString());
        params.append('lomax', lomax.toString());
    }

    try {
        const response = await fetch(`${baseUrl}?${params.toString()}`, {
            next: { revalidate: 10 }, // Cache for 10 seconds
        });

        if (!response.ok) {
            throw new Error(`OpenSky API error: ${response.statusText}`);
        }

        const data: OpenSkyResponse = await response.json();

        if (!data.states) {
            return [];
        }

        return data.states.map((state) => ({
            icao24: state[0] as string,
            callsign: (state[1] as string).trim(),
            originCountry: state[2] as string,
            timePosition: state[3] as number | null,
            lastContact: state[4] as number,
            longitude: state[5] as number | null,
            latitude: state[6] as number | null,
            baroAltitude: state[7] as number | null,
            onGround: state[8] as boolean,
            velocity: state[9] as number | null,
            trueTrack: state[10] as number | null,
            verticalRate: state[11] as number | null,
            sensors: state[12] as number[] | null,
            geoAltitude: state[13] as number | null,
            squawk: state[14] as string | null,
            spi: state[15] as boolean,
            positionSource: state[16] as number,
        }));
    } catch (error) {
        console.error('Failed to fetch OpenSky data:', error);
        return [];
    }
}
