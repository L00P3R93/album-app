"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "@/app/services/userService";

import Card from "@/app/components/Card";

import { User } from "@/app/types";
import Loader from "@/app/components/Loader";

export default function UsersPage() {
    const [users, setUsers] = useState<User[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        fetchUsers().then((users) => {
            setUsers(users);
            setLoading(false);
        });

    }, [fetchUsers]);

    if(loading) return <Loader />;

    return (
        <div className="p-20">
            <h1 className="text-2xl font-bold">Users</h1>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user: User) => (
                    <Card
                        key={user.id}
                        title={user.name}
                        description={`Albums: ${user.albums.length}`}
                        onClick={() => router.push(`/user/${user.id}`)}
                        showButton={true}
                        imageUrl=""
                    />
                ))}
            </div>
        </div>
    )
}
