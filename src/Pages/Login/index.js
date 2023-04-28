import React, { useState } from "react";
import './style.css'
import api from "../../Services/api";
import { Link } from "react-router-dom";
import Mensagem from "../../Components/Mensagem";
import {setarIdUsuario, setarNomeUsuario, loginToken} from '../../Services/localstorage.js'

export const Login = (props) =>{

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [msg, setMsg] = useState('')

    //Fazendo a requisição pro back-end, para efetuar o login
    const login = async () =>{

        try{
            //enviando os dados necessários para o login
            const data = {usuario,senha}
            const res = await api.post('/login', data)

            if(msg){
                setMsg('')
            }
            
            if(res.data.status === 400){
                setMsg(res.data.mensagem)
            }else{
                console.log(res)
                loginToken(res.data.token)
                setarIdUsuario(res.data.id_usuario)
                setarNomeUsuario(res.data.usuario)

                window.location.href ='/Home'
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="container">
            <div className="container-texto">
                <div className="container-texto-titulo">
                    <h1>SAVE<span>TASK</span></h1>
                </div>
                <div className="container-texto-mensagem">
                    <h3>Bem-vindo ao to do list, sua nova ferramenta de produtividade! Com ele, você pode listar e organizar todas as suas tarefas pendentes, definir prioridades e monitorar o progresso. Com essa abordagem simplificada, você pode aumentar significativamente sua eficiência e alcançar seus objetivos com mais facilidade.</h3>
                </div>
            </div>
            <div className="container-formulario">
                <div className="container-formulario-titulo">
                    <h1>Faça o login</h1>
                </div>
                <div className="container-formulario-itens">
                    <p>Usuario:</p>
                    <input value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Digite seu usuario" type="text"/>
                    <p>Senha:</p>
                    <input value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha" type="password"/>
                    <button onClick={login}>Login</button>
                    <Link to='/cadastro'>Não possui uma conta?</Link>
                </div>
                <div className="container-formulario-mensagem">
                    {msg&&
                        <Mensagem tipo='erro' msg={msg}/>
                    }
                </div>
            </div>
        </div>
    )
}