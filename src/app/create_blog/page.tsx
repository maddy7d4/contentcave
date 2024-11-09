"use client"

import axios from "axios";
import { Metadata } from "next"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateBlog() {

    const [blogData, setBlogData] = useState({
        title: '',
        image: '',
        content: ''
    })
    const route = useRouter()

    const createBlog = async (e: any) => {
        e.preventDefault();
        const payload = blogData.title && blogData.image && blogData.content ? {
            "title": blogData.title,
            "image": blogData.image,
            "description": blogData.content
        } : toast.error("Please fill all the details")
        if(blogData.title && blogData.image && blogData.content){ 
            const response = await axios.post('/api/posts', payload)
            toast.success(response.data.message)
            route.push('/')
        }
    }

    return(
        <main className="container mx-auto px-4 py-6 flex flex-col justify-center items-center h-[80vh]  ">
            <h2 className="text-4xl font-bold mb-4">Create Blog</h2>
            <form className="w-full max-w-lg" onSubmit={createBlog}>
                <div className="flex items-center mb-4">
                    <label htmlFor="name" className="w-1/4">Title:</label>
                    <input onChange={(e) => setBlogData({...blogData, title: e.target.value})} type="text" id="name" placeholder="Blog title" className="border rounded px-2 py-1 w-3/4" />
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="email" className="w-1/4">Image:</label>
                    <input onChange={(e) => setBlogData({...blogData, image: e.target.value})} type="text" placeholder="Image URL" id="email" className="border rounded px-2 py-1 w-3/4" />
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="message" className="w-1/4">Content:</label>
                    <textarea onChange={(e) => setBlogData({...blogData, content: e.target.value})} id="message" placeholder="Write your blog here" className="border rounded px-2 py-1 w-3/4" rows={4}></textarea>
                </div>
                <div className="flex justify-end" >
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >Submit</button>
                </div>
            </form>
        </main>
    )
}