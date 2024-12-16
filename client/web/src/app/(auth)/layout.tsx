"use client";

import { DarkModeToggle } from "@/components/utility/mode-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-section bg-gradient-to-r from-sky-200 to-fuchsia-200 dark:from-sky-950 dark:to-fuchsia-950">
            <div className="absolute top-4 right-4">
                <DarkModeToggle />
            </div>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[9999]">
                {children}
            </div>
            <div className="air air1 opacity-100 dark:opacity-30 dark:!bottom-0"></div>
            <div className="air air2 opacity-40 dark:opacity-20 dark:!bottom-0"></div>
            <div className="air air3 opacity-20 dark:opacity-10 dark:!bottom-0"></div>
            <div className="air air4 opacity-65 dark:opacity-30 dark:!bottom-0"></div>
            <div className="snowflakes" aria-hidden="true">
                <div className="snowflake !text-violet-50">❅</div>
                <div className="snowflake !text-purple-50">❅</div>
                <div className="snowflake !text-fuchsia-50">❆</div>
                <div className="snowflake !text-pink-50">❄</div>
                <div className="snowflake !text-rose-50">❅</div>
                <div className="snowflake !text-lime-50">❆</div>
                <div className="snowflake !text-sky-50">❄</div>
                <div className="snowflake !text-cyan-50">❅</div>
                <div className="snowflake !text-teal-50">❆</div>
                <div className="snowflake !text-yellow-50">❄</div>
            </div>
            <div className="firework">
                <div className="firework__before z-[99999]"></div>
                <div className="firework__after"></div>
            </div>
        </div>
    );
}
