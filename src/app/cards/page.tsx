import Navbar from "./components/Navbar";
import QuestionCardStack from "./components/QuestionCardStack";

const CardsPage = () => {
  return (
    <main>
      <div className="mt-2 flex w-full justify-center">
        <div className="border border-white/30 w-fit rounded-md">
          <Navbar />
        </div>
      </div>
      <div className="cards">
        <QuestionCardStack />
      </div>
    </main>
  );
};

export default CardsPage;
