import React,{useEffect, useState} from "react";
import api from './api'

import {Navigate} from 'react-router-dom'
import { desconectar, pegarToken } from "./localstorage";

import CircularProgress from '@mui/material/CircularProgress';


export default function WAuth({children, redirectTo}){
    const [redirect,setRedirect] = useState(false)
    const [loading,setLoading] = useState(true)

    useEffect(() =>{
        try{
            const verify = async () =>{
                
                const res = await api.get('/verificar_token',{params:{token:pegarToken()}})

                if(res.data.status === 400 || res.data.status === 401){
                    desconectar()
                    setLoading(false)
                    setRedirect(true)
                    
                }else{
                    setLoading(false)
                    setRedirect(false)
                }
            }

            verify()

        }catch(err){
            console.log(err)
        }

    },[])

    return loading?<CircularProgress></CircularProgress>:!redirect? children : <Navigate to={redirectTo}/>
};