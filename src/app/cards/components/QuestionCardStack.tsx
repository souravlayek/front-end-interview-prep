"use client";
import { CardStack } from "@/components/ui/card-stack";
import data from "../data/react.json";
import MarkdownParser from "@/components/markdown";
export default function QuestionCardStack() {
  return (
    <div className="relative h-[40rem] flex items-center justify-start w-full flex-wrap max-w-screen">
      {data.map((item) => (
        <div className="w-1/2 mt-20 flex justify-center items-center flex-col gap-10">
          <h4>{item.section}</h4>
          <CardStack
            key={item.section}
            items={item.qna.map((item, index) => ({
              id: index,
              title: item.question,
              content: <MarkdownParser content={item.answer} />,
            }))}
          />
        </div>
      ))}
    </div>
  );
}
