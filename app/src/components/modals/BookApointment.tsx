import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "react-ios-time-picker";
import { loadStripe } from "@stripe/stripe-js";
interface BookAppointmentProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({
  modalIsOpen,
  closeModal,
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState<any>();
  const [showSecondModal, setShowSecondModal] = useState(false);

  // Utility functions
  const formatDate = (date: Date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date: Date) => {
    const options = { hour: "numeric", minute: "2-digit" };
    return date.toLocaleTimeString("en-US", options);
  };

  const getDayOfWeek = (date: Date) => {
    const options = { weekday: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  const bookModal = () => {
    const selectedDate = new Date();

    const formattedDate = formatDate(selectedDate);
    const formattedTime = formatTime(selectedDate);
    const dayOfWeek = getDayOfWeek(selectedDate);

    setSelectedDateTime({
      date: formattedDate,
      time: formattedTime,
      dayOfWeek: dayOfWeek,
    });
    setShowSecondModal(true); // Show the second modal
    closeModal();
  };

  const handleConfirmAndPay = async () => {
    console.log(" from 52");
    const stripe = await loadStripe(
      "pk_test_51OUVcoDmUxj6ZBojDXqp2BFTKFBq1JYUKR3Nof0nqpdrHHpnyrb9FtY1FCGRSefMDyaWW018ixr7sW7nOLLKdEEC00qRjNp7CJ"
    );

    try {
      console.log(" from 58");
      const response = await fetch(
        "http://localhost:3000/elderlycare/create-checkout-session",
        {
          method: "POST",
        }
      );
      const data = await response.json();
      console.log(" from 66", data);
      const sessionId = data.id;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        console.log("print from stripe", error);
        if (error) {
          console.error("Error:", error);
        }
      } else {
        console.error("Stripe is not initialized.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      {modalIsOpen && (
        <div className="modal-overlay">
          <div className="modal flex flex-col">
            <div className="flex">
              <div className="leftDiv">
                <h2>Select date & time</h2>
                <h3 className="subheading">Select appointment date</h3>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar />
                </LocalizationProvider>
              </div>

              <div className="rightDiv">
                <h3 className="subheading">Select appointment time</h3>
                <div>
                  <TimePicker />
                </div>
              </div>
            </div>

            <div className="mt-auto flex justify-between py-8 px-8">
              <button
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="px-6 py-2  bg-primary hover:bg-primary text-white flex items-center justify-center rounded"
                onClick={bookModal}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
      {showSecondModal && (
        <div className="modal-overlay-1">
          <div className="modal-1">
            <div className="flex flex-col items-center gap-2">
              <h2 className="sm:text-lg text-base font-bold text-primary-700 text-xl font-medium">
                Review Appointment
              </h2>
            </div>
            <div className="curved-border">
              <p className="left-align">
                <span className="bold-text">Appointment Date:</span>{" "}
                {selectedDateTime.date}
              </p>
              <p className="left-align">
                <span className="bold-text">Appointment Time:</span>{" "}
                {selectedDateTime.time} {selectedDateTime.dayOfWeek}
              </p>
            </div>

            <div className="flex py-8 justify-center sm:gap-8 gap-4 pb-8 sm:text-base text-sm">
              <button
                className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                onClick={() => setShowSecondModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-6 py-2 rounded bg-primary hover:bg-primary text-white flex items-center justify-center"
                onClick={handleConfirmAndPay}
                type="submit"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
