"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

    const path = usePathname()

    return (
        <header className=" bg-white shadow-lg">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <Link href="/" className="text-2xl"><h1>Content Cave</h1></Link>
                {path !== "/login" && 
                <nav className="space-x-4">
                    <Link href="/" className="text-blue-500">Home</Link>
                    <Link href="/about" className="text-blue-500">About</Link>
                    <Link href="/contact" className="text-blue-500">Contact</Link>
                    <Link href="/create_blog" className="text-blue-500">Create Blog</Link>
                    <Link href="/profile" className="text-blue-500">Profile</Link>
                </nav>
            }
            </div>
        </header>
    )
}