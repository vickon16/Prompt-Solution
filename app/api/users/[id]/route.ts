import User from "@/models/user";
import { connectToDB } from "@/utils/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB(); // we have always call this function if we want to access the database, it is a lambda function that dies after execution.

    const user = await User.findById(params.id); // find particular user by id

    if (!user) return new Response("User not found", {status : 404})

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch user", {
      status: 500,
    });
  }
}