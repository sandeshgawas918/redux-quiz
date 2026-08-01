"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from '@/components/ui/separator';
import { RootState } from '@/redux/store/store';

function page() {
    const { newArray } = useSelector((state: RootState) => state.quiz)
    const router = useRouter();
    return (
        <div className="mx-auto max-w-4xl space-y-3 px-4 py-5">
            <div className='flex flex-row justify-between'>
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="mb-2"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>

                <Button
                    variant="outline"
                    onClick={() => router.push("/")}
                    className="mb-2"
                >
                    <Home className="mr-2 h-4 w-4" />
                    Home
                </Button>
            </div>
            <h1 className="text-4xl font-bold text-center">
                📊 Quiz Analysis
            </h1>

            <p className="text-muted-foreground text-center">
                Review every question and compare your answers with the correct ones.
            </p>

            {newArray.map((item, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl">
                                Question {index + 1}
                            </CardTitle>

                            <Badge variant={item.correct ? "default" : "destructive"}>
                                {item.correct ? "Correct" : "Incorrect"}
                            </Badge>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="space-y-5">
                        <h2 className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: item.question }} />
                        <div className="space-y-3">
                            {item.answers.map((answer: string, i: number) => {
                                const isCorrect = answer === item.correctAnswer;
                                const isSelected = answer === item.selectedAnswer;
                                return (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-3 rounded-xl border p-3
                ${isCorrect ? "border-green-500 bg-green-500/10" : isSelected ? "border-red-500 bg-red-500/10" : ""}`}
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                        <span
                                            className="flex-1"
                                            dangerouslySetInnerHTML={{ __html: answer }}
                                        />
                                        {isCorrect && <span>✅</span>}
                                        {!isCorrect && isSelected && <span>❌</span>}
                                    </div>
                                );
                            })}
                        </div>
                        <Separator />
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-xl bg-muted p-4">
                                <p className="text-sm text-muted-foreground">
                                    Your Answer
                                </p>
                                <p
                                    className={`mt-1 font-semibold ${item.selectedAnswer === item.correctAnswer
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                    dangerouslySetInnerHTML={{
                                        __html: item.selectedAnswer,
                                    }}
                                />
                            </div>
                            <div className="rounded-xl bg-muted p-4">
                                <p className="text-sm text-muted-foreground">
                                    Correct Answer
                                </p>
                                <p
                                    className="mt-1 font-semibold text-green-600"
                                    dangerouslySetInnerHTML={{
                                        __html: item.correctAnswer,
                                    }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default page

