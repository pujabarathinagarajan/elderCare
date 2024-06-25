import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "../../models/Appointment";
import DefaultLayout from "../../layout/DefaultLayout";
import CalendarDay from "./CalendarDay";
import Modal from "react-modal";
import "../../css/Calendar.css";
import { useSelector } from "react-redux";

Modal.setAppElement("#root"); // Ensure this is set correctly to avoid issues with screen readers

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "10px",
    padding: "20px",
    zIndex: "1000",
    color: "#828282",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.75)",
  },
};

function Calendar() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  // const userInfo = useSelector(state => state.auth.userInfo);

  // Destructure user information if available, or provide default values
  const { name = "", email = "", _id: userId } = userInfo || {};

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, [currentMonth]);

  const fetchAppointments = async () => {
    const response = await axios.get(
      `http://localhost:3000/elderlycare/appointments`
    );
    setAppointments(response.data);
  };

  const openModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const days = new Array(daysInMonth).fill(null).map((_, i) => {
    const day = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      i + 1
    );
    const dayAppointments = appointments.filter(
      (appt) => new Date(appt.dateTime).toDateString() === day.toDateString()
    );
    return (
      <CalendarDay
        key={i}
        day={day}
        appointments={dayAppointments}
        onAppointmentClick={openModal}
      />
    );
  });

  return (
    <DefaultLayout>
      <div className="calendar">
        <div className="calendar-month">
          <button className="month-btn" onClick={handlePrevMonth}>
            &lt;
          </button>
          <h4>
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </h4>
          <button className="month-btn" onClick={handleNextMonth}>
            &gt;
          </button>
        </div>
        <div className="days-grid">{days}</div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Appointment Details"
        >
          <h2 className="mx-26 font-bold mb-10">Appointment Details</h2>
          {selectedAppointment && (
            <div className="space-y-2">
              {/* <p>ID: {selectedAppointment._id}</p> */}
              <p>
                Date: {new Date(selectedAppointment.dateTime).toLocaleString()}
              </p>
              <p>Duration: {selectedAppointment.duration} minutes</p>
              <p>Doctor ID: {selectedAppointment.doctorId}</p>
              <p>Patient Name: {userInfo.name}</p>
              <p>Health Concern: {selectedAppointment.healthConcern}</p>
              <p>Speciality: {selectedAppointment.speciality}</p>
            </div>
          )}
        </Modal>
      </div>
    </DefaultLayout>
  );
}

export default Calendar;
