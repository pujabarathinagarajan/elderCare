import React from "react";
import "../../css/DoctorCard.css";
import defaultPicture from "../../assets/profilePic.png";
import Doctor from "../../models/Doctor";
import BookAppointment from "../modals/BookApointment"; // Corrected import statement
import { useSelector } from "react-redux";
interface Props {
  doctor: Doctor;
  openModal: () => void;
}

const DoctorCard: React.FC<Props> = ({ doctor, openModal }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { name = "", email = "", _id: userId } = userInfo || {};
  return (
    <div className="doctor-card">
      <div className="doctor-image-container">
        <img
          src={defaultPicture}
          alt={`${doctor.fullName}`}
          className="doctor-image"
        />
        <span className="doctor-experience-badge">
          {doctor.experience} years exp
        </span>
      </div>
      <div className="doctor-info">
        <div className="card-title">
          <h2 className="doctor-name">{doctor.fullName}</h2>
          <div className="doctor-rating">
            <span className="doctor-rating-number">{doctor.rating}</span>
            <span className="doctor-rating-icon">⭐</span>
          </div>
        </div>
        <div className="doctor-location-speciality line-clamp-1 w-[400px]">
          <span className="doctor-location">
            {doctor.location.length > 0 ? doctor.location.join(", ") : ""}
          </span>
          <span className="divider">|</span>
          <span className="doctor-speciality">
            {doctor.speciality.length > 0 ? doctor.speciality.join(", ") : ""}
          </span>
        </div>
        <div className="doctor-education line-clamp-1 w-[400px]">{doctor.education}</div>
        <div className="doctor-next-available line-clamp-1 w-[400px]">
          Next available today at {doctor.nextAvailableTime}
        </div>
      </div>
      <div className="doctor-actions">
        <button className="message-button">
          {/* Replace "icon-class" with the actual class or src for your icon */}
          <i className="icon-class">💬</i>
          Send message
        </button>
        <button className="book-button" onClick={openModal}>
          {/* Replace "icon-class" with the actual class or src for your icon */}
          <i className="icon-class">⚡</i>
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
