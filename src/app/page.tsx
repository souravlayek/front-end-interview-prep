import { Boxes } from "@/components/ui/background-boxes";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white text-center relative z-20")}>
        Ace Your Front-End Development Interviews
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Your Ultimate Resource for Cracking the Code, Acing Every Question, and
        Landing Your Dream Job in Front-End Development
      </p>
      <div className="m-2 flex justify-center text-center items-center">
        <Link href="/cards">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="bg-transparent text-white w-[100px]"
        >
          <span>Dive In</span>
        </HoverBorderGradient>
        </Link>
      </div>
      {/* Add subscribe to my newsletter section */}
    </main>
  );
}

export default HomePage;