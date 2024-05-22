"use client"
import React, { useState } from 'react'
import { Card } from '../components/CardReveal'
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';
import data from "@/app/cards/data/react.json"
import MarkdownParser from '@/components/markdown';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
const getRandomQuestion = () => {
  const allQuestions = data.reduce((acc:any[], item) => ([...acc, ...item.qna]), [])
  const randomIndex = Math.floor(Math.random() * allQuestions.length)
  return allQuestions[randomIndex]
}
const Memorize = () => {
  const [randomQuestion, setRandomQuestion] = useState(
    () => getRandomQuestion()
  );
  return (
    <div className="flex w-screen h-screen max-md:justify-end justify-center items-center max-md:flex-col md:flex-row">
      <div className="max-sm:w-4/5 max-md:w-1/2 md:w-1/3 h-4/5">
        <Card
          title={randomQuestion.question}
          content={
            <div className="w-full h-full">
              <MarkdownParser content={randomQuestion.answer} />
            </div>
          }
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900"
          />
        </Card>
      </div>
      <div className="m-2 flex justify-center text-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="bg-transparent text-white px-5 py-1"
            onClick={() => setRandomQuestion(getRandomQuestion())}
          >
            <span>Randomize</span>
          </HoverBorderGradient>
      </div>
    </div>
  );
}

export default Memorize