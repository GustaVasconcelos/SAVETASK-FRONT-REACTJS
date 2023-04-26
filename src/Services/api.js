import axios from 'axios'
//  Url da api
const api = axios.create({
    baseURL:"https://savetasks-node-api-gustavasconcelos.vercel.app/"
})

export default api