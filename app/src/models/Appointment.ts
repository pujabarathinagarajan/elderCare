interface Appointment {
    _id: string;
    doctorId: string;
    patientId: string;
    dateTime: Date;
    status: string;
    duration: number;
    speciality: string;
    healthConcern: string;
}

export default Appointment;