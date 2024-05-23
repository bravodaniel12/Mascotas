import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import bgBlue from '../assets/bg.svg';
import bgBack from '../assets/btn-back.svg';
import bgClose from '../assets/btn-close.svg';
import bgCamera from '../assets/photo-lg-0.svg';
import bgSelect from '../assets/arrows.svg';
import bgIconCamera from '../assets/icon-camera.svg';
import btnSave from '../assets/btn-save.svg';
import Swal from 'sweetalert2';

function AdicionarM() {
    const [formData, setFormData] = useState({
        name: '',
        fk_id_raza: '',
        fk_id_categoria: '',
        fk_id_genero: '',
        foto: '',   
    });

    const [raza, setRaza] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [genero, setGenero] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirige al usuario al login si no hay token almacenado
            window.location.href = '/login';
        } else {
            const fetchData = async () => {
                try {
                    const [razaResponse, categoriaResponse, generoResponse] = await Promise.all([
                        axios.get('http://localhost:3000/listaraza', { headers: { 'token': token } }),
                        axios.get('http://localhost:3000/listarCategoria', { headers: { 'token': token } }),
                        axios.get('http://localhost:3000/listarGenero', { headers: { 'token': token } })
                    ]);
                    console.log('Datos de la raza obtenidos correctamente:', razaResponse.data);
                    console.log('Datos de categoría obtenidos correctamente:', categoriaResponse.data);
                    console.log('Datos de género obtenidos correctamente:', generoResponse.data);
                    setRaza(razaResponse.data);
                    setCategoria(categoriaResponse.data);
                    setGenero(generoResponse.data);
                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                }
            };
            fetchData();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local

        // Verificar si todos los campos están completos
        if (
            formData.name === '' ||
            formData.fk_id_raza === '' ||
            formData.fk_id_categoria === '' ||
            formData.fk_id_genero === ''
        ) {
            // Mostrar una alerta de error si hay campos vacíos
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Por favor, complete todos los campos',
            });
            return; // Detener la ejecución si hay campos vacíos
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('fk_id_raza', formData.fk_id_raza);
        data.append('fk_id_categoria', formData.fk_id_categoria);
        data.append('foto', formData.foto);
        data.append('fk_id_genero', formData.fk_id_genero);
    
        try {
            const response = await axios.post('http://localhost:3000/RegistrarMascota', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token // Añade el token en los encabezados
                }
            });
            console.log('Mascota registrada con éxito:', response.data);

            // Mostrar una alerta de éxito
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Mascota registrada correctamente',
            }).then((result) => {
                // Redirigir al usuario a la lista de mascotas después de hacer clic en OK
                if (result.isConfirmed || result.isDismissed) {
                    window.location.href = '/ListarM';
                }
            });
        } catch (error) {
            console.error('Error registrando mascota:', error);

            // Mostrar una alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Selecciona una imagen',
            });
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    return (
        <div
            className='flex flex-col items-center justify-center min-h-screen'
            style={{ 
                backgroundImage: `url(${bgBlue})`, 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center', 
                paddingBottom: '1vh' 
            }} 
        >
            <div className="flex items-center">
            <Link to="/ListarM">
                <img src={bgBack} alt="Back" className="cursor-pointer mb-20 mr-16" />
                </Link>
                <span className="text-gray-50 mb-20 text-xl">Adicionar Mascota</span>
                <Link to="/">
                <img src={bgClose} alt="Close" className="cursor-pointer mb-20 ml-12" />
                </Link>
            </div>
            <img
    src={formData.mostrarFoto ? formData.mostrarFoto : bgCamera}
    alt="Camera"
    className={`cursor-pointer -mt-8 w-36 h-36 object-cover rounded-full ${formData.mostrarFoto ? '' : 'border-2 border-white'}`}
/>

            <input
                type='text'
                id='name'
                value={formData.name}
                placeholder='Nombre'
                onChange={handleChange}
                name='name'
                className='bg-slate-400 px-3 py-2 rounded-3xl border-gray-300 bg-transparent focus:outline-none ml-1 mt-8 placeholder-gray-500' 
                style={{ height: '40px', width: '350px', backgroundColor: 'rgba(206, 206, 206, 0.8)' }}
                required
            />
            
            <div className="relative mt-5" style={{color: '#717171'}}>
                <select
                    id='raza'
                    value={formData.fk_id_raza}
                    onChange={handleChange}
                    name='fk_id_raza'
                    className='bg-slate-400 px-3 py-2 rounded-3xl border-gray-300 bg-transparent focus:outline-none ml-1 mb-1 placeholder-gray-500 appearance-none'
                    style={{ height: '40px', width: '355px', backgroundColor: 'rgba(206, 206, 206, 0.8)' }}
                    required
                >
                    <option value='' disabled style={{ color: 'rgba(128, 128, 128, 0.6)' }}>Seleccione Raza..</option>
                    {raza.map(razaItem => (
                        <option key={razaItem.id_raza} value={razaItem.id_raza}>{razaItem.nombre_raza}</option>
                    ))}
                </select>
                <img src={bgSelect} alt="Select" className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none" />
            </div>
            
            <div className="relative mt-5" style={{color: '#717171'}}>
                <select
                    id='categoria'
                    value={formData.fk_id_categoria}
                    onChange={handleChange}
                    name='fk_id_categoria'
                    className='bg-slate-400 px-3 py-2 rounded-3xl border-gray-300 bg-transparent focus:outline-none ml-1 mb-1 placeholder-gray-500 appearance-none'
                    style={{ height: '40px', width: '355px', backgroundColor: 'rgba(206, 206, 206, 0.8)' }}
                    required
                >
                    <option value='' disabled style={{ color: 'rgba(128, 128, 128, 0.6)' }}>Seleccione Categoria..</option>
                    {categoria.map(categoriaItem => (
                        <option key={categoriaItem.id_categoria} value={categoriaItem.id_categoria}>{categoriaItem.tipo_categoria}</option>
                    ))}
                </select>
                <img src={bgSelect} alt="Select" className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
    <label htmlFor="foto" className="bg-slate-400 px-3 py-2 rounded-3xl border-gray-300 bg-transparent focus:outline-none mt-4 placeholder-gray-500 cursor-pointer flex" style={{ width: '355px', backgroundColor: 'rgba(206, 206, 206, 0.8)', color: 'grey'}}>
        {formData.foto ? formData.foto.name : 'Subir Foto'}
        <input
            type='file' 
            id='foto'
            onChange={(e) => {
                // Verifica si se ha seleccionado algún archivo
                if (e.target.files.length > 0) {
                    setFormData(prevState => ({
                        ...prevState,
                        foto: e.target.files[0],  // Guarda el primer archivo seleccionado
                        mostrarFoto: URL.createObjectURL(e.target.files[0])  // Crea una URL para mostrar la imagen seleccionada
                    }));
                }
            }}
            name='foto'
            className="hidden"
            required
        />
    </label>
   {/*  <img src={formData.mostrarFoto ? formData.mostrarFoto : bgCamera} alt="Camera" className="cursor-pointer -mt-8" /> */}
</div>


            
            <div className="relative mt-5" style={{color: '#717171'}}>
            <select
        id='genero'
        value={formData.fk_id_genero}
        onChange={(e) => setFormData(prevState => ({ ...prevState, fk_id_genero: e.target.value }))}
        name='fk_id_genero'
        className='bg-slate-400 px-3 py-2 rounded-3xl border-gray-300 bg-transparent focus:outline-none ml-1 mb-1 placeholder-gray-500 appearance-none'
        style={{ height: '40px', width: '355px', backgroundColor: 'rgba(206, 206, 206, 0.8)' }}
        required
    >
        <option value='' disabled style={{ color: 'rgba(128, 128, 128, 0.6)' }}>Seleccione Género..</option>
        {genero.map(generoItem => (
            <option key={generoItem.id_genero} value={generoItem.id_genero}>{generoItem.tipo_generos}</option>
        ))}
    </select>
                <img src={bgSelect} alt="Select" className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none" />
            </div>

            <img src={btnSave} alt="Save" className="cursor-pointer mt-4" onClick={handleSubmit} />

        </div>
    );
}

export default AdicionarM;
