import React, {useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import logoImg from   '../../assets/logo.svg';
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setStateProvince] = useState('');
    const history = useHistory();
    async function handleRegister(e){
        e.preventDefault();
        const data = { name, email, whatsapp, city, state};
        try{
            const response = await api.post('ngos', data);
            alert(`Your ID: ${response.data.id}`);
            history.push('/');
        }
        catch(err){
            alert('error!');
        }
    }

    return(
    <div className="register-container">
        <div className="content">
            <section>
            <img src={logoImg} alt="Be The Hero"></img>    
            <h1>Register</h1>
            <p>Register your NGO and help people find out what your NGO needs to make the world a better place.</p>
            <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                   <Link className="back-link" to="/"> Return</Link>
            </section>            
            <form onSubmit={handleRegister}>
                <input value={name} placeholder="NGO name" onChange={e => setName(e.target.value)} />
                <input value={email} type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                <input value={whatsapp} placeholder="WhatsApp" onChange={e => setWhatsapp(e.target.value)}/>
                <div className="input-group">
                    <input value={city} placeholder="City" onChange={e => setCity(e.target.value)}></input>
                    <input value={state} placeholder="State" onChange={e => setStateProvince(e.target.value)} style={{ width: 80}}></input>
                </div>
                <button className="button">Create account</button>
            </form>
        </div>
    </div>
    );
}