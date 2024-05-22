"use client";
import { CardStack } from "@/components/ui/card-stack";
import data from "../data/react.json";
import MarkdownParser from "@/components/markdown";
export default function QuestionCardStack() {
  return (
    <div className="relative h-[40rem] flex items-center justify-center w-full">
      <CardStack
        autoFlip={false}
        items={data[0].qna.map((item, index) => ({
          id: index,
          title: item.question,
          content: <MarkdownParser />,
        }))}
      />
    </div>
  );
}

