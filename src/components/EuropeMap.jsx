import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
}

const center = {
    lat: 50.1109,
    lng: 8.6821,
}

const cities = [
    { name: 'London', position: { lat: 51.5074, lng: -0.1278 } },
    { name: 'Paris', position: { lat: 48.8566, lng: 2.3522 } },
    { name: 'Barcelona', position: { lat: 41.3851, lng: 2.1734 } },
    { name: 'Rome', position: { lat: 41.9028, lng: 12.4964 } },
    { name: 'Berlin', position: { lat: 52.52, lng: 13.405 } },
]

export default function EuropeMap({ onCityClick }) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    })

    if (loadError) {
        return (
            <div className="d-flex align-items-center justify-content-center h-100 bg-light text-danger">
                <p>Sorry, the map could not be loaded.</p>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div className="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
                <div className="spinner-border text-primary me-2" role="status"></div>
                <span>Loading map...</span>
            </div>
        )
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            options={{
                disableDefaultUI: false,
                streetViewControl: false,
                mapTypeControl: false,
            }}
        >
            {cities.map((city) => (
                <Marker
                    key={city.name}
                    position={city.position}
                    title={city.name}
                    onClick={() => onCityClick && onCityClick(city.name)}
                />
            ))}
        </GoogleMap>
    )
}