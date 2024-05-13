// import "@testing-library/jest-dom";
// import { it, expect, describe } from "vitest";
// import { render, screen, cleanup, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import App from "../src/App";
// import * as ace from "ace-builds";

// beforeEach(() => {
//   render(<App />);
// });

// afterEach(() => {
//   cleanup();
// });

// describe("SettingsModal", () => {
//   it("should show cog icon on initial render", () => {
//     const cogIcon = screen.getByTestId("cog-icon");
//     expect(cogIcon).toBeInTheDocument();
//   });

//   it("should show editor settings modal if pressed", async () => {
//     await userEvent.click(screen.getByTestId("settings-btn"));
//     await waitFor(() => {
//       const crossIcon = screen.getByTestId("cross-icon");
//       expect(crossIcon).toBeInTheDocument();
//     });
//   });

//   it("should close editor settings modal if cross icon pressed", async () => {
//     await userEvent.click(screen.getByTestId("settings-btn"));
//     await waitFor(() => {
//       const crossIcon = screen.getByTestId("cross-icon");
//       expect(crossIcon).toBeInTheDocument();
//     });
//     await userEvent.click(screen.getByTestId("cross-btn"));
//     await waitFor(() => {
//       const cogIcon = screen.getByTestId("cog-icon");
//       expect(cogIcon).toBeInTheDocument();
//     });
//   });

//   it("should change the font family in all editors based on dropdown selection", async () => {
//     await userEvent.click(screen.getByTestId("settings-btn"));
//     await waitFor(() => {
//       const crossIcon = screen.getByTestId("cross-icon");
//       expect(crossIcon).toBeInTheDocument();
//     });

//     const fontFamilies = {
//       "Fira Code": "FiraCode",
//       "Go Mono": "GoMono",
//       "Jet Brains": "JetBrainsMono",
//       Roboto: "Roboto",
//       "Source Code Pro": "SourceCodePro",
//       "Ubuntu Mono": "UbuntuMono",
//     };

//     for (const key in fontFamilies) {
//       await userEvent.selectOptions(screen.getByTestId("font-family"), key);
//       await waitFor(() => {
//         const fontFamily = ace.edit("code-editor").getOption("fontFamily");
//         expect(fontFamily).toStrictEqual(fontFamilies[key]);
//       });
//     }
//   });

//   it("should change the font size in all editors based on dropdown selection", async () => {
//     await userEvent.click(screen.getByTestId("settings-btn"));
//     await waitFor(() => {
//       const crossIcon = screen.getByTestId("cross-icon");
//       expect(crossIcon).toBeInTheDocument();
//     });

//     for (let i = 12; i < 44; i++) {
//       await userEvent.selectOptions(
//         screen.getByTestId("font-size"),
//         i.toString()
//       );
//       await waitFor(() => {
//         const fontSize = ace.edit("code-editor").getFontSize();
//         expect(fontSize).toStrictEqual(i);
//       });
//     }
//   });
// });
