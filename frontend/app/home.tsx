"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "@/app/services/userService";
import { useAuth } from "@/app/context/AuthContext";
import Card from "@/app/components/Card";

interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    albums: [];
}

const HomePage = () => {
    // @ts-ignore
    const { user } = useAuth();
    const [users, setUsers] = useState<User[] | []>([]);
    const router = useRouter();

    useEffect(() => {
        fetchUsers().then(users => setUsers(users));
    }, [fetchUsers]);

    return (
       <>
           <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

               {user ? (users.map((user) => (
                   <Card
                       key={user.id}
                       title={user.name}
                       description={`Albums: 5`}
                       onClick={() => router.push(`/user/${user.id}`)}
                       showButton={true}
                   />
               ))):(" Login Please")}
           </div>
       </>
    )
}

export default HomePage;