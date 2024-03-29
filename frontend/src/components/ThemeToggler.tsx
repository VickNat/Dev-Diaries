import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  
  return (
    <button
      className="w-8 h-8 rounded-lg dark:bg-darkPrimary flex items-center justify-center dark:hover:bg-gray-700 hover:bg-gray-200 transition-all duration-300 focus:outline-none"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <IoMdMoon className="text-black w-5 h-5" />
      ) : (
        <IoMdSunny className="text-white w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggler;