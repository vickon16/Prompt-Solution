"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Paragraph from "./ui/Paragraph";
import Button, { buttonVariants } from "./ui/Button";
import { toast } from "react-toastify";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<ProvidersType[] | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signInHandler = async (method: string) => {
    setIsLoading(true);
    try {
      setToggleDropdown(false);
      await signIn(method);
    } catch (error) {
      toast.error("Failed to Sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const signOutHandler = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setToggleDropdown(false);
    } catch (error) {
      toast.error("Failed to Sign out");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getAllProviders = async () => {
      const response: any = await getProviders();
      setProviders(response);
    };

    getAllProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3 gap-x-2">
      <Link href="/" className="flex-center gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width="30"
          height="30"
          className="object-contain "
        />
        <Paragraph className="max-md:hidden" variant="logo">
          Prompt Solution
        </Paragraph>
      </Link>

      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className={buttonVariants()}>
              Create Prompt
            </Link>
            <Button
              isLoading={isLoading}
              onClick={signOutHandler}
              variant="outline"
            >
              Sign Out
            </Button>
            <Link href={`/profile?id=${session?.user?.id}`}>
              <Image
                src={session?.user?.image || "/assets/images/avatar.png"}
                alt="profile-img"
                width="37"
                height="37"
                className="rounded-full object-contain"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  isLoading={isLoading}
                  key={provider.id}
                  onClick={() => signInHandler(provider.id)}
                >
                  Sign Up | {provider.name}
                </Button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image || "/assets/images/avatar.png"}
              alt="profile-img"
              width="37"
              height="37"
              className="rounded-full object-contain"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="absolute right-0 top-full mt-3 w-full py-4 px-2 rounded-sm bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end shadow-sm drop-shadow-sm">
                <Link
                  href={`/profile?id=${session?.user?.id}`}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <hr className="w-full m-2 bg-black" />
                <Button
                  isLoading={isLoading}
                  className=" w-full"
                  onClick={signOutHandler}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  isLoading={isLoading}
                  key={provider.name}
                  onClick={() => signInHandler(provider.id)}
                >
                  Sign Up | {provider.name}
                </Button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
