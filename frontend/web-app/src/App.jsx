import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import { AddPlayerForm } from './components/AddPlayerForm';

function App() {
    const [players, setPlayers] = useState([]);

    const fetchPlayers = () => {
        axios.get('http://localhost:8081/api/v1/players')
            .then(response => {
                setPlayers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the players!', error);
            });
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    // NEW: Function to handle the delete action
    const handleDelete = (playerId) => {
        axios.delete(`http://localhost:8081/api/v1/players/${playerId}`)
            .then(() => {
                console.log(`Player with ID ${playerId} deleted.`);
                fetchPlayers(); // Refresh the player list after deleting
            })
            .catch(error => {
                console.error('There was an error deleting the player!', error);
            });
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-center">Tactico Platform</h1>
            </header>

            <main>
                <AddPlayerForm onPlayerAdded={fetchPlayers} />

                <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4 font-bold">Full Name</th>
                            <th className="p-4 font-bold">Team</th>
                            <th className="p-4 font-bold">Position</th>
                            <th className="p-4 font-bold">Nationality</th>
                            <th className="p-4 font-bold">Actions</th> {/* NEW: Actions column header */}
                        </tr>
                        </thead>
                        <tbody>
                        {players.map(player => (
                            <tr key={player.id} className="border-b border-gray-700 hover:bg-gray-600 transition duration-300">
                                <td className="p-4">{player.fullName}</td>
                                <td className="p-4">{player.team ? player.team.name : 'N/A'}</td>
                                <td className="p-4">{player.position}</td>
                                <td className="p-4">{player.nationality}</td>
                                {/* NEW: Delete button in the new column */}
                                <td className="p-4">
                                    <button
                                        onClick={() => handleDelete(player.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition duration-300">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {players.length === 0 && <p className="p-4 text-center">No players found. Add one above!</p>}
                </div>
            </main>
        </div>
    );
}

export default App;