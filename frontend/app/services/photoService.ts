import axios from "axios";

export const fetchPhotos = async () => {
    const response = await axios.get("http://localhost:5000/api/photos");
    return response.data;
}