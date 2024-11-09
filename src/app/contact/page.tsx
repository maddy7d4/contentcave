"use client"

import axios from "axios"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";


export default function Contact() {
    
    const router = useRouter()
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        message: ""
    })

    const saveEnquiry = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const payload = contactData.name && contactData.email && contactData.message ? contactData : toast.error("Please fill all the details")
        if (contactData.name && contactData.email && contactData.message) {
            const response = await axios.post ('/api/enquiry', payload);
            toast.success(response.data.message)
            console.log(response.data)
            router.push('/');
        }
    }

    return (
        <main className="container mx-auto px-4 py-6 flex flex-col justify-center items-center h-[80vh]  ">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <form className="w-full max-w-lg" onSubmit={saveEnquiry}>
                <div className="flex items-center mb-4">
                    <label htmlFor="name" className="w-1/4">Name:</label>
                    <input type="text" id="name" onChange={(e) => setContactData({...contactData, name: e.target.value})} placeholder="Enter your name" className="border rounded px-2 py-1 w-3/4"/>
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="email" className="w-1/4">Email:</label>
                    <input type="email" onChange={(e) => setContactData({...contactData, email: e.target.value})} placeholder="Enter your email" id="email" className="border rounded px-2 py-1 w-3/4"/>
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="message" className="w-1/4">Message:</label>
                    <textarea onChange={(e) => setContactData({...contactData, message: e.target.value})} id="message" placeholder="Enter your message..." className="border rounded px-2 py-1 w-3/4" rows={4}></textarea>
                </div>
                <div className="flex justify-end" >
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                 >Submit</button>
                </div>
            </form>
        </main>

    )
}