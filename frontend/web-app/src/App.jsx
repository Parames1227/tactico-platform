import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { AddPlayerForm } from './components/AddPlayerForm'; // Import the new component

function App() {
    const [players, setPlayers] = useState([]);

    // We'll put the fetching logic into its own function
    const fetchPlayers = () => {
        axios.get('http://localhost:8081/api/v1/players')
            .then(response => {
                setPlayers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the players!', error);
            });
    };

    // useEffect now just calls our fetch function
    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <>
            <h1>Tactico Platform</h1>

            {/* Add the new form component here */}
            <AddPlayerForm onPlayerAdded={fetchPlayers} />

            <hr />

            <h2>Player List</h2>
            <div>
                {players.length === 0 && <p>No players found. Add one above!</p>}
                {players.map(player => (
                    <div key={player.id} style={{ border: '1px solid grey', padding: '10px', margin: '10px' }}>
                        <h3>{player.fullName}</h3>
                        <p><strong>Team:</strong> {player.team ? player.team.name : 'N/A'}</p>
                        <p>Position: {player.position}</p>
                        <p>Nationality: {player.nationality}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;