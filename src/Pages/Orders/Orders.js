import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Orders = () => {
    const [user] = useAuthState(auth);
    const [order,setOrder] = useState([]);
    useEffect(()=>{
        const url = `http://localhost:5000/order?email=${user.email}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>setOrder(data));
    },[user])
    return (
        <div>
            <h1>Orders page:{order.length}</h1>
        </div>
    );
};

export default Orders;