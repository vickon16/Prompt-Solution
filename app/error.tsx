'use client'; // Error components must be Client Components
 
import Button from '@/components/ui/Button';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import Image from 'next/image';
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <section className='w-full h-screen flex items-center mt-36 flex-col gap-y-6 text-center'>
      <Image src="/assets/images/error-icon.png" alt="not-found-image" width={70} height={70} />
      <LargeHeading size="lg" variant="orange_grad">{error.message}</LargeHeading>
      <Paragraph size="sm">{error.stack}</Paragraph>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </section>
  );
}