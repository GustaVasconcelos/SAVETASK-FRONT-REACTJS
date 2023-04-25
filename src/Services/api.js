import axios from 'axios'
//  Url da api
const api = axios.create({
    baseURL:"https://savetasks-node-api.vercel.app/"
})

export default api