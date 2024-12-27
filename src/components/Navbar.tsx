"use client";
import React, { useState } from "react";
import Logo from "@/components/Logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isOpen, onOpenChange] = useState(false);

  return (
      <div className="flex justify-between items-center glass-transparent p-2 rounded-full border dark:border-gray-700">
        <Link href="/">
          <Logo size="lg" />
        </Link>
        <div className="flex items-center gap-2">
          <Input placeholder="Search" width="200px" className="hidden md:block rounded-full bg-white dark:bg-inherit" onClick={() => onOpenChange(!isOpen)} />
          <Button variant="secondary" size="icon"  className="md:hidden rounded-full p-2 px-3" onClick={() => onOpenChange(!isOpen)}>
            <Icon icon="mingcute:search-2-line" />
          </Button>
          <ThemeToggler />
        </div>
      </div>
  );
};

export default Navbar;