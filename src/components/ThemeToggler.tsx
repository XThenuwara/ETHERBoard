"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export function ThemeToggler() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="transition-all"> 
      <Button variant="secondary" size="icon" className="rounded-full p-2 px-3" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        <Icon icon="mingcute:sun-line"/>
      </Button>
    </div>
  );
}