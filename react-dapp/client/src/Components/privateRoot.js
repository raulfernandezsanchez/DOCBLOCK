import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) =>{
    //posibilidad de completar con la comprobación de si es empresa o usuario (ambos autenticados pero con diferentes "posibilidades")
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === null || !isAuthenticated){
        alert("To access this page you need to log in")
        return <Navigate to="/login"/>
    }
    else{
        return children;
    }
};