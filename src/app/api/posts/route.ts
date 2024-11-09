/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/dbConfig/db";
import postModel from "../../../../models/postModels";

export async function GET(req: any) {
    const query = req.nextUrl.searchParams.get('q');
    let postData;
    try {
        await connectDB()
        if (query) {
            postData = await postModel.find({
                $or: [
                    { title: new RegExp(query, "i") },
                    { description: new RegExp(query, "i") }
                ]
            })
        }else{
            postData = await postModel.find({})
        }
        return new Response(JSON.stringify(postData), { status: 200, headers: { 'content-type': 'application/json' } })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

export const POST = async (req: any) => {
    const body = await req.json();
    try {
        await connectDB();
        await postModel.create(body);
        return new Response(JSON.stringify({ message: "Post created successfully" }), { status: 200, headers: { 'content-type': 'application/json' } })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

