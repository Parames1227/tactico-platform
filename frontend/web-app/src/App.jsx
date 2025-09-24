import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import the modal library
import './index.css';
import { AddPlayerForm } from './components/AddPlayerForm';

// --- Add this line for the modal ---
Modal.setAppElement('#root');

function App() {
    const [players, setPlayers] = useState([]);
    // --- Add state for the modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(null);

    const fetchPlayers = () => {
        axios.get('http://localhost:8081/api/v1/players')
            .then(response => { setPlayers(response.data); })
            .catch(error => { console.error('Error fetching players!', error); });
    };

    useEffect(() => { fetchPlayers(); }, []);

    const handleDelete = (playerId) => {
        axios.delete(`http://localhost:8081/api/v1/players/${playerId}`)
            .then(() => { fetchPlayers(); })
            .catch(error => { console.error('Error deleting player!', error); });
    };

    // --- Functions to open/close the modal ---
    const openEditModal = (player) => {
        setCurrentPlayer(player);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
        setCurrentPlayer(null);
    };

    const handleUpdatePlayer = (updatedPlayer) => {
        axios.put(`http://localhost:8081/api/v1/players/${currentPlayer.id}`, updatedPlayer)
            .then(() => {
                fetchPlayers();
                closeEditModal();
            })
            .catch(error => console.error('Error updating player:', error));
    };


    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            {/* ... header and AddPlayerForm are the same ... */}
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
                            <th className="p-4 font-bold">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {players.map(player => (
                            <tr key={player.id} className="border-b border-gray-700 hover:bg-gray-600 transition duration-300">
                                <td className="p-4">{player.fullName}</td>
                                <td className="p-4">{player.team ? player.team.name : 'N/A'}</td>
                                <td className="p-4">{player.position}</td>
                                <td className="p-4">{player.nationality}</td>
                                <td className="p-4 flex gap-2">
                                    {/* --- ADD THIS EDIT BUTTON --- */}
                                    <button
                                        onClick={() => openEditModal(player)}
                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded transition duration-300">
                                        Edit
                                    </button>
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

            {/* --- ADD THE EDIT MODAL COMPONENT --- */}
            {currentPlayer && (
                <EditPlayerModal
                    isOpen={isModalOpen}
                    onRequestClose={closeEditModal}
                    player={currentPlayer}
                    onUpdate={handleUpdatePlayer}
                />
            )}
        </div>
    );
}

// --- ADD THIS NEW COMPONENT FOR THE MODAL FORM ---
function EditPlayerModal({ isOpen, onRequestClose, player, onUpdate }) {
    const [formData, setFormData] = useState(player);

    useEffect(() => {
        setFormData(player);
    }, [player]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={{
            content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', backgroundColor: '#1F2937', border: '1px solid #4B5563', color: 'white' },
            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' }
        }}>
            <h2 className="text-2xl font-bold mb-4">Edit Player</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="p-2 rounded bg-gray-700 border border-gray-600" />
                    <input type="text" name="position" value={formData.position} onChange={handleChange} className="p-2 rounded bg-gray-700 border border-gray-600" />
                    <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} className="p-2 rounded bg-gray-700 border border-gray-600" />
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onRequestClose} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default App;