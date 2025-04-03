import axios from "axios";

export const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/users");
    return response.data;
}

export const fetchUser = async (id: string | Array<string>) => {
    const response = await axios.get(`http://localhost:5000/api/users/${id}`)
    return response.data
}