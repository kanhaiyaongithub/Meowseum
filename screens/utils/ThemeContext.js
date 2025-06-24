import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

const lightTheme = {
  background: "#ffffff",
  card: "#f2f2f2",
  text: "#000000",
};

const darkTheme = {
  background: "#121212",
  card: "#1e1e1e",
  text: "#ffffff",
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? darkTheme : lightTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context || !context.colors) {
    return {
      isDark: false,
      toggleTheme: () => {},
      colors: {
        background: "#ffffff",
        card: "#f2f2f2",
        text: "#000000",
      },
    };
  }
  return context;
};
