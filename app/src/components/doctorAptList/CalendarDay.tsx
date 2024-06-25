import React from 'react';
import Appointment from '../../models/Appointment'; // Ensure this is the correct path and export

interface Props {
    day: Date;
    appointments: Appointment[];
    onClick: () => void;
}

interface Props {
    day: Date;
    appointments: Appointment[];
    onAppointmentClick: (appointment: Appointment) => void; // New handler for appointment clicks
}

const CalendarDay: React.FC<Props> = ({ day, appointments, onAppointmentClick }) => {
    return (
        <div className="day">
            <h4>{day.getDate()}</h4>
            <div className="apt-list">
                {appointments.map((appointment, index) => (
                    <p key={index} onClick={() => onAppointmentClick(appointment)}>
                        Apt {index + 1}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default CalendarDay;
