import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB(); // we have always call this function if we want to access the database, it is a lambda function that dies after execution.

    const prompts = await Prompt.find({ creator: params.id }).populate("creator"); // find all prompts by a particular creator and populate the creator object

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch user", {
      status: 500,
    });
  }
}
