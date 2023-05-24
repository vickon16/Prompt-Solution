import Form from '@/components/Form'
import GradientSpan from '@/components/ui/GradientSpan'
import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

export const metadata = {
  title: 'Prompt Solution | Update Prompt',
  description: 'Update your prompts for your AI solutions, Created by Vickon Cyril',
}

const type = "Update"

async function getSelectedPrompt(id : string) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt/${id}`);
  const data : PromptType = await response.json();
  return data;
}

async function UpdatePromptPage({params, searchParams} : {
  params: {};
  searchParams: { id : string };
}) {
  if (!searchParams.id) return notFound();
  
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  
  const promptEditData = await getSelectedPrompt(searchParams.id);

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

      <Form type={type} promptEditData={promptEditData} />
    </div>
  )
}

export default UpdatePromptPage