import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";

export async function GET(request: Request) {
  try {
    await connectToDB(); // we have always call this function if we want to access the database, it is a lambda function that dies after execution.

    const prompts = await Prompt.find({}).populate("creator"); // find all posts and populate creator to know who created the prompts.

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all Prompts", {
      status: 500,
    });
  }
}
