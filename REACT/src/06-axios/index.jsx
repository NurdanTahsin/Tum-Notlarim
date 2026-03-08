import axios from 'axios'
import { use, useEffect } from 'react';

const BASE_URL = "http://localhost:4000"

function Index() {

    const getAllUsers = async () => {
        const response = await axios.get(`${BASE_URL}/users`)
        console.log(response.data);
    }

    const getUserById = async (id) => {
        const response = await axios.get(`${BASE_URL}/users/${id}`)
        console.log(response.data);
    }

    const createUser = async (newUser) => {
        const response = await axios.post(`${BASE_URL}/users`, newUser)
        console.log(response.data);
    }

    const updateUser = async (id, updatedUser) => {
        const response = await axios.put(`${BASE_URL}/users/${id}`, updatedUser)
        console.log(response.data);
    }

    const deleteuserById = async (id) => {
        const response = await axios.delete(`${BASE_URL}/users/${id}`)
        console.log(response.data);
    }

    useEffect(() => {
        // getAllUsers();
        // getUserById(1);

        // const newUser = {
        //     id: 4,
        //     username: "Ahmet",
        //     password: "123456"
        // }
        // createUser(newUser);

        // updateUser("3", {
        //     username: "Updated User",
        //     password: "updatedpassword"
        // })

        deleteuserById(3);
    }, [])

    return (
        <div>

        </div>
    )
}
export default Index