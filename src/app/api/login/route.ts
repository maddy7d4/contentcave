import connectDB from "@/dbConfig/db";
import userModel from "../../../../models/authenticationModels";

export const POST = async (req: any) => {
    const body = await req.json();
    try {
        await connectDB();
        const user = await userModel.findOne({ email: body.email, password: body.password });
        if (user) {
            // Create a new response
            const response = new Response(JSON.stringify({ message: "User logged in successfully", body }), {
                status: 200,
                headers: { 'content-type': 'application/json' }
            });            
            return response;
        } else {
            return new Response(JSON.stringify({ message: "Invalid credentials" }), { 
                status: 400, 
                headers: { 'content-type': 'application/json' } 
            });
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Server error" }), { 
            status: 500, 
            headers: { 'content-type': 'application/json' } 
        });
    }
}

