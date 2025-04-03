import axios from "axios";

export const fetchAlbums = async () => {
    const response = await axios.get("http://localhost:5000/api/albums");
    return response.data;
}

export const fetchAlbum = async (id: string | Array<string>) => {
    const response = await axios.get(`http://localhost:5000/api/albums/${id}`);
    return response.data;
}