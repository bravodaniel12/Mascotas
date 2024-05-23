import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import bgLogin from '../assets/bg-login.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function LoginUser() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/validacion', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            console.log('Token generado:', token); // Agregar console.log aquí
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: '¡Bienvenido de vuelta!',
            }).then(() => {
                navigate('/ListarM');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Correo electrónico o contraseña incorrectos',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className='flex flex-col items-center justify-center min-h-screen'
            style={{ backgroundImage: `url(${bgLogin})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        >
            <form onSubmit={handleSubmit} className='w-full max-w-sm mt-96 pt-24'>
                <div className='mb-4'>
                    <input
                        type='email'
                        id='email'
                        placeholder='Correo electrónico'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-3 py-2 rounded-3xl border-gray-300 bg-transparent focus:outline-none ml-5 bg-slate-400'
                        style={{ height: '40px', width: '90%', backgroundColor: 'rgba(206, 206, 206, 0.8)' }}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            value={password}
                            placeholder='Contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-3 py-2 rounded-3xl border-gray-300 bg-transparent focus:outline-none ml-5 bg-slate-400'
                            style={{ height: '40px', width: '90%', backgroundColor: 'rgba(206, 206, 206, 0.8)' }}
                            required
                        />
                        <div className='absolute inset-y-0 right-3 flex items-center mr-6'>
                            {showPassword ? (
                                <FaEyeSlash className='text-gray-500 cursor-pointer' onClick={handleTogglePassword} />
                            ) : (
                                <FaEye className='text-gray-500 cursor-pointer' onClick={handleTogglePassword} />
                            )}
                        </div>
                    </div>
                </div>
                <button type='submit' className='w-full bg-blue-950 rounded-3xl text-white py-2 ml-5 px-4 hover:bg-blue-900' style={{ width: '90%' }}>
                    {loading ? 'Cargando...' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
}

export default LoginUser;
