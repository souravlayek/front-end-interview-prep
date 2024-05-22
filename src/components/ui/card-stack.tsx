"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval: any;

type Card = {
  id: number;
  title: React.ReactNode;
  content: React.ReactNode;
  customCard?: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
  intervalDurationInMS = 5000,
  autoFlip = true,
  cardsInView = 3,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
  intervalDurationInMS?: number;
  autoFlip?: boolean;
  cardsInView?:number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;

  const [cards, setCards] = useState<Card[]>(items);
  const [visibleCards, setVisibleCards] = useState(items.slice(0, cardsInView));

  useEffect(() => {
    if (autoFlip) {
      startFlipping();
    }

    return () => {
      if (autoFlip) {
        clearInterval(interval);
      }
    };
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        setVisibleCards(newArray.slice(0, cardsInView));
        return newArray;
      });
    }, intervalDurationInMS);
  };

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96 cardWrapper">
      {visibleCards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col gap-[10px]"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            {card.customCard ? (
              card.customCard
            ) : (
              <>
                <div className="font-bold text-neutral-700 dark:text-neutral-200">
                  {card.title}
                </div>
                <hr />
                <div className="font-normal text-neutral-700 dark:text-neutral-200 max-h-full overflow-y-auto text-wrap">
                  {card.content}
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
