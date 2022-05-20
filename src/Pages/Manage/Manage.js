import React from 'react';
import useServices from '../../hooks/useServices';

const Manage = () => {
    const [services,setServices]= useServices();

    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure?');
        if(proceed){
            const url = `http://localhost:5000/service/${id}`;
            fetch(url,{
                method:"DELETE"
            })
            .then(res=>res.json())
            .then(data =>{
                 console.log(data);
                 const remaining = services.filter(service => service._id !== id);
                 setServices(remaining);
                
                });
        }
    }
    return (
        <div>
            {
                services.map(service=> <div>{service.name} <button onClick={()=>handleDelete(service._id)}>X</button></div>)
            }
        </div>
    );
};

export default Manage;