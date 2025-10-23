import { Link } from "react-router";
import { useTheme } from "@/context/theme-provider";
import { WandSparkles } from "lucide-react";
import { useState } from "react";
const Header = () => {
  const { theme, setTheme } = useTheme();
  const [index, setIndex] = useState(0);
  const themes = [
    "light",
    "dark",
    "theme-forest",
    "theme-ocean",
    "theme-rose",
    "theme-sunset",
    "theme-midnight",
    "theme-lavender",
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <img
            src={
              theme === "dark" ? "/images/logo (2).png" : "/images/logo2.png"
            }
            alt="Klimate logo"
            className="h-14"
          />
        </Link>
        <div className="flex items-center gap-5">
          <button
            onClick={() => {
              setTheme(themes[index]);
              setIndex((prev: number) => (prev + 1) % themes.length);
            }}
            className={`px-3 py-1 rounded border hover:bg-accent-foreground hover:text-accent transition-all`}
          >
            <WandSparkles />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
