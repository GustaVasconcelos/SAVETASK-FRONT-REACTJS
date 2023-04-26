import { Routes, Route } from 'react-router-dom'
import { Login } from '../Pages/Login'
import { Cadastro } from '../Pages/Cadastro'
// import RotaPrivada from '../Services/authenticacao'

const Conteudo = props => (
    <main >
        {/* Rotas existente do projeto*/}
        <Routes>
            <Route exact path="/" element={<Login/>}></Route>
            <Route exact path="/cadastro" element={<Cadastro/>}/>
        </Routes>
    </main>
)


export default Conteudo
