"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "@/app/services/userService";

import Card from "@/app/components/Card";

interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    albums: [];
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        fetchUsers().then(users => setUsers(users));
        setLoading(false);
    }, [fetchUsers]);

    return (
        <div className="p-20">
            <h1 className="text-2xl font-bold">Users</h1>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <Card
                        key={user.id}
                        title={user.name}
                        description={user.email}
                        onClick={() => router.push(`/user/${user.id}`)}
                        showButton={false}
                    />
                ))}
            </div>
        </div>
    )
}
