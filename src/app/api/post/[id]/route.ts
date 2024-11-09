/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/dbConfig/db";
import postModel from "../../../../../models/postModels";


export async function GET(req: any, {params}: any) {
    try {
        await connectDB()
        const id = await params.id
        console.log(id)
        const postData = await postModel.find({ _id: id })
        return Response.json(postData);
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
            console.log("Id: "+params.id)
    }
}
