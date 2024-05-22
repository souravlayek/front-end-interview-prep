import React from 'react'
import { Card } from '../components/CardReveal'
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';

const Memorize = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-1/3 h-4/5">
        <Card title={"Random Question"} content={"Random Answer"}>
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900"
          />
        </Card>
      </div>
    </div>
  );
}

export default Memorize