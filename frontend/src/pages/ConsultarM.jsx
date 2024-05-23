import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import bgBlue from '../assets/bg.svg';
import bgBack from '../assets/btn-back.svg';
import bgClose from '../assets/btn-close.svg';
import bgPetCamera from '../assets/photo-lg-1.svg';
import InfoName from '../assets/info-name.svg';
import InfoRace from '../assets/info-race.svg';
import InfoCategory from '../assets/info-category.svg';
import InfoGender from '../assets/info-gender.svg';

function ConsultarM() {
    const { id_mascota } = useParams();
    const [pet, setPet] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const getURL = `http://localhost:3000/BuscarMascota/${id_mascota}`;
                const response = await axios.get(getURL, {
                    headers: {
                        token: token
                    }
                });
                console.log(response.data);
                setPet(response.data[0]);
            } catch (error) {
                console.log('Error al obtener los datos de la mascota:', error);
            }
        };

        fetchPetData();
    }, [id_mascota, token]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen' style={{ backgroundImage: `url(${bgBlue})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', paddingBottom: '15vh' }}>
            <div className="flex items-center">
                <Link to="/ListarM">
                    <img src={bgBack} alt="Back" className="cursor-pointer mb-20 mr-16" />
                </Link>
                <span className="text-gray-50 mb-20 text-xl">Consultar Mascota</span>
                <Link to="/">
                    <img src={bgClose} alt="Close" className="cursor-pointer mb-20 ml-12" />
                </Link>
            </div>

            {pet ? (
                <img 
                    src={`http://localhost:3000/img/${pet.foto}`} 
                    alt="Mascota" 
                    className="cursor-pointer -mt-8 w-32 h-32 object-cover rounded-full"
                />
            ) : (
                <img src={bgPetCamera} alt="Camera" className="cursor-pointer -mt-8" />
            )}

            {pet && (
                <div>
                    <div className='mt-11 relative'>
                        <img src={InfoName} alt="Info Name" />
                        <h3 className='ml-32 absolute top-3 text-slate-500 text-gray-400'>{pet.name}</h3>
                    </div>

                    <div className='mt-3 relative'>
                        <img src={InfoRace} alt="Info Race" />
                        <h3 className='ml-32 absolute top-3 text-slate-500 text-gray-400'>{pet.raza}</h3>
                    </div>

                    <div className='mt-3 relative'>
                        <img src={InfoCategory} alt="Info Category" />
                        <h3 className='ml-32 absolute top-3 text-slate-500 text-gray-400'>{pet.categoria}</h3>
                    </div>

                    <div className='mt-3 relative'>
                        <img src={InfoGender} alt="Info Gender" />
                        <h3 className='ml-32 absolute top-3 text-slate-500 text-gray-400'>{pet.genero}</h3>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ConsultarM;
