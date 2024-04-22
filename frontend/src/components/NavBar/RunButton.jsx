import { FaPlay } from "react-icons/fa";

function RunButton() {
  return (
    <button className="bg-orange-400 hover:bg-orange-600 dark:bg-green-400 dark:hover:bg-green-600 text-white font-bold py-2 px-2 rounded-lg flex items-center gap-1">
      <FaPlay /> Run
    </button>
  );
}

export default RunButton;
