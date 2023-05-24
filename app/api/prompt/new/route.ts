import { connectToDB } from "@/utils/db";
import Prompt from "@/models/prompt";

export async function POST(request: Request) {
  const { userId, promptText, tag } : CreatePromptType = await request.json();

  try {
    await connectToDB(); // we have always call this function if we want to access the database, it is a lambda function that dies after execution.
    const newPrompt = new Prompt({
      creator : userId, tag, promptText
    })

    await newPrompt.save() // save to the database;

    return new Response(JSON.stringify(newPrompt), {
      status : 201
    })
  } catch (error) {
    return new Response("Failed to create a new prompt", {
      status : 500
    })
  }
}
