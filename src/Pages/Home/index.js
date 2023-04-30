import './style.css'
import api from "../../Services/api"
import { desconectar, pegarToken } from "../../Services/localstorage"

export const Home = () =>{

    const finalizarSessao = async () =>{
        try{
            const data ={
                headers:{
                    token:pegarToken()
                }
            }
            console.log(data)
            const res = await api.get('/deletar_token',data)

            if(res.status === 200){
                desconectar()
                window.location.href = '/'
            }

        }catch(err){
            console.log(err)
        }
    }
    return(
        
        <div className="container-home">
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
                    <p>Titulo:</p>
                    <input type='text'></input>
                    <p>Descrição:</p>
                    <input type='text'></input>
                    <button>Adicionar</button>
                </div>
                <div className='container-home-itens-formulario'>
                    
                </div>
            </div>
        </div>
        
    )
}

