import { useState, useEffect } from 'react';
import { Toolbox } from './components/Toolbox';
import { Canvas } from './components/Canvas';
import { PreviewPanel } from './components/PreviewPanel';
import type { ThemeName, Widget, WidgetType } from './types';
import './App.css';

const DEFAULT_WIDGETS: Widget[] = [
  {
    id: 'w-header',
    type: 'header',
    enabled: true,
    data: {
      title: "Hi 👋, I'm a Developer",
      subtitle: "A passionate full-stack developer focused on building aesthetic web apps",
      bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
      typingEnabled: true,
      typingText: ["Frontend Engineer", "Open Source Builder", "UI/UX Enthusiast"]
    }
  },
  {
    id: 'w-about',
    type: 'about',
    enabled: true,
    data: {
      introduction: "I love building clean, modern applications using React and TypeScript. Always open to collaborating on creative concepts!",
      work: "Refining developer workflows",
      learning: "Rust & Advanced CSS Systems",
      collaborate: "Creative web app UI/UXs",
      email: "your-email@example.com"
    }
  },
  {
    id: 'w-tech',
    type: 'tech-stack',
    enabled: true,
    data: {
      icons: ["javascript", "typescript", "react", "tailwindcss", "nodedotjs", "git", "docker"],
      layout: "badges"
    }
  },
  {
    id: 'w-stats',
    type: 'stats',
    enabled: true,
    data: {
      username: "your-username",
      showStats: true,
      showLanguages: true,
      showStreak: true,
      cardTheme: "dracula"
    }
  },
  {
    id: 'w-socials',
    type: 'socials',
    enabled: true,
    data: {
      github: "your-username",
      linkedin: "your-linkedin",
      twitter: "",
      youtube: "",
      portfolio: "https://github.com/your-username",
      badgeStyle: "flat-square"
    }
  }
];

export default function App() {
  const [theme, setTheme] = useState<ThemeName>('glass-dark');
  const [widgets, setWidgets] = useState<Widget[]>([]);

  // Load storage state configurations on mounting
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('gps_theme') as ThemeName;
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        localStorage.setItem('gps_theme', 'glass-dark');
      }

      const savedWidgets = localStorage.getItem('gps_widgets');
      if (savedWidgets) {
        setWidgets(JSON.parse(savedWidgets));
      } else {
        setWidgets(DEFAULT_WIDGETS);
      }
    } catch (e) {
      setWidgets(DEFAULT_WIDGETS);
    }
  }, []);

  // Update theme class on HTML body for CSS variables shifts
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    localStorage.setItem('gps_theme', newTheme);
  };

  const handleSaveWidgets = (updated: Widget[]) => {
    setWidgets(updated);
    localStorage.setItem('gps_widgets', JSON.stringify(updated));
  };

  // Add new Widget item
  const handleAddWidget = (type: WidgetType) => {
    const id = Math.random().toString(36).substring(2, 9);
    let data: any = {};

    switch (type) {
      case 'header':
        data = {
          title: "Hi 👋, I'm a Developer",
          subtitle: "A software developer",
          bannerUrl: "",
          typingEnabled: false,
          typingText: []
        };
        break;
      case 'about':
        data = {
          introduction: "",
          work: "",
          learning: "",
          collaborate: "",
          email: ""
        };
        break;
      case 'tech-stack':
        data = {
          icons: ["javascript", "typescript", "react"],
          layout: "badges"
        };
        break;
      case 'stats':
        data = {
          username: "your-username",
          showStats: true,
          showLanguages: true,
          showStreak: false,
          cardTheme: "dracula"
        };
        break;
      case 'socials':
        data = {
          github: "your-username",
          linkedin: "",
          twitter: "",
          youtube: "",
          portfolio: "",
          badgeStyle: "flat"
        };
        break;
      case 'markdown':
        data = {
          content: "### Code Snippet Example\n\n```js\nconsole.log('Build amazing things!');\n```"
        };
        break;
    }

    const newWidget: Widget = { id, type, enabled: true, data };
    const updated = [...widgets, newWidget];
    handleSaveWidgets(updated);
  };

  // Change individual widget details
  const handleChangeWidget = (id: string, updatedData: any) => {
    const updated = widgets.map(w => {
      if (w.id === id) {
        return { ...w, data: updatedData };
      }
      return w;
    });
    handleSaveWidgets(updated);
  };

  // Enable/Disable widget status card
  const handleToggleWidget = (id: string) => {
    const updated = widgets.map(w => {
      if (w.id === id) {
        return { ...w, enabled: !w.enabled };
      }
      return w;
    });
    handleSaveWidgets(updated);
  };

  // Delete widget item card
  const handleDeleteWidget = (id: string) => {
    const updated = widgets.filter(w => w.id !== id);
    handleSaveWidgets(updated);
  };

  // Move widget up or down in array list
  const handleMoveWidget = (id: string, direction: 'up' | 'down') => {
    const index = widgets.findIndex(w => w.id === id);
    if (index === -1) return;

    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= widgets.length) return;

    const updated = [...widgets];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    handleSaveWidgets(updated);
  };

  return (
    <div className="app-grid">
      {/* Dynamic ambient lights */}
      <div className="ambient-glow glow-top-right"></div>
      <div className="ambient-glow glow-bottom-left"></div>

      {/* Left Column: Toolbox */}
      <Toolbox 
        theme={theme}
        onThemeChange={handleThemeChange}
        onAddWidget={handleAddWidget}
      />

      {/* Center Column: Drag Canvas */}
      <Canvas 
        widgets={widgets}
        onChangeWidget={handleChangeWidget}
        onToggleWidget={handleToggleWidget}
        onDeleteWidget={handleDeleteWidget}
        onMoveWidget={handleMoveWidget}
      />

      {/* Right Column: Live Markdown & HTML Preview */}
      <PreviewPanel 
        widgets={widgets}
      />
    </div>
  );
}
