import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

function SessionExpired() {
    const router = useRouter();
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-700/50 px-4">
                <Card className="w-full max-w-md rounded-2xl shadow-2xl">
                    <CardContent className="flex flex-col items-center gap-5 p-8 text-center">
                        <div className="rounded-full bg-amber-100 p-4 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                            <AlertTriangle className="h-10 w-10" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">
                                Quiz Session Expired
                            </h2>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Your quiz data is no longer available. This usually happens after
                                refreshing the page or opening the quiz in a new tab.
                            </p>
                        </div>

                        <Button
                            onClick={() => router.replace("/")}
                            className="w-full"
                            size="lg"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Start New Quiz
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
}

export default SessionExpired