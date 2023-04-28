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
        <div>
            <button onClick={finalizarSessao}>desconectar</button>
        </div>
    )
}

