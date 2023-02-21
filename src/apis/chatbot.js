import axios from '../axiosClients'


export const apiSendMessage = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/v1/chatbot/',
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})