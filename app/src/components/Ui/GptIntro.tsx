import { IonIcon } from "@ionic/react";
import { sparkles } from "ionicons/icons";
import { useSettings } from "../../store/store";
import bot from "../../assets/images/ecBuddy/bot.png"; // Importing the bot icon

import classNames from "classnames";

export default function GptIntro() {
  const [selectedModel, setModel] = useSettings((state) => [
    state.settings.selectedModal,
    state.setModal,
  ]);
  const isGptThreeSelected = selectedModel.startsWith("gpt-3");
  return (
    <>
      <div className="h-96 flex items-start justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl text-blue-500">
            <img
              src={bot}
              alt="bot"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div className="mt-2 text-lg font-extrabold"> EC Buddy</div>
          <h1 className="mt-5 text-center text-black-300">
            I'm your Health companion, ready to answer <br />
            your questions
          </h1>
        </div>
      </div>
    </>
  );
}
