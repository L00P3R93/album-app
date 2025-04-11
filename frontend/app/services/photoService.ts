import axios from "axios";

import { Photo, ApiResponse  } from "@/app/types";

const API_URL = "http://localhost:5000/api/photos";

export const fetchPhotos = async () : Promise<ApiResponse<Photo[]>> => {
    try{
        const response = await axios.get(API_URL);
        return { data: response.data };
    }catch (error) {
        console.error('Error fetching photos:', error);
        return { error: error instanceof Error ? error.message: 'Failed to fetch photos!' }
    }
}

export const fetchPhoto = async (id: number) : Promise<ApiResponse<Photo>> => {
    try{
        const response = await axios.get(`${API_URL}/${id}`);
        return { data: response.data };
    }catch (error) {
        console.error('Error fetching photo:', error);
        return { error: error instanceof Error ? error.message: 'Failed to fetch photo!' }
    }
}