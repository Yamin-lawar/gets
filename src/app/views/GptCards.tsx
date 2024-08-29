'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

export default function GptCards({}: Props) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/charts");
  }
  return (
    <div
      className="shadow-2xl p-8 border-2 hover:border-blue-500 rounded-lg 
        transform transition-transform duration-300 hover:scale-105 cursor-pointer w-80 
        flex flex-col items-center justify-center bg-white"
        onClick={handleClick}
    >
      <div className="flex items-center justify-center mb-4">
        <Image src="chart.svg" alt="Chart Icon" width={100} height={100} />
      </div>
      <div className="text-xl font-robotoMono italic text-center mb-2">
        Chart GPT
      </div>
      <div className="text-center font-robotoMono text-sm">
        Generate beautiful & meaningful charts from data & prompts only
      </div>
    </div>
  );
}
