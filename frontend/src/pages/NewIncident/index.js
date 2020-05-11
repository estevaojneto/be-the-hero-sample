import React, { useState }  from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import logoImg from   '../../assets/logo.svg';
export default function Profile() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [value, setValue] = useState();
    const ngoId = localStorage.getItem('ngoId');
    const history = useHistory();
    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };
        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ngoId
                }
            });
            history.push('/profile');
        }
        catch(err){
            alert('Error registering incident');
        }
    }

    return(
        <div className="new-incident-container">
        <div className="content">
            <section>
            <img src={logoImg} alt="Be The Hero"></img>    
            <h1>New Incident</h1>
            <p>Describe what needs your NGO are currently needing so a hero may help you out.</p>
            <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                   <Link className="back-link" to="/profile"> Return</Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input placeholder="Incident name" value={title} onChange={e=>setTitle(e.target.value)}/>
                <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}/>
                <input placeholder="Amount needed" value={value} onChange={e=>setValue(e.target.value)}/>
    
                <button className="button">Create incident</button>
            </form>
        </div>
    </div>
    );
}