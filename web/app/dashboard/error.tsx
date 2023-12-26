'use client';

import { useEffect } from 'react';
import {Button} from "@/components/ui/button";
import { toast} from "sonner";
import {reloadContainersPage} from "@/lib/actions";
import {useRouter} from "next/navigation";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    const router = useRouter()

    return (
        <main className="flex flex-col grow items-center justify-center">
            <h2 className="text-center mt-20">{`${error}`}</h2>
            <Button onClick={() => reset()} className={`m-4 bg-white dark:bg-green-700 border-2 border-green-700 text-black font-bold hover:bg-green-600`}>
                <p>Please try reloading the page</p>
            </Button>
        </main>
    );
}