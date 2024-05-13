import "@testing-library/jest-dom";
import { it, expect, describe } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import * as ace from "ace-builds";

beforeEach(() => {
  render(<App />);
});

afterEach(() => {
  cleanup();
});

describe("ThemeButton", () => {
  it("should show moon icon on initial render", () => {
    const moonIcon = screen.getByTestId("moon-icon");
    expect(moonIcon).toBeInTheDocument();
  });

  it("should add dark class to html tag if button is pressed", async () => {
    await userEvent.click(screen.getByTestId("theme-btn"));
    await waitFor(() => {
      expect(document.documentElement).toHaveClass("dark");
    });
  });

  it("should show sun icon if button is pressed", async () => {
    await userEvent.click(screen.getByTestId("theme-btn"));
    await waitFor(() => {
      const sunIcon = screen.getByTestId("sun-icon");
      expect(sunIcon).toBeInTheDocument();
    });
  });

  it("should show moon icon if button is pressed twice", async () => {
    await userEvent.click(screen.getByTestId("theme-btn"));
    await waitFor(() => {
      const sunIcon = screen.getByTestId("sun-icon");
      expect(sunIcon).toBeInTheDocument();
    });
    await userEvent.click(screen.getByTestId("theme-btn"));
    await waitFor(() => {
      const moonIcon = screen.getByTestId("moon-icon");
      expect(moonIcon).toBeInTheDocument();
    });
  });

  it("should change all editors to dark theme if pressed", async () => {
    await userEvent.click(screen.getByTestId("theme-btn"));
    await waitFor(() => {
      const codeEditorTheme = document.getElementById("code-editor");
      const inputEditorTheme = document.getElementById("inp-editor");
      const outputEditorTheme = document.getElementById("out-editor");
      expect(codeEditorTheme).toHaveClass("ace-solarized-dark");
      expect(inputEditorTheme).toHaveClass("ace-solarized-dark");
      expect(outputEditorTheme).toHaveClass("ace-solarized-dark");
    });
  });

  it("should change all editors to light theme if pressed twice", async () => {
    await userEvent.click(screen.getByTestId("theme-btn"));
    await waitFor(() => {
      const codeEditorTheme = document.getElementById("code-editor");
      const inputEditorTheme = document.getElementById("inp-editor");
      const outputEditorTheme = document.getElementById("out-editor");
      expect(codeEditorTheme).toHaveClass("ace-solarized-dark");
      expect(inputEditorTheme).toHaveClass("ace-solarized-dark");
      expect(outputEditorTheme).toHaveClass("ace-solarized-dark");
    });
    await userEvent.click(screen.getByTestId("theme-btn"));
    await waitFor(() => {
      const codeEditorTheme = document.getElementById("code-editor");
      const inputEditorTheme = document.getElementById("inp-editor");
      const outputEditorTheme = document.getElementById("out-editor");
      expect(codeEditorTheme).toHaveClass("ace-solarized-light");
      expect(inputEditorTheme).toHaveClass("ace-solarized-light");
      expect(outputEditorTheme).toHaveClass("ace-solarized-light");
    });
  });

  it("should not change the state of all editors if pressed", async () => {
    const codeEditorBeforeValue = ace.edit("code-editor").setValue("random1");
    const inputEditorBeforeValue = ace.edit("inp-editor").setValue("random2");
    const outputEditorBeforeValue = ace.edit("out-editor").setValue("random3");
    await userEvent.click(screen.getByTestId("theme-btn"));
    await waitFor(() => {
      const codeEditorTheme = document.getElementById("code-editor");
      const inputEditorTheme = document.getElementById("inp-editor");
      const outputEditorTheme = document.getElementById("out-editor");
      expect(codeEditorTheme).toHaveClass("ace-solarized-dark");
      expect(inputEditorTheme).toHaveClass("ace-solarized-dark");
      expect(outputEditorTheme).toHaveClass("ace-solarized-dark");
    });
    const codeEditorAfterValue = ace.edit("code-editor").getValue();
    const inputEditorAfterValue = ace.edit("inp-editor").getValue();
    const outputEditorAfterValue = ace.edit("out-editor").getValue();
    expect(codeEditorBeforeValue).toStrictEqual(codeEditorAfterValue);
    expect(inputEditorBeforeValue).toStrictEqual(inputEditorAfterValue);
    expect(outputEditorBeforeValue).toStrictEqual(outputEditorAfterValue);
  });
});
