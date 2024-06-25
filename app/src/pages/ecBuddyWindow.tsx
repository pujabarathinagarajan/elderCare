import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar.tsx";
import DefaultIdeas from "../components/DefaultIdea/DefaultIdeas.tsx";
import UserQuery from "../components/UserInput/UserQuery.tsx";
import GptIntro from "../components/Ui/GptIntro.tsx";
import { IonIcon, setupIonicReact } from "@ionic/react";
import { menuOutline, addOutline } from "ionicons/icons";
import Header from "../components/Header/Header.tsx";
import useChat, { chatsLength, useAuth, useTheme } from "../store/store.tsx";
import classNames from "classnames";
import Chats from "../components/Chat/Chats.tsx";
import Modal from "../components/modals/Modal.tsx";
import Apikey from "../components/modals/Apikey.tsx";
import TopBar from "../components/Navbar/TopBar.tsx";

setupIonicReact();

function EcBuddyWindow() {
  const [active, setActive] = useState(true);
  const isChatsVisible = useChat(chatsLength);
  const addNewChat = useChat((state) => state.addNewChat);
  const userHasApiKey = useAuth((state) => state.apikey);
  const [theme] = useTheme((state) => [state.theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <div>
        <main
          className={classNames("fixed left-0 px-2 right-0 transition-all duration-500 bottom-50 dark:bg-white/10", {
            "md:ml-[260px]": active,
          })}
        >
          {!isChatsVisible && <GptIntro />}
          {/* {isChatsVisible ? <Header /> : <GptIntro />} */}
          {isChatsVisible && <Chats />}
          <div
            className={classNames(
              "fixed left-0 px-2 right-0 transition-all duration-500 bottom-30 backdrop-blur-sm bg-white dark:bg-white/10",
              {
                "dark:bg-dark-primary bg-white": isChatsVisible,
                "md:ml-[260px]": active,
              }
            )}
          >
            <div className="max-w-2xl md:max-w-[calc(100% - 260px)] mx-auto">
              {!isChatsVisible && (
                <>
                  <DefaultIdeas />
                </>
              )}

              <div className="dark:bg-inherit">
                <UserQuery />
              </div>
            </div>
          </div>
          <Modal visible={!Boolean(userHasApiKey)}>
            <Apikey />
          </Modal>
        </main>
      </div>
    </>
  );
}

export default EcBuddyWindow;
