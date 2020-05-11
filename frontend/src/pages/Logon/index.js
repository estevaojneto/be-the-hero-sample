import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from   '../../assets/logo.svg';
import api from '../../services/api';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions', { id });
            localStorage.setItem('ngoName', response.data.name);
            localStorage.setItem('ngoId', id);
            history.push('/profile');
        }
        catch(err){
            alert('error logging in!');
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"></img>    
                <form onSubmit={handleLogin}>
                    <h1>Log In</h1>
                    <input placeholder="ID" value={id} onChange={e => setId(e.target.value)}></input>
                   <button className="button" type="submit" >Login</button>
                   <FiLogIn size={16} color="#E02041"></FiLogIn>
                   <Link className="back-link" to="/register"> Create my NGO account</Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"></img>
        </div>
    );
}