import { useState, useEffect} from 'react';
import axios from 'axios';

export function AddPlayerForm({ onPlayerAdded })
{
    const [fullName, setFullName] = useState('');
    const[position, setPosition] = useState({})
    const [nationality, setNationality] = useState({})
    const[teamId, setTeamId] = useState()
    const[teams, setTeams] = useState()



    useEffect(()=>{

        axios.get(`https://localhost:8081/api/v1/teams`)
            .then(response => {
                setTeams(response.data);

                if(response.data.length > 0){
                    setTeamId(response.data[0].length)
                }
            })
            .catch(error =>console.error('Error fetching teams:',error));

    }, []);

    const handleSubmit = (event) =>{
        event.preventDefault();

        const newPlayer ={
            fullName,
            position,
            nationality,
            team: {
                id: teamId
            }
        };

        return (
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <h3>Add New Player</h3>
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" required />
                <input type="text" value={position} onChange={e => setPosition(e.target.value)} placeholder="Position" required />
                <input type="text" value={nationality} onChange={e => setNationality(e.target.value)} placeholder="Nationality" required />
                <select value={teamId} onChange={e => setTeamId(e.target.value)} required>
                    {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
                <button type="submit">Add Player</button>
            </form>
        );

    }
}

