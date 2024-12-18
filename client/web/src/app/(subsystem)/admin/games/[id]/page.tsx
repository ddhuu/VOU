"use client";

import { GameInfoSkeleton } from "@/app/(subsystem)/admin/(dashboard)/skeletons";
import { getBadge } from "@/app/(subsystem)/admin/games/[id]/badge-ui";
import UpdateGameForm from "@/app/(subsystem)/admin/games/[id]/update-game-form";
import ErrorPage from "@/app/error";
import { AnimationButton } from "@/components/shared/custom-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { useCachedGameQuery } from "@/lib/react-query/gameCache";
import { getQueryParams } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Game() {
    const [update, setUpdate] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);
    const gameId = getQueryParams<string>(useParams(), "id");
    const { data: game, isLoading, isError, isPaused } = useCachedGameQuery(gameId); // Get query status
    if (isError || game === null) return <ErrorPage />;
    if (isLoading || isPaused || !game) return <GameInfoSkeleton />; // isLoading is true when api in queryFn was calling and data doesn't exist in cache

    return (
        <>
            {update ? (
                <>
                    <h1 className="text-2xl md:text-4xl font-bold text-gradient">Update game info</h1>
                    <div className="w-[70vw] mx-4 sm:w-sm md:w-sm lg:w-sm xl:w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto shadow-xl rounded-lg text-gray-900">
                        <UpdateGameForm game={game} back={() => setUpdate(!update)} />
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-2xl md:text-4xl font-bold text-gradient">Game Info</h1>
                    <div className="py-5">
                        <Card>
                            <CardContent className="py-4">
                                <div className="flex flex-wrap gap-4 p-4 border shadow-slate-50 shadow-[0_3px_7px_rgb(0,0,0,0.2)] rounded-lg">
                                    {/* Hình ảnh game */}
                                    <div className="flex flex-[1] basis-[200px] flex-shrink-0 w-full">
                                        <Image
                                            src={game.image}
                                            alt="Game image"
                                            className="h-64 w-full object-cover rounded-md"
                                            width={300} // Adjust to fit your layout
                                            height={200}
                                        />
                                    </div>

                                    <div className="px-4 flex-[2] space-y-3 basis-[300px] flex-shrink-0">
                                        <p className="text-lg font-semibold">
                                            <b>Game name:</b> {game.name}
                                        </p>

                                        <p className="flex items-center">
                                            <b className="mr-2">Game type: </b>
                                            <span className={getBadge()}>{game.type}</span>
                                        </p>

                                        <div className="flex items-center">
                                            <b>Allow trading: </b>
                                            <Badge
                                                className={`${
                                                    game.allowTrading
                                                        ? "bg-lime-600 text-white"
                                                        : "bg-red-600 text-white"
                                                } ml-2`}
                                            >
                                                {game.allowTrading ? "Allow" : "Not allow"}
                                            </Badge>
                                        </div>
                                        <div className="">
                                            <b>Guide: </b>
                                            <div className="mt-2 border-l-4 border-gray-300 pl-4">
                                                <p className={showMore ? "" : "line-clamp-3"}>
                                                    {game.guide} Lorem ipsum dolor sit amet consectetur adipisicing
                                                    elit. Quod, quis. Provident molestiae corporis nisi ea rem
                                                    perferendis non eveniet dolorum quaerat libero eius, explicabo vel
                                                    quos magni nobis natus tempora. Lorem ipsum dolor sit amet
                                                    consectetur adipisicing elit. Repudiandae sunt deleniti saepe sint
                                                    in quisquam rerum nostrum, minus aspernatur ipsam odit maxime illum
                                                    velit voluptatibus architecto sed delectus accusantium quia?
                                                </p>
                                                <b
                                                    className="cursor-pointer flex gap-1 items-center"
                                                    onClick={() => setShowMore(!showMore)}
                                                >
                                                    {showMore ? (
                                                        <>
                                                            Less <ChevronUp size={16} />
                                                        </>
                                                    ) : (
                                                        <>
                                                            More <ChevronDown size={16} />
                                                        </>
                                                    )}
                                                </b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex justify-center items-center pt-3 gap-6 w-full">
                                    <Button className="text-base cancel-btn-color">
                                        <Link href="/admin/games">Back</Link>
                                    </Button>
                                    <AnimationButton onClick={() => setUpdate(!update)} className="px-3 py-[.37rem]">
                                        Update info
                                    </AnimationButton>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </>
            )}
        </>
    );
}
