"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "@/app/services/userService";
import { useAuth } from "@/app/context/AuthContext";
import Card from "@/app/components/Card";

import { User } from "@/app/types"

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
               {user ? (users.map((user: User) => (
                   <Card
                       key={user.id}
                       title={user.name}
                       description={`Albums: ${user.albums.length}`}
                       onClick={() => router.push(`/user/${user.id}`)}
                       showButton={true}
                       imageUrl=""
                   />
               ))):(" Login Please")}
           </div>
       </>
    )
}

export default HomePage;