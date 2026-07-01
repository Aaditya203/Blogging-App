import { useEffect, useState } from "react";

const quotes = [
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "— Eleanor Roosevelt",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "— Winston Churchill",
  },
  {
    text: "Stay hungry, stay foolish.",
    author: "— Steve Jobs",
  },
];

export default function TypeWriter() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [displayAuthor, setDisplayAuthor] = useState("");
  const [phase, setPhase] = useState<
    "typingQuote" | "typingAuthor" | "pause" | "deletingAuthor" | "deletingQuote"
  >("typingQuote");

  useEffect(() => {
    const currentQuote = quotes[quoteIndex];

    const timeout = setTimeout(() => {
      switch (phase) {
        case "typingQuote":
          if (displayText.length < currentQuote.text.length) {
            setDisplayText(
              currentQuote.text.slice(0, displayText.length + 1)
            );
          } else {
            setPhase("typingAuthor");
          }
          break;

        case "typingAuthor":
          if (displayAuthor.length < currentQuote.author.length) {
            setDisplayAuthor(
              currentQuote.author.slice(0, displayAuthor.length + 1)
            );
          } else {
            setPhase("pause");
          }
          break;

        case "pause":
          setPhase("deletingAuthor");
          break;

        case "deletingAuthor":
          if (displayAuthor.length > 0) {
            setDisplayAuthor(displayAuthor.slice(0, -1));
          } else {
            setPhase("deletingQuote");
          }
          break;

        case "deletingQuote":
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setQuoteIndex((prev) => (prev + 1) % quotes.length);
            setPhase("typingQuote");
          }
          break;
      }
    }, phase === "pause" ? 2500 : phase.includes("deleting") ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, displayAuthor, phase, quoteIndex]);

  return (
    <div className="flex flex-col items-center text-center">
        <div>
        {displayText}
        <span className="animate-pulse">|</span>
      </div>

      <p className="mt-4 text-2xl italic text-gray-600">
        {displayAuthor}
      </p>
    </div>
  );
}