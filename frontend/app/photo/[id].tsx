import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchPhotos } from "@/app/services/photoService";
import Loader from "@/app/components/Loader";

interface Photo {
    id: string;
    title: string;
    url: string;
}

const PhotoPage: React.FC = () => {
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [loading, setLoading] = useState<boolean>();

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if(id){
            fetchPhotos().then((photos: Photo[]) => {
                const selectedPhoto = photos.find((photo) => photo.id === id);
                if(selectedPhoto) setPhoto(selectedPhoto);
                setLoading(false)
            });
        }
    }, [id]);

    if(loading) return <Loader />;

    return (
        <div className="p-4">
            <img src={photo?.url} alt={photo?.title} className="w-full h-auto rounded-lg shadow-lg" />
            <h1 className="text-2xl font-bold mt-4">{photo?.title}</h1>
            {/* More photo details */}
        </div>
    );
}

export default PhotoPage;