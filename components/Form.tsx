"use client";

import { FC, FormEvent, useState } from "react";
import Link from "next/link";
import GradientSpan from "./ui/GradientSpan";
import Button, { buttonVariants } from "./ui/Button";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

interface FormProps {
  type: string;
  promptEditData?: PromptType;
}

const Form: FC<FormProps> = ({ type, promptEditData }) => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState<CreatePromptType>(
    promptEditData ? promptEditData : { promptText: "", tag: "" }
  );
  const router = useRouter();

  const handlePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.promptText || !prompt.tag) return;

    if (!session) {
      toast.error(`Log in to ${type} a prompt`);
      return;
    }

    setSubmitting(true);

    try {

      if (type === "Create") {
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
            promptText: prompt.promptText,
            tag: prompt.tag,
          }),
        });
  
        if (!response.ok) return Promise.reject(response)
        router.push("/");
      }

      if (type === "Update") {
        const promptId = searchParams.get("id");

        const response = await fetch(`/api/prompt/${promptId}`, {
          method : "PATCH",
          headers : {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
            promptText: prompt.promptText,
            tag: prompt.tag,
          }),
        })

        if (!response.ok) return Promise.reject(response)

        router.push("/");
      }
      
    } catch (error: any) {
      toast.error(`Failed to ${type} prompt`);
      throw new Error(`Failed to ${type} prompt`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handlePrompt}
      className="mt-10 p-3 sm:p-5 w-full max-w-2xl flex flex-col gap-y-7 glassmorphism"
    >
      {/* Prompt Text Field */}
      <label htmlFor="promptText">
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Your AI Prompt
        </span>

        <textarea
          id="promptText"
          value={prompt.promptText}
          onChange={(e) =>
            setPrompt((prev) => ({
              ...prev,
              promptText: e.target.value,
            }))
          }
          placeholder="Write your Prompt here..."
          required
          className="w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-600 outline-0"
          maxLength={4000}
        ></textarea>
      </label>

      {/* Prompt Tag */}
      <label htmlFor="promptTag">
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Tag{" "}
          <GradientSpan size="xs" variant="blue_Grad">
            (#product, #webdevelopment, ...)
          </GradientSpan>
        </span>

        <input
          id="promptTag"
          value={prompt.tag}
          onChange={(e) =>
            setPrompt((prev) => ({
              ...prev,
              tag: e.target.value,
            }))
          }
          placeholder="#tag"
          required
          className="w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0"
          maxLength={50}
        ></input>
      </label>

      <div className="flex-end mx-3 mb-5 gap-4">
        <Link
          href="/"
          className={buttonVariants({
            variant: "link",
            className: "!text-base",
          })}
        >
          Cancel
        </Link>
        <Button type="submit" variant="gradient" isLoading={submitting}>
          {submitting ? `${type}...` : `${type}`}
        </Button>
      </div>
    </form>
  );
};

export default Form;
