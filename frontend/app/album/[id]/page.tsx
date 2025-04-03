"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAlbum } from "@/app/services/albumService";
import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";


interface Album {
    id: string;
    title: string;
    userId: string;
}

export default function SingleAlbum() {
    const [album, setAlbum] = useState<Album | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { id } = useParams();

    useEffect(() => {
        if(id){
            fetchAlbum(id).then(setAlbum);
            setLoading(false);
        }
    }, [id]);

    if(loading) return <Loader />;

    return (
        <div className="p-20">
            <Card
                title={album?.title}
                description={album?.userId}
                showButton={false}
            />
        </div>
    );
}
