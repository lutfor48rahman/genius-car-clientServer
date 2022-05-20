import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const {serviceId}= useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    // const [user,setUser]=useState({
    //     name:"Lutfor Rahman",
    //     email:"lutforbd810@gmail.com",
    //     address:"mymenshing ,muktagacha",
    //     phone:"015875487584"
    // });

    // const handleAddressChange = event =>{
    //     const {address,...rest} = user;
    //     const newAddress = event.target.value;
    //     const newUser = {address : newAddress,...rest};
    //     console.log(newUser);
    //     setUser(newUser);
    // }
    const handlePlaceOrder = event=>{
        event.preventDefault();
        const order = {
            email: user.email,
            service:service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('http://localhost:5000/order',order)
        .then(response=>{
            console.log(response);
            const [data] = response;
            if(data.insertedId){
                toast('Your order is booked!!');
                event.target.reset();
            }
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please order :{service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" value={user?.displayName} name="name" placeholder='name' required readOnly disabled/>
                <br />
                <input  className='w-100 mb-2' type="email" value={user?.email} name="email" placeholder='email' required readOnly disabled />
                <br />
                <input  className='w-100 mb-2' type="text" readOnly name="servieName" placeholder={service.name} required/>
                <br />
                <input className='w-100 mb-2' type="text" name="address" placeholder='address' required autoComplete='off'/>
                <br />
                <input className='w-100 mb-2' type="text" value={user.phone} name="phone" placeholder='phone number' required autoComplete='off'/>
                <br />
                <input className='w-100 mb-2' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;