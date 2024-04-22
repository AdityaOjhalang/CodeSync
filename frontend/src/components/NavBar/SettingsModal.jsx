import { IoCloseCircle } from "react-icons/io5";
import * as ace from "ace-builds";

function SettingsModal({ setModalProps, fontFamily, fontSize }) {
  const changeFontFamily = (newFontFamily) => {
    ace.edit("code-editor").setOptions({ fontFamily: newFontFamily });
    ace.edit("inp-editor").setOptions({ fontFamily: newFontFamily });
    ace.edit("out-editor").setOptions({ fontFamily: newFontFamily });
  };

  const changeFontSize = (newFontSize) => {
    ace.edit("code-editor").setFontSize(newFontSize);
    ace.edit("inp-editor").setFontSize(newFontSize);
    ace.edit("out-editor").setFontSize(newFontSize);
  };

  return (
    <div>
      <div
        className="fixed top-0 right-0 left-0 z-50 h-modal overflow-y-auto overflow-x-hidden md:inset-0 md:h-full items-start justify-end flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
        color="bg-[#FCF1D3] dark:bg-white"
      >
        <div className="relative h-full w-full p-3 md:h-auto max-w-sm">
          <div className="relative rounded-lg bg-[#FCF1D3] dark:bg-[#01313F] shadow">
            <div
              className="flex items-center justify-between rounded-t border-[#DDD6C1] dark:border-[#00212B] border-b-[0.75rem] p-[0.72rem]"
              color="text-red-500"
            >
              <h3 className="text-lg font-medium text-[#717171] dark:text-[#93A1A1]">
                Editor Settings
              </h3>
              <button
                onClick={() => {
                  const state = {
                    visible: false,
                    fontFamily: document.getElementById("font-family").value,
                    fontSize: document.getElementById("font-size").value,
                  };
                  setModalProps(state);
                }}
                type="button"
                data-testid="cross-btn"
              >
                <IoCloseCircle
                  className="text-[#717171] dark:text-[#93A1A1] text-2xl"
                  data-testid="cross-icon"
                />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#717171]">
                <div className="w-1/6 text-center text-lg">Font</div>
                <select
                  id="font-family"
                  data-testid="font-family"
                  defaultValue={fontFamily}
                  onChange={(e) => changeFontFamily(e.target.value)}
                  className="rounded-lg h-10 w-full border-[#717171] focus:border-[#717171] dark:border-[#93A1A1] dark:focus:border-[#93A1A1] bg-[#FDF6E3] dark:bg-[#012B36] text-[#717171] dark:text-[#93A1A1] focus:ring-transparent"
                >
                  <option value={"FiraCode"}>Fira Code</option>
                  <option value={"GoMono"}>Go Mono</option>
                  <option value={"JetBrainsMono"}>Jet Brains</option>
                  <option value={"Roboto"}>Roboto</option>
                  <option value={"SourceCodePro"}>Source Code Pro</option>
                  <option value={"UbuntuMono"}>Ubuntu Mono</option>
                </select>
              </div>
              <div className="flex items-center gap-2 text-[#717171]">
                <div className="w-1/6 text-center text-lg">Size</div>
                <select
                  id="font-size"
                  data-testid="font-size"
                  defaultValue={fontSize}
                  onChange={(e) => changeFontSize(parseInt(e.target.value))}
                  className="rounded-lg h-10 w-full border-[#717171] focus:border-[#717171] dark:border-[#93A1A1] dark:focus:border-[#93A1A1] bg-[#FDF6E3] dark:bg-[#012B36] text-[#717171] dark:text-[#93A1A1] focus:ring-transparent"
                >
                  {Array.from({ length: 32 }, (_, index) => (
                    <option key={index} value={index + 12}>
                      {index + 12}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
