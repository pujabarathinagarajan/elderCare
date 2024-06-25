import React, { useState } from 'react';
import classnames from "classnames";
import ChatHistory from "./ChatHistory";
import { IonIcon } from "@ionic/react";
import {
  addOutline,
  chatboxEllipsesOutline,
  settingsOutline,
  ellipsisHorizontalOutline,
  closeOutline,
} from "ionicons/icons";
import useChat, { useAuth, useSettings } from "../../store/store";
import Settings from "../modals/Settings";
import Modal from "../modals/Modal";
import SystemMessage from "../modals/SystemMessage";
import logo from "../../assets/images/logo.png";
import messageIcon from "../../assets/images/leftDrawer/messageIcon.png";
import findDoc from "../../assets/images/leftDrawer/findDoc.png";
import newChat from "../../assets/images/leftDrawer/newChat.png";
import Header from "../Header/Header";
import EcBuddyWindow from '../../pages/ecBuddyWindow';
import AppointmentList from '../doctorAptList/AppointmentList';
import DoctorList from '../doctorAptList/DoctorList';

interface NavbarProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ active, setActive }) => {
  const [selectedTab, setSelectedTab] = useState('chat');  // 'chat', 'doctors', 'appointments'

  const {
    addNewChat,
    isModalVisible,
    setModalVisible,
    isSystemMessageModalVisible,
    setSystemMessageModalVisible,
    selectedModal,
    modalsList,
    setModal,
  } = useSettings((state) => ({
    addNewChat: state.addNewChat,
    isModalVisible: state.isModalVisible,
    setModalVisible: state.setModalVisible,
    isSystemMessageModalVisible: state.isSystemMessageModalVisible,
    setSystemMessageModalVisible: state.setSystemMessageModalVisible,
    selectedModal: state.settings.selectedModal,
    modalsList: state.modalsList,
    setModal: state.setModal,
  }));

  const showContent = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  // Define the header text for each tab
  const headerTexts = {
    chat: { chatWithText: "Chat with", buddyNameText: "EC Buddy" },
    doctors: { chatWithText: "Find", buddyNameText: "Doctors" },
    appointments: { chatWithText: "View", buddyNameText: "Appointments" }
  };

  // Get the current header texts based on the selected tab
  const currentHeaderTexts = headerTexts[selectedTab];

  return (
    <>
      
      {/* Navbar and EcBuddyWindow Container */}
      <div className="fixed inset-0 z-30 flex">
        {/* Navbar */}
        <div
          className={classnames(
            "duration-500 w-full md:w-[260px] bg-white text-black z-10 flex-shrink-0 transition-all",
            { "translate-x-0": active, "-translate-x-full": !active }
          )}
          style={{ paddingLeft: '16px', paddingRight: '16px' }}
        >
          <nav
            className={classnames(
              "absolute left-0 bottom-0 top-0 md:flex-grow-1 w-9/12 md:w-[260px] bg-white text-black z-10 flex flex-col transition duration-500",
              {
                "translate-x-0": active,
                "-translate-x-full md:-translate-x-[150%]": !active,
              }
            )}
            style={{ paddingLeft: '16px', paddingRight: '16px' }} // Adjust the pixel values as needed
          >
            <div style={{ padding: "16px", textAlign: "center", marginBottom: "20px" }}>
              <img src={logo} alt="Logo" style={{ width: "100%" }} />
            </div>

            {/* Button: Talk to EC Buddy */}
            <div style={buttonStyle}>
              <button onClick={() => showContent('chat')} style={getButtonStyle('chat', selectedTab)}>
                <img src={messageIcon} alt="Chat Icon" style={{ width: "40px", height: "40px" }} />
                <span>Talk to EC Buddy</span>
              </button>
            </div>

            {/* Button: Find Doctors */}
            <div style={buttonStyle}>
              <button onClick={() => showContent('doctors')} style={getButtonStyle('doctors', selectedTab)}>
                <img src={findDoc} alt="Doctor Icon" style={{ width: "40px", height: "40px" }} />
                <span>Find Doctors</span>
              </button>
            </div>

            {/* Button: My Appointments */}
            <div style={buttonStyle}>
              <button onClick={() => showContent('appointments')} style={getButtonStyle('appointments', selectedTab)}>
                <img src={findDoc} alt="Appointment Icon" style={{ width: "40px", height: "40px" }} />
                <span>My Appointments</span>
              </button>
            </div>

            {selectedTab === 'chat' && (
              <div className="content chat-content">
                <div className="flex justify-between items-center p-4 border-gray-300">
                  <h2 className="text-lg font-semibold">Recent Chats</h2>
                  <button
                    onClick={reloadPage}
                    className="hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 flex items-center justify-center"
                    style={{
                      background: 'none',
                      margin: 0,
                      padding: 0,
                      border: 'none',
                      color: 'gray', // Sets the color of the plus sign to grey
                      fontSize: '1.5rem',
                    }}
                  >
                    +
                  </button>
                </div>
                <ChatHistory />
              </div>
            )}
            {selectedTab === 'doctors' && (
              <div className="content doctors-content">
                {/* Component or content for finding doctors */}

              </div>
            )}
            {selectedTab === 'appointments' && (
              <div className="content appointments-content">
                {/* Component or content for managing appointments */}

              </div>
            )}

            <button
              type="button"
              onClick={() => setActive(false)}
              className="close md:hidden absolute top-2 right-2 h-10 w-10 border-2 border-gray-200 p-2 flex items-center justify-center"
            >
              <IonIcon icon={closeOutline} size="large" />
            </button>
          </nav>

        </div>

        {/* Header aligned right of Navbar */}
        {active && (
          <Header
            chatWithText={currentHeaderTexts.chatWithText}
            buddyNameText={currentHeaderTexts.buddyNameText}
            style={{
              width: `calc(100% - ${active ? '260px' : '0px'})`, // Adjust width based on active state
              marginLeft: active ? '260px' : '0', // Push header to the right of the navbar
            }}
          />
        )}


        {/* EcBuddyWindow: It will show to the right of the navbar */}
        {selectedTab === 'chat' && (
          <div className="flex-grow h-full bg-white overflow-auto">
            <EcBuddyWindow />
          </div>
        )}
        {selectedTab === 'doctors' && (
          <div className="flex-grow h-full bg-white overflow-auto">
            <DoctorList />
          </div>
        )}
        {selectedTab === 'appointments' && (
          <div className="flex-grow h-full bg-white overflow-auto">
            <AppointmentList />
          </div>
        )}
      </div>

      <Modal visible={isModalVisible}><Settings /></Modal>
      <Modal visible={isSystemMessageModalVisible}><SystemMessage /></Modal>
    </>
  );
};

export default Navbar;

const buttonStyle = {
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px"
};

const getButtonStyle = (buttonName: string, selectedTab: string) => ({
  backgroundColor: buttonName === selectedTab ? "#8659D3" : "white",
  color: buttonName === selectedTab ? "#FFFFFF" : "black",
  padding: "7px 7px",
  borderRadius: "40px",
  border: "none",
  display: "flex",
  alignItems: "center",
  width: "90%",
  borderWidth: "0.01px",
  borderStyle: "solid",
  cursor: "pointer",
  fontFamily: "Lexend, sans-serif",
  fontWeight: "bold",
  flex: "1",
});
