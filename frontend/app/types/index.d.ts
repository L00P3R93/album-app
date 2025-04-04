export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    albums: Album[];
}

export interface Photo {
    id: string;
    title: string;
    url: string;
}

export interface Album {
    id: string;
    title: string;
    user: User;
    photos: Photo;
}