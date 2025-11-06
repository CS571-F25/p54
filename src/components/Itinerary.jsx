export default function Itinerary() {
    const handleDownload = () => {
        // Logic to download itinerary
        console.log('Download itinerary')
    }

    const handleSendToAgent = () => {
        // Logic to send to travel agent
        console.log('Send to travel agent')
    }

    return <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Your Travel Itinerary</h1>
        
        <div style={{ marginBottom: '30px' }}>
            <h2>Trip Overview</h2>
            <p>Destinations selected will be displayed here</p>
            {/* Display cities and dates */}
        </div>
        
        <div style={{ marginBottom: '30px' }}>
            <h2>Activities & Attractions</h2>
            <p>Selected activities organized by city/day will go here</p>
            {/* Display organized itinerary */}
        </div>
        
        <div style={{ marginBottom: '30px' }}>
            <h2>Custom Activities</h2>
            <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Add Custom Activity
            </button>
            {/* Form/list for custom activities */}
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
            <button 
                onClick={handleDownload}
                style={{ padding: '10px 20px', cursor: 'pointer' }}
            >
                Download Itinerary
            </button>
            <button 
                onClick={handleSendToAgent}
                style={{ padding: '10px 20px', cursor: 'pointer' }}
            >
                Send to Travel Agent
            </button>
            <button 
                style={{ padding: '10px 20px', cursor: 'pointer' }}
            >
                Save to Past Destinations
            </button>
        </div>
    </div>
}