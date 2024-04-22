import { createContext, useState } from "react";

export const LanguageContext = createContext();

export function LanguageContextProvider({ children }) {
  const [language] = useState({
    python: `# Write your python code here

print("Hello World!")`,
    dart: `// Write your dart code here

void main() {
    print("Hello World!");
}`,
  });

  return (
    <LanguageContext.Provider value={{ language }}>
      {children}
    </LanguageContext.Provider>
  );
}
