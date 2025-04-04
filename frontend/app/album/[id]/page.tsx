"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAlbum } from "@/app/services/albumService";
import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";

import { Album } from "@/app/types"

export default function SingleAlbum() {
    const [album, setAlbum] = useState<Album | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setLoading(true); // Set loading to true when starting the fetch
            fetchAlbum(id)
                .then((album_) => {
                    setAlbum(album_);
                    setLoading(false); // Set loading to false once the user data is fetched
                })
                .catch((error) => {
                    console.error("Error fetching album:", error);
                    setLoading(false); // Set loading to false in case of error
                });
        }
    }, [id]);

    if(loading) return <Loader />;

    if (!album) {
        return <div>Album not found</div>;
    }

    return (
        <div className="p-20">
            <Card
                title={album.title}
                description={`User: ${album.user.name}`}
                showButton={false}
                imageUrl={album.photos[0].url}
                onClick={()=> {}}
            />
        </div>
    );
}
