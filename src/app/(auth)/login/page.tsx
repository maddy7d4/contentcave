"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const route = useRouter()
    const loginUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const payload = user.email && user.password ? {
            email: user.email,
            password: user.password
        } : toast.error("Please fill all the details")
        setUser({ email: "", password: "" })
        try{
            const response = await axios.post('/api/login/', payload)
            console.log(response.data)
            toast.success(response.data.message)
            setCookie({res: response}, "user", response.data.body.email, {maxAge: 30 * 24 * 60 * 60})
            route.push('/')
        }catch(error:any){
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="flex justify-center items-center flex-col h-[80vh]">
            <h1 className="text-2xl mb-8" >Login</h1>
            <form className="flex flex-col gap-4" onSubmit={loginUser} >
                <label htmlFor="email">Email:  <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="ml-8 border-2" type="email" name="email" placeholder="email" /></label>
                <label htmlFor="password">Password: <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="ml-2 border-2" type="password" name="password" placeholder="password" /></label>
                <button type="submit" className="bg-blue-500 text-white  py-2 rounded" >Login</button>
            </form>
            <p>Don't have an account? <Link href="/signup" className="text-blue-500">Signup</Link></p>
        </div>
    )
}