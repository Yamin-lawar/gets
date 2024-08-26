import React from 'react';
import GptCards from "../views/GptCards";

type Props = {}

export default function Landing({}: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      <h1 className="text-5xl text-center">
       All GPTs
      </h1>
      <div className="mt-36">
          <GptCards/>
      </div>
    </div>
  </main>
  )
}