import { Badge, Stack } from 'react-bootstrap'

export default function CityHighlights({ city, showHighlights = true }) {
    if (!city) return null

    return (
        <div>
            <p className="mb-1 text-secondary text-uppercase small fw-semibold">
                {city.country}
            </p>
            <h2 className="h4 mb-1 text-white">{city.name}</h2>
            <p className="mb-2 text-secondary">{city.tagline}</p>

            {showHighlights && city.highlights?.length > 0 && (
                <Stack direction="horizontal" gap={2} className="flex-wrap mb-2">
                    {city.highlights.map((item) => (
                        <Badge
                            key={item}
                            bg=""
                            className="border"
                            style={{
                                backgroundColor: '#2a2a2a',
                                borderColor: '#444',
                                color: '#f5f5f5'
                            }}
                        >
                            {item}
                        </Badge>
                    ))}
                </Stack>
            )}
        </div>
    )
}
