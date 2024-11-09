import connectDB from "@/dbConfig/db";
import userModel from "../../../../models/authenticationModels";

export const POST = async (req:any) => {
    const body = await req.json();
    try{
        await connectDB()
        if (body.email && body.password) {
            await userModel.create(body);
            return new Response(JSON.stringify({ message: "User created successfully" }), { status: 200, headers: { 'content-type': 'application/json' } })
        } else {
            return new Response(JSON.stringify({ message: "User not created" }), { status: 400, headers: { 'content-type': 'application/json' } })
        }
    }catch(err){}
    await connectDB()

}