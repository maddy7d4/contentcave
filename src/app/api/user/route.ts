import connectDB from "@/dbConfig/db";
import userModel from "../../../../models/authenticationModels";

export const POST = async (req: any) => {
    const body = await req.json();
    try {
        await connectDB();
        const user = await userModel.find({ email: body.email});
        return new Response(JSON.stringify({ user , message: "User found successfully" }), {
            status: 200,
            headers: { 'content-type': 'application/json' }
        });
    } catch (error) {
        console.log(error);

    }
}