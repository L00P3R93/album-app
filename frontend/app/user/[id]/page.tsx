"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUser } from "@/app/services/userService";
import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";
import { User } from "@/app/types"

export default function SingleUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchUser(id)
                .then(user=> {
                    setUser(user)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                    setLoading(false); // Set loading to false in case of error
                });
        }
    }, [id]);


    if(loading) return <Loader />;

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="p-20">
            <Card
                title={user.name}
                description={`Album Count: ${user.albums ? user.albums.length : 0}`}
                onClick={() => {}}
                showButton={false}
                imageUrl=""
            />
        </div>
    );
}
