import { useTypewriter } from "@/hooks/useTypewriter";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
}

const TypewriterText = ({ 
  text, 
  speed = 80, 
  delay = 500, 
  className = "",
  showCursor = true 
}: TypewriterTextProps) => {
  const { displayedText, isComplete } = useTypewriter(text, speed, delay);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && (
        <span 
          className="inline-block w-0.5 h-[1em] bg-foreground ml-1 align-middle"
          style={{ animation: "blink 1s step-end infinite" }}
        />
      )}
      {showCursor && isComplete && (
        <span 
          className="inline-block w-0.5 h-[1em] bg-foreground ml-1 align-middle opacity-50"
          style={{ animation: "blink 1s step-end infinite" }}
        />
      )}
    </span>
  );
};

export default TypewriterText;
