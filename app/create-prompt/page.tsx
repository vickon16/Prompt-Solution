import Form from "@/components/Form";
import LargeHeading from "@/components/ui/LargeHeading";
import GradientSpan from "@/components/ui/GradientSpan";
import Paragraph from "@/components/ui/Paragraph";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Prompt Solution | Create Prompt",
  description:
    "Create your prompts for your AI solutions, Created by Vickon Cyril",
};

const type = "Create";

async function CreatePrompt() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <div className="w-full max-w-full flex-col">
      <LargeHeading>
        <GradientSpan size="xl" variant="blue_Grad">
          {type} Prompt
        </GradientSpan>
      </LargeHeading>

      <Paragraph size="sm" className="mt-4">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-Powered platform.
      </Paragraph>

      <Form type={type} />
    </div>
  );
};

export default CreatePrompt;
