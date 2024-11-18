import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import chatBot from "../../assets/chatBot.png";
import petTraining from "../../assets/petTraining.jpg";

const AppleCarousel = () => {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know your Pet Soul
      </h2>
      <Carousel items={cards} />
    </div>
  );
};
export default AppleCarousel;

const DummyContent1 = () => {
  return (
    <>
      {[...new Array(3)].map((_, index) => {
        const sampleData = [
          {
            text: "Keep a journal, quickly jot down a grocery list, and take amazing class notes. Want to convert those notes to text? No problem.",
            imgSrc: chatBot,
            imgAlt: "Macbook mockup from Aceternity UI",
          },
          {
            text: "Organize your tasks efficiently and never miss a deadline. Our productivity tools are designed to help you stay on top of your game.",
            imgSrc: chatBot,
            imgAlt: "iPad mockup from Aceternity UI",
          },
          {
            text: "Stay connected with your loved ones and manage your social media effortlessly. Our app makes it easy to keep in touch.",
            imgSrc: chatBot,
            imgAlt: "iPhone mockup from Aceternity UI",
          },
        ];

        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              {sampleData[index].text}
            </p>
            <img
              src={sampleData[index].imgSrc}
              alt={sampleData[index].imgAlt}
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};
const DummyContent2 = () => {
  return (
    <>
      {[...new Array(3)].map((_, index) => {
        const sampleData = [
          {
            text: "Keep a journal, quickly jot down a grocery list, and take amazing class notes. Want to convert those notes to text? No problem.",
            imgSrc: petTraining,
            imgAlt: "Macbook mockup from Aceternity UI",
          },
          {
            text: "Organize your tasks efficiently and never miss a deadline. Our productivity tools are designed to help you stay on top of your game.",
            imgSrc: petTraining,
            imgAlt: "iPad mockup from Aceternity UI",
          },
          {
            text: "Stay connected with your loved ones and manage your social media effortlessly. Our app makes it easy to keep in touch.",
            imgSrc: petTraining,
            imgAlt: "iPhone mockup from Aceternity UI",
          },
        ];

        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              {sampleData[index].text}
            </p>
            <img
              src={sampleData[index].imgSrc}
              alt={sampleData[index].imgAlt}
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Artificial Intelligence",
    title: "You can add multiple pets to your account.",
    src: chatBot,
    content: <DummyContent1 />,
  },
  {
    category: "Productivity",
    title:
      "ChatBot to help you with your pet's health and daily Do's and Dont's.",
    src: chatBot,
    content: <DummyContent2 />,
  },
  {
    category: "Productivity",
    title: "Add your pet's daily activities.",
    src: chatBot,
    content: <DummyContent1 />,
  },
  {
    category: "Product",
    title: "Add Medical Reports for your pet.",
    src: chatBot,
    content: <DummyContent2 />,
  },

  {
    category: "Product",
    title: "Check trends for vital health parameters for your pet.",
    src: chatBot,
    content: <DummyContent1 />,
  },
  {
    category: "iOS",
    title: "Vaccination record and reminders for your pet.",
    src: chatBot,
    content: <DummyContent2 />,
  },
];
