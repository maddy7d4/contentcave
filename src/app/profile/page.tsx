"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {

    const router = useRouter()
    const [user, setUser] = useState()

    const getUser = async () => {
        try{
            const cookie =  await parseCookies()
            const payload = {
                email: cookie.user,
            }
            const respnse = await axios.post("/api/user",payload)    
            setUser(respnse.data.user)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    
    const handleLogout = async (e: any) => {
        e.preventDefault();
        destroyCookie(null, "user");
        toast.success("Logged out successfully")
        router.push("/login")
    }

    return (
        <div className="flex flex-col justify-center items-center h-[80vh]" >
            <h1 className="text-4xl font-bold mb-4">Profile</h1>
            <p className="text-2xl" >{user && user[0].email || "Loading"}</p>
            <button className="bg-red-500 text-white px-2 py-2 rounded mt-6" onClick={handleLogout} >Logout</button>
        </div>
    )
}