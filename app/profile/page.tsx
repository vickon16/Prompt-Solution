import React from "react";
import { notFound, redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LargeHeading from "@/components/ui/LargeHeading";
import GradientSpan from "@/components/ui/GradientSpan";
import Paragraph from "@/components/ui/Paragraph";
import PromptCard from "@/components/PromptCard";

export const metadata = {
  title: "Prompt Solution | Profile Page",
  description:
    "Prompt Solution Profile Information page, Created by Vickon Cyril",
};

const getUserProfileInfo = async (id: string) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${id}`);
  const data: IUser = await response.json();
  return data;
};

const getUserPrompts = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${id}/prompts`
  );
  const data: PromptType[] = await response.json();
  return data;
};

async function ProfilePage({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { id: string };
}) {
  if (!searchParams.id) return notFound();
  
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/");

  const [userInfo, userPrompts] = await Promise.all([
    getUserProfileInfo(searchParams.id),
    getUserPrompts(searchParams.id),
  ]).catch((err) => notFound());

  const person = userInfo._id === session?.user?.id ? "My" : userInfo.userName;

  return (
    <section className="w-full">
      <LargeHeading>
        <GradientSpan size="2xl" variant="blue_Grad">
          {person} Profile
        </GradientSpan>
      </LargeHeading>

      <Paragraph size="sm" className="mt-4">
        Welcome to your personalized profile page
      </Paragraph>

      <div className="mt-12">
        <LargeHeading variant="gray" size="md">
          Your Prompts
        </LargeHeading>
        <div className="py-5 columns-1 sm:columns-2 space-y-4 sm:gap-6 xl:columns-3 max-w-[70rem] ">
          {userPrompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
