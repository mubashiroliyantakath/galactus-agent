'use client';

import { useEffect } from 'react';
import {Button} from "@/components/ui/button";
import { toast} from "sonner";
import {reloadContainersPage} from "@/lib/actions";

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

    return (
        <main className="flex flex-col grow items-center justify-center">
            <h2 className="text-center mt-20">{`${error}`}</h2>
            <Button asChild className={`m-4 bg-green-700 font-bold hover:bg-green-600`}>
                <div onClick={() => {
                    reset()
                }}>Try Again</div>
            </Button>
        </main>
    );
}