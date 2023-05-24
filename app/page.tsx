import Feed from "@/components/Feed";
import GradientSpan from "@/components/ui/GradientSpan";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import React from "react";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <LargeHeading size="xl" className="mt-5 font-extrabold text-center">
        Discover & Share
        <br />
        <GradientSpan size="lg">AI - Powered Prompts</GradientSpan>
      </LargeHeading>

      <Paragraph variant="desc" size="lg" className="text-center">
        Prompt Solution is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts.
      </Paragraph>

      {/* feed */}
      <Feed />
    </section>
  );
};

export default Home;
