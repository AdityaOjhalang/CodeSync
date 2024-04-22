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

describe("SettingsModal", () => {
  it("should show python as default language for the editor", () => {
    const selectedLang = document.getElementById("languages").value;
    expect(selectedLang).toStrictEqual("python");

    const editorLang = ace.edit("code-editor").getSession().getMode()["$id"];
    expect(editorLang).toContain(selectedLang);
  });

  it("should change the language in code editor based on dropdown selection", async () => {
    const languages = {
      Javascript: "javascript",
      Java: "java",
      C: "c",
      "C++": "cpp",
      Python: "python",
      Dart: "dart",
      Go: "go",
    };

    for (const key in languages) {
      await userEvent.selectOptions(screen.getByTestId("languages"), key);
      await waitFor(() => {
        const editorLang = ace.edit("code-editor").getSession().getMode()[
          "$id"
        ];
        expect(editorLang).toContain(languages[key]);
      });
    }
  });

  it("should not change the language in input and output editor based on dropdown selection", async () => {
    const languages = {
      Javascript: "javascript",
      Java: "java",
      C: "c",
      "C++": "cpp",
      Python: "python",
      Dart: "dart",
      Go: "go",
    };

    for (const key in languages) {
      await userEvent.selectOptions(screen.getByTestId("languages"), key);
      await waitFor(() => {
        const outLang = ace.edit("out-editor").getSession().getMode()["$id"];
        const inpLang = ace.edit("inp-editor").getSession().getMode()["$id"];
        expect(outLang).toContain("plain_text");
        expect(inpLang).toContain("plain_text");
      });
    }
  });
});
