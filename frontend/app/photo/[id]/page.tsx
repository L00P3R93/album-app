"use client";

import { useEffect, useState } from "react";
import {useParams, useRouter} from "next/navigation";
import { fetchPhoto } from "@/app/services/photoService";

import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";
import { Photo } from "@/app/types";


export default function SinglePhoto() {
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const { id } = useParams();

    useEffect(() => {
        const loadPhoto = async () => {
            try {
                if (!id) { throw new Error("No photo ID provided"); }

                // Convert id to string if it's an array
                const photoId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
                const { data, error } = await fetchPhoto(photoId);
                if (error) { throw new Error(error); }
                if (!data) { throw new Error("Photo not found"); }
                setPhoto(data);
            } catch (error) {
                console.error("Error fetching photo: ", error);
                setError(error instanceof Error ? error.message : "Failed to load photo data");
            } finally {
                setLoading(false)
            }
        }
        loadPhoto();
    }, []);

    if (loading) return <Loader/>;
    if (error) return <div className="p-20 text-red-500">{error}</div>
    if (!photo) return <div className="p-20">Photo not found</div>

    const photoTitle = photo.title || 'No Photo Title';
    const albumTitle = photo.album.title || 'No Album Title';
    const userName = photo.album.user.name || 'No User Name';
    const photoUrl = photo.url || '';

    return (
        <div className="p-20">
            <Card
                title={photoTitle}
                description={`Album: ${albumTitle} | User: ${userName}`}
                onClick={() => {}}
                showButton={false}
                imageUrl={photoUrl}
            />
        </div>
    );
}