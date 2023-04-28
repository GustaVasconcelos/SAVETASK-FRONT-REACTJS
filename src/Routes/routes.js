import { Routes, Route } from 'react-router-dom'
import { Login } from '../Pages/Login'
import { Cadastro } from '../Pages/Cadastro'
import PrivateRoute from '../Services/wAuth'
import { Home } from '../Pages/Home'

const Conteudo = props => (
    <main >
        {/* Rotas existente do projeto*/}
        <Routes>
            <Route exact path="/" element={<Login/>}></Route>
            <Route exact path="/cadastro" element={<Cadastro/>}/>
            <Route exact path='/Home' element={<PrivateRoute redirectTo='/'><Home/></PrivateRoute>}></Route>
            <Route path="*" element={<Login/>}></Route>
        </Routes>
    </main>
)


export default Conteudo
