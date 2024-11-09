"use client"
import axios from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

export default function Post({ params }: any) {
    const [post, setPost] = useState<any>([]);
    const id = params.id
    const [loading, setLoading] = useState(false);

    const fetchPost = async () => { 
        try{
            const response = await axios.get('/api/post/'+id);
            const data = await response.data;
            setPost(data);
            console.log(data)
            setLoading(false)
        } catch (error) {   
            console.log(error);
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchPost()
        if (process.env.NODE_ENV === "development") {
            setInterval(() => {
                document.querySelector("body > nextjs-portal")?.remove();
            }, 10);
        }
     }, [])

     return(
        <>
        {loading && 
                 <div className="p-4 flex justify-center items-center w-[97vw] h-[88vh]" >
                     <h3 className="text-2xl" >Loading...</h3>
                 </div>
}
        {post && post.map((item: any)=> (
            <div key={item._id} className="container mx-auto px-4 py-6 flex flex-col justify-center items-center" >
                <img src={item.image} alt={item.title} height={"600px"} width={"600px"} className="mb-4" />
                <h1 className="text-4xl font-bold mb-4" >{item.title}</h1>
                <p>{item.description}</p>
            </div>
        ))}
        </>
     )
}