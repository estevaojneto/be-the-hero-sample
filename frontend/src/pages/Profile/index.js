import React, { useState, useEffect } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import logoImg from   '../../assets/logo.svg';
export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ngoName = localStorage.getItem('ngoName');
    const ngoId = localStorage.getItem('ngoId');
    const history = useHistory();
    useEffect(() => {api.get('profile', {
        headers: {
            Authorization: ngoId,
        }
    }).then(response => {
            setIncidents(response.data);
    })
    }, [ngoId]);
    async function handleDeleteIncident(id) {
    try{
        await api.delete(`incidents/${id}`, {
            headers:{
                Authorization: ngoId
            }
        });
        setIncidents(incidents.filter(incident => incident.id !== id));
    }
    catch(err){
            alert('Error removing incident.');
    }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"></img>
                <span>Welcome, {ngoName}!</span>
                <Link className="button" to="/incidents/new">New incident</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>
            <h1>Registered Incidents</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>SITUATION:</strong>
                        <p>{incident.title}</p>
                        <strong>Description:</strong>
                        <p>{incident.description}</p>
                        <strong>Money needed:</strong>
                        <p> {Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(incident.value)} </p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={`20`} color="#A8A8B3"></FiTrash2>
                        </button>
                        </li>  
                ))}
              
            </ul>
        </div>
    );
}