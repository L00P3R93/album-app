"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUser } from "@/app/services/userService";
import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";

interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    albums: [];
}

export default function SingleUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { id } = useParams();

    useEffect(() => {
        if(id){
            fetchUser(id).then(setUser)
            setLoading(false)
        }
    }, [id]);

    if(loading) return <Loader />;

    // @ts-ignore
    return (
        <div className="p-20">
            <Card
                title={user?.name}
                description={user?.email}
                onClick={()=>{}}
            />
        </div>
    );
}
