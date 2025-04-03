"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAlbums } from "@/app/services/albumService";
import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";

interface Album {
    id: string;
    title: string;
}

export default function AlbumPage() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();


    useEffect(() => {
        fetchAlbums().then(setAlbums)
        setLoading(false)
    }, [fetchAlbums]);

    if(loading) return <Loader />;


    return (
        <div className="p-20">
            <h1 className="text-2xl font-bold">Albums</h1>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {albums.map(album => (
                    <Card
                        key={album.id}
                        title={album.title}
                        description={`Albums: 5`}
                        onClick={() => router.push(`/album/${album.id}`)}
                        showButton={true}
                    />
                ))}
            </div>
        </div>
    );
}