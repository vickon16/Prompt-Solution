"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import GradientSpan from "./ui/GradientSpan";
import Paragraph from "./ui/Paragraph";
import LargeHeading from "./ui/LargeHeading";
import { toast } from "react-toastify";
import Button from "./ui/Button";
import Link from "next/link";

interface PromptCardProps {
  prompt: PromptType;
  handleTagClick? : (tag : string) => void;
}

const PromptCard: FC<PromptCardProps> = ({ prompt, handleTagClick }) => {
  const [copied, setCopied] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(prompt.promptText);
    navigator.clipboard.writeText(prompt.promptText);
    toast.success("Copied to clipboard")

    // reset the state
    setTimeout(() => setCopied(""), 3000);
  };

  const handleEdit = () => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async () => {
    toast.promise
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed) {
      setDeleting(true);
      try {
        const response = await fetch(`/api/prompt/${prompt._id}`, {
          method : "DELETE"
        })

        if (!response.ok) return Promise.reject(response)

        router.refresh();
      } catch (error) {
        toast.error("Failed to delete prompt");
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <article className="flex-1 md:w-[360px] w-full h-fit break-inside-avoid rounded-md border border-gray-300 bg-white/20 bg-clip-padding px-5 py-6 backdrop-filter backdrop-blur-lg">
      <div className="flex-between gap-3">
        <Link href={`/profile?id=${prompt.creator._id}`}>
          <Image
            src={prompt.creator.image || "/assets/images/avatar.png"}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain cursor-pointer"
          />
        </Link>

        <div className="flex flex-col flex-1">
          <LargeHeading size="md" className="!leading-none">
            {prompt.creator.userName}
          </LargeHeading>
          <Paragraph size="xs" variant="gray" className="mt-2">
            {prompt.creator.email}
          </Paragraph>
        </div>

        <div
          className="flex-center w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur cursor-pointer"
          onClick={handleCopy}
        >
          <Image
            src={
              copied === prompt.promptText
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy_img"
            width={16}
            height={16}
          />
        </div>
      </div>

      <Paragraph size="sm" className="my-3">
        {prompt.promptText}
      </Paragraph>
      <Paragraph
        variant="blue_grad"
        size="xs"
        className={`mt-2 ${pathName === "/profile" ? "" : "cursor-pointer"}`}
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </Paragraph>

      {session?.user?.id === prompt.creator._id && pathName === "/profile" && (
        <div className="flex items-center gap-x-3 mt-3 border-t border-gray-200 pt-2 select-none">
          <GradientSpan
            size="sm"
            variant="green_Grad"
            className="cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </GradientSpan>

          <Button
            variant="ghost"
            onClick={handleDelete}
            isLoading={deleting}
          >
            Delete
          </Button>
        </div>
      )}
    </article>
  );
};

export default PromptCard;
