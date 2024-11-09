import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About"
}

export default function About() {
    return (
        <div>
            <main className="container mx-auto px-4 py-6 flex flex-col justify-center items-center h-[80vh]">
                <h2 className="text-4xl font-bold mb-4">About Us</h2>
                <p>This is a blog app created using Next.js by Heisenberg</p>
            </main>
        </div>
    );
}   