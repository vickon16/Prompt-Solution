import Loader from "@/components/Loader";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (<div className="h-screen w-full flex justify-center mt-48">
      <Loader />
    </div>);
}