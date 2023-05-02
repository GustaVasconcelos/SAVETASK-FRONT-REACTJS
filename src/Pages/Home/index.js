import './style.css'
import { useEffect, useState } from 'react'

import { desconectar, pegarIdUsuario, pegarToken } from "../../Services/localstorage"
import Mensagem from '../../Components/Mensagem'
import api from "../../Services/api"

import { FaTrashAlt } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';

export const Home = () =>{
    const [msg, setMsg] = useState('')
    const [tipo, setTipo] = useState('')

    const [carregado, setCarregado] = useState(false)
    const [titulo, setTitulo] = useState('')
    const [tarefas, setTarefas] = useState()

    const pegarUsuario = async () =>{

        try{        
            const res = await api.get('pesquisar_usuario/'+pegarIdUsuario())
            setTarefas(res.data.usuario.tarefas)
            setCarregado(true)
        }catch(err){
            console.log(err)
        }
    }

    const adicionarTarefa = async () =>{
        const data = {
            id_usuario:pegarIdUsuario(),
            titulo
        }

        if(msg){
            console.log(msg)
            setMsg('')
        }
        try{
            
            const res = await api.patch('/adicionar_tarefa', data)

            if(res.data.status === 400){
                
                setMsg(res.data.mensagem)
                setTipo('erro')
                console.log(msg)
                
            }else{
                
                setMsg(res.data.mensagem)
                setTipo('sucesso')
            }   
        }catch(err){
            console.log(err)
        }


    }

    const deletarTarefa = async (id_tarefa) =>{

        const data = {
            id_usuario:pegarIdUsuario(),
            id_tarefa
        }
        if(msg){
            console.log(msg)
            setMsg('')
        }

        try{

            const res = await api.patch('/deletar_tarefa', data)
            
    
            if(res.data.status === 400){
                setMsg(res.data.mensagem)
                setTipo('erro')
                
            }else{
                setMsg(res.data.mensagem)
                setTipo('sucesso')
            }  
        }catch(err){
            console.log(err)
        }
    }
    const finalizarSessao = async () =>{

        const data ={
            headers:{
                token:pegarToken()
            }
        }

        try{

            const res = await api.get('/deletar_token',data)

            if(res.status === 200){
                desconectar()
                window.location.href = '/'
            }

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        pegarUsuario()
    })
    return(
        
        <div className="container-home">
            {carregado?(
                <>
                    <div className='container-home-header'>
                        <div className="container-home-titulo">
                            <h1>SAVE<span>TASK</span></h1>
                        </div>
                        <div className='container-home-desconectar'>
                            <button onClick={finalizarSessao}>Desconectar</button>
                        </div>
                    </div>
                    <div className='container-home-itens'>
                        <div className='container-home-itens-formulario'>
                            <p className='container-home-itens-formulario-label'>Tarefa:</p>
                            <input type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder='Digite o nome da tarefa'></input>
                            <button onClick={adicionarTarefa}>Adicionar</button>
                            <div className='container-home-itens-formulario-mensagem'>
                                {msg&&
                                    <Mensagem tipo={tipo} msg={msg}/>
                                }
                            </div>
                        </div>
                        <div className='container-home-tarefas' >
                            <div className='container-home-tarefas-overflow'>
                                {tarefas.length === 0&&
                                    <h3 className='container-home-tarefas-aviso'>Você não possui tarefas cadastradas</h3>
                                }
                                {tarefas.map((item, index) =>(
                                    <div className='container-home-tarefas-box' key={index}>
                                        <div className='container-home-tarefas-box-texto'>
                                            <p>{item.titulo}</p>
                                        </div>
                                        <div className='container-home-tarefas-box-deletar'>
                                            <FaTrashAlt onClick={() => deletarTarefa(item.id_tarefa)}></FaTrashAlt>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
        
            ):(
                <CircularProgress></CircularProgress>
            )}
            
        </div>
        
    )
}

