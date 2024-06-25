import { useEffect, useState } from "react";
// import Navbar from "./components/Navbar/Navbar";
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

function EcBuddy() {
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
      <div className="App  font-montserrat md:flex ">
        <Navbar active={active} setActive={setActive} />
        
        
      </div>
    </>
  );
}

export default EcBuddy;
