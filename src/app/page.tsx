/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";


export default function Home() {

  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>("");

  const fetchData = async (query ?: string) => {
    try {
      const response = await axios.get(query?.length ? `/api/posts?q=${query}` : `/api/posts`);
      setPosts(response.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
    console.log(posts)
  }, [])

  const searchPost = () => {
    if(search)
      fetchData(search) 
  }


  return (
    <>
      <main className="container mx-auto px-4 py-6">
        {/* <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
      </main>
      <div className="flex justify-end px-4">
        <input onKeyDown={(e) => e.key === "Enter" && searchPost() || searchPost()} onChange={(e) => setSearch(e.target.value)} type="text" className="px-4 py-2 border border-gray-300 rounded-md" placeholder="Search..." />
        <button disabled={!search} onClick={searchPost} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">Search</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4 cursor-pointer h-[59.5vh] ">
        {loading ? (
          <div className="p-4 flex justify-center items-center w-[97vw] h-[47vh]" >
            <h3 className="text-2xl" >Loading...</h3>
          </div>
        ) : 
          !loading && posts?.length?
            posts?.map((post: any) => {
            return (
              <Link key={post._id} href={"/posts/" + post._id} >
                <div className="border border-gray-200 p-4" key={post._id} >
                  <img className="w-full h-48 object-cover mb-4" src={post.image} alt="Post Image" />
                  <h2 className="text-xl font-semibold mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600">{post.short_desc}</p>
                </div>
              </Link>
            )
          }) : 
            <div className="p-4 flex justify-center items-center w-[97vw] h-[47vh]" >
              <h3 className="text-2xl" >No Post Found</h3>
            </div>
          }

      </div>

    </>
  );
}
