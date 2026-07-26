"use client"

import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSelector } from 'react-redux';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Toaster, toast } from 'sonner'

function page() {
    const { score, newArray, questionSize } = useSelector((state) => state.quiz)

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-700/50 px-4 py-6">
            <Toaster richColors position="top-right" />
            <Card className="w-full max-w-4xl overflow-hidden rounded-2xl border-4 border-amber-400 shadow-2xl">
                <CardContent className="relative p-8">
                    {/* Decorative Corners */}
                    <div className="absolute left-4 top-4 h-12 w-12 border-l-4 border-t-4 border-amber-400 rounded-tl-2xl" />
                    <div className="absolute right-4 top-4 h-12 w-12 border-r-4 border-t-4 border-amber-400 rounded-tr-2xl" />
                    <div className="absolute bottom-4 left-4 h-12 w-12 border-l-4 border-b-4 border-amber-400 rounded-bl-2xl" />
                    <div className="absolute bottom-4 right-4 h-12 w-12 border-r-4 border-b-4 border-amber-400 rounded-br-2xl" />

                    <div className="flex flex-col items-center text-center">

                        {/* Trophy */}
                        <div className="text-6xl">🏆</div>

                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.45em] text-amber-600">
                            Certificate of Achievement
                        </p>

                        <Separator className="my-4 w-48" />

                        <h1 className="text-4xl font-bold">
                            Congratulations!
                        </h1>

                        <p className="mt-2 text-muted-foreground">
                            This certificate is proudly presented for successfully completing
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-primary">
                            Ultimate Quiz Challenge
                        </h2>

                        {/* Score */}
                        <div className="my-6 rounded-xl border bg-muted px-10 py-5">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                Final Score
                            </p>

                            <h2 className="mt-1 text-6xl font-extrabold text-primary">
                                {score}
                                <span className="text-2xl text-muted-foreground">
                                    {" "} / {questionSize}
                                </span>
                            </h2>
                        </div>

                        {/* Description */}
                        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                            In recognition of your dedication, curiosity, and successful completion
                            of this quiz challenge. Keep learning, keep growing, and continue
                            achieving excellence.
                        </p>

                        {/* Signature */}
                        <div className="mt-8 flex w-full items-end justify-between">
                            <div className="text-center">
                                <div className="mx-auto mb-2 h-px w-36 bg-slate-400" />
                                <p className="text-sm font-medium">Candidate</p>
                            </div>

                            <div className="text-4xl">🎓</div>

                            <div className="text-center">
                                <div className="mx-auto mb-2 h-px w-36 bg-slate-400" />
                                <p className="text-sm font-medium">Quiz Authority</p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">

                            <Button size="lg" className="rounded-xl">
                                <Link href={"/"}> 🏠 Home</Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="secondary"
                                className="rounded-xl"
                            >
                                <Link href={"/quiz-analysis"}>📊 View Analysis</Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-xl"
                                onClick={() => toast.success('Feature under development')}
                            >
                                📄 Download Certificate
                            </Button>

                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default page