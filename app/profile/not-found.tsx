import Button from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="w-full h-screen flex items-center mt-36 flex-col gap-y-6">
      <Image src="/assets/images/not-found.png" alt="not-found-image" width={100} height={100} />
      <LargeHeading size="xl" variant="blue_grad">Not Found</LargeHeading>
      <Paragraph>{"Couldn't"} Find a profile Page for you</Paragraph>
      <Paragraph size="sm">{"Couldn't"} Sign up to continue</Paragraph>
    </section>
  );
}