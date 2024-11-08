import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { CycleContextProvider } from "./contexts/ContextProvider";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CycleContextProvider>
        <Router />
      </CycleContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}
