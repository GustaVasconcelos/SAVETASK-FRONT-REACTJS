import React, { useState } from "react";
import './style.css'
import api from "../../Services/api";
import { Link } from "react-router-dom";


export const Login = (props) =>{
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    const login = async () =>{

        try{
            const data = {usuario,senha}
            const res = await api.post('/login', data)

            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="container-login">
            <div className="container-login-texto">
                <div className="container-login-texto-titulo">
                    <h1>SAVE<span>TASK</span></h1>
                </div>
                <div className="container-login-texto-mensagem">
                    <h3>Bem-vindo ao to do list, sua nova ferramenta de produtividade! Com ele, você pode listar e organizar todas as suas tarefas pendentes, definir prioridades e monitorar o progresso. Com essa abordagem simplificada, você pode aumentar significativamente sua eficiência e alcançar seus objetivos com mais facilidade.</h3>
                </div>
            </div>
            <div className="container-login-formulario">
                <div className="container-login-formulario-titulo">
                    <h1>Faça o login</h1>
                </div>
                <div className="container-login-formulario-itens">
                    
                    <input value={usuario} onChange={(e) => setUsuario(e.target.value)} type="text"/>
                    <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password"/>
                    <button onClick={login}>Login</button>
                    <Link>Não possui uma conta?</Link>
                    <div className="container-login-formulario-mensagem">

                    </div>
                </div>
            </div>
        </div>
    )
}