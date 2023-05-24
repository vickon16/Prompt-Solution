"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Loader from "./Loader";
import { toast } from "react-toastify";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { usePathname } from "next/navigation";

interface FeedProps {
  
}

const Feed: FC<FeedProps> = ({}) => {
  const [searchText, setSearchText] = useState("");
  const [isError, setIsError] = useState(false);
  const [prompts, setPrompts] = useState<PromptType[] | []>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchedResults, setSearchedResults] = useState<PromptType[] | []>([]);
  const pathName = usePathname();

  // regex method of filtering
  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, "i"); // "i" flag for case-insensitive search

    return prompts.filter(
      (prompt) =>
        regex.test(prompt.creator.userName) ||
        regex.test(prompt.tag) ||
        regex.test(prompt.promptText)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    let timeout;
    clearTimeout(timeout);
    setSearchText(e.target.value);

    // debounce method
    timeout = setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 700);
  };

  const handleTagClick = (tag : string) => {
    if (pathName === "/profile") return;

    setSearchText(tag);
    const searchResult = filterPrompts(tag);
      setSearchedResults(searchResult);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data: PromptType[] = await response.json();

        if (!response.ok) return Promise.reject(response);
        setPrompts(data);
      } catch (error) {
        setIsError(true);
        toast.error("Failed to fetch all Prompts");
      } finally {
        setLoadingData(false);
      }
    };

    fetchPrompts();
  }, []);

  return (
    <section className="mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium outline-none ring-gray-400 focus:ring-1 peer"
        />
      </form>

      <div className="mt-16">
        <LargeHeading variant="gray" size="lg">
          All Prompts
        </LargeHeading>

        {loadingData ? (
          <div className="h-[200] w-full flex-center mt-16">
            <Loader />
          </div>
        ) : (
          <div className=" py-8 columns-1 sm:columns-2 space-y-4 sm:gap-6 xl:columns-3">
            {isError ? (
              <Paragraph>Prompts Not Found</Paragraph>
            ) : prompts.length === 0 ? (
              <Paragraph>
                Prompts is Empty,{" "}
                <Link href="/create-prompt" className={buttonVariants()}>
                  Create Prompt
                </Link>
              </Paragraph>
            ) : searchedResults.length > 0 ? (
              searchedResults.map((prompt) => (
                <PromptCard
                  key={prompt._id}
                  prompt={prompt}
                  handleTagClick={handleTagClick}
                />
              ))
            ) : (
              prompts.map((prompt) => (
                <PromptCard
                  key={prompt._id}
                  prompt={prompt}
                  handleTagClick={handleTagClick}
                />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;
