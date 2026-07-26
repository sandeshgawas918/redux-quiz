import { Brain } from "lucide-react";

export default function QuizLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md">
            <div className="w-[420px] rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-violet-600/20 p-5 animate-pulse">
                        <Brain className="h-12 w-12 text-violet-400" />
                    </div>

                    <h2 className="mt-6 text-3xl font-bold text-white">
                        Preparing Your Challenge
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Fetching questions and getting everything ready...
                    </p>

                    <div className="mt-8 h-3 w-full overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full w-1/2 animate-[loading_1.4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500" />
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        Please wait...
                    </p>
                </div>
            </div>
        </div>
    );
}