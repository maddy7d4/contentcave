import connectDB from "@/dbConfig/db";
import enquiryModel from "../../../../models/enquiryModels";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
    const body = await req.json()
    console.log(body)
    try{
        connectDB()
        enquiryModel.create(body)
        return new Response(JSON.stringify({ message: "Enquiry sent successfully" }), { status: 200, headers: { 'content-type': 'application/json' } })
    } catch (error) {
        console.log(error)
    }
}