
import React, { useState, useEffect } from 'react';
import { Check, PaintBucket } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Theme = {
  name: string;
  class: string;
  color: string;
  title: string;
}

const themes: Theme[] = [
  { name: 'default', class: '', color: '#6633EE', title: 'Default Purple' },
  { name: 'teal', class: 'theme-teal', color: '#14B8A6', title: 'Teal' },
  { name: 'rose-gold', class: 'theme-rose-gold', color: '#E11D48', title: 'Rose Gold' },
  { name: 'green', class: 'theme-green', color: '#22C55E', title: 'Green' },
  { name: 'electric-blue', class: 'theme-electric-blue', color: '#3B82F6', title: 'Electric Blue' },
];

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState<string>('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('instantglobe-theme') || 'default';
    setCurrentTheme(savedTheme);
    
    // Apply the theme to the html element
    const htmlElement = document.documentElement;
    
    // Remove all theme classes
    themes.forEach(theme => {
      if (theme.class) htmlElement.classList.remove(theme.class);
    });
    
    // Add the current theme class
    const themeToApply = themes.find(theme => theme.name === savedTheme);
    if (themeToApply && themeToApply.class) {
      htmlElement.classList.add(themeToApply.class);
    }
  }, [currentTheme]);

  const changeTheme = (themeName: string) => {
    setCurrentTheme(themeName);
    localStorage.setItem('instantglobe-theme', themeName);
  };

  const activeTheme = themes.find(theme => theme.name === currentTheme) || themes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-9 h-9 rounded-full">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: activeTheme.color }}></div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] glass-card">
        <div className="px-3 pt-1.5 pb-2 text-xs font-medium text-muted-foreground">
          Choose a theme
        </div>
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => changeTheme(theme.name)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex items-center gap-2 flex-1">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.color }}></div>
              <span>{theme.title}</span>
            </div>
            {currentTheme === theme.name && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
