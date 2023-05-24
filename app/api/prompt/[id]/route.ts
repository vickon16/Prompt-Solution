import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";

// GET (read)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB(); // we have always call this function if we want to access the database, it is a lambda function that dies after execution.

    const prompt = await Prompt.findById(params.id).populate("creator"); // find a prompt with an id and populate creator to know who created the prompts.

    if (!prompt) return new Response("Prompt not found", {status : 404})

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompt", {
      status: 500,
    });
  }
}

// PATCH (update)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const {promptText, tag} : CreatePromptType = await request.json();
  try {
    await connectToDB(); // we have always call this function if we want to access the database, it is a lambda function that dies after execution.

    // find the existing prompt
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) return new Response("Prompt not found", {status : 404})

    // if prompt exist
    existingPrompt.promptText = promptText;
    existingPrompt.tag = tag;

    // save edited prompt to database
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update prompt", {
      status: 500,
    });
  }
}

// DELETE (delete)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB(); // we have always call this function if we want to access the database, it is a lambda function that dies after execution.

    // find the existing prompt
    const existingPrompt = await Prompt.findByIdAndRemove(params.id);


    return new Response("Prompt Deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to delete prompt", {
      status: 500,
    });
  }
}