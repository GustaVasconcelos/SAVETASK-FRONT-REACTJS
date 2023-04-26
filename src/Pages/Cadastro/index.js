import React, { useState } from "react";
import './style.css'
import api from "../../Services/api";
import { Link } from "react-router-dom";
import Mensagem from "../../Components/Mensagem";


export const Cadastro = () =>{

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmacao, setConfirmacao] = useState('')

    const [msg, setMsg] = useState('')
    const [tipo, setTipo] = useState('')

    const cadastrar = async () =>{

        try{
            //enviando os dados necessários para o login
            const data = {usuario,senha, confirmacao}
            const res = await api.post('/cadastro_usuario', data)
            console.log(res)
            if(msg){
                setMsg('')
                setTipo('')
            }

            if(res.data.status === 400){
                setMsg(res.data.message)
                setTipo('erro')
                
            }else{
                console.log(res)
                setMsg(res.data.message)
                setTipo('sucesso')
            }
        }catch(err){
            console.log(err)
        }
    }

    return(
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
                    <h1>Faça seu cadastro</h1>
                </div>
                <div className="container-formulario-itens">
                    <p>Usuario:</p>
                    <input  placeholder="Digite seu usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} type="text"/>
                    <p>Senha:</p>
                    <input  placeholder="Digite sua senha"value={senha} onChange={(e) => setSenha(e.target.value)} type="password"/>
                    <p>Confirmação</p>
                    <input  placeholder="Digite sua senha novamente" value={confirmacao} onChange={(e) => setConfirmacao(e.target.value)} type="password"/>
                    <button onClick={cadastrar}>Cadastrar</button>
                    <Link to='/'>Já possui uma conta?</Link>
                </div>
                <div className="container-formulario-mensagem">
                        {msg&&
                            <Mensagem tipo={tipo} msg={msg}/>
                        }
                    </div>
            </div>
        </div>
    )
}