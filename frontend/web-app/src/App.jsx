import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        // Fetch data from our Spring Boot API
        axios.get('http://localhost:8080/api/v1/players')
            .then(response => {
                setPlayers(response.data)
            })
            .catch(error => {
                console.error('There was an error fetching the players!', error)
            })
    }, []) // The empty array [] means this effect runs only once

    return (
        <>
            <h1>Tactico Platform</h1>
            <h2>Player List</h2>
            <div>
                {/* If there are no players, show a loading message */}
                {players.length === 0 && <p>Loading players...</p>}

                {players.map(player => (
                    <div key={player.id} style={{ border: '1px solid grey', padding: '10px', margin: '10px' }}>
                        <h3>{player.fullName}</h3>
                        <p>Position: {player.position}</p>
                        <p>Nationality: {player.nationality}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default App