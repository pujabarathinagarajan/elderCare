// Importing React and necessary components
import React, { useState, useEffect } from 'react';
import SearchBar from './Searchbar';
import AptFilterSection from './AptFilterSection';
import Pagination from './Pagination';
import '../../css/AppointmentList.css';
import FilterAppointments from '../../models/FilterAppointments';
import { useSelector } from "react-redux";

type Appointment = {
    bookingId: string;
    doctorName: string;
    bookingDate: string;
    status: string;
};

const AppointmentList: React.FC = () => {

    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [appointments, setAppointment] = useState<Appointment[]>([]);
    const [filters, setFilters] = useState<FilterAppointments>({});
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 11;

    // Destructure user information if available, or provide default values
    const { name = "", email = "", _id: userId } = userInfo || {};

    useEffect(() => {
        fetchAppointments(); 
        console.log("patientId: " + userId); // Fetch appointment when filters change
    }, [filters]);

    const fetchAppointments = async () => {
        const queryParams = new URLSearchParams();

        // Appending filters as query parameters if they exist
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                queryParams.append(key, value.toString());
            }
        });

        try {
            queryParams.append('patientId', userId);
            console.log("patientId: " + userId);
            const endpoint = `http://localhost:3000/elderlycare/filterDoctorAndApoointment?${queryParams.toString()}`;
            const response = await fetch(endpoint, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response);
            const data = await response.json() as Appointment[];
            setAppointment(data);
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
        }
    };

    const handleFilterChange = (newFilters: FilterAppointments) => {
        setFilters(newFilters);  // Update filters which triggers re-fetching of appointments
    };

    return (
        <div className="appointment-list-container">
            <AptFilterSection onFilterAppointments={handleFilterChange} />
            <div className='right-panel'>
                <SearchBar onSearch={(keyword) => setFilters({ ...filters, name: keyword })} placeholder="Search Bookings..." />
                <div className="appointments-table-container">
                    <table className="appointments-table">
                        <thead>
                            <tr className="appointment-title">
                                <th>BOOKING ID</th>
                                <th>DOCTOR NAME</th>
                                <th>BOOKING DATE</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.bookingId}>
                                    <td>{appointment.bookingId}</td>
                                    <td>{appointment.doctorName}</td>
                                    <td>{appointment.bookingDate.toString()}</td>
                                    <td>
                                        <span className={`status ${appointment.status.toLowerCase()}`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    );
};

export default AppointmentList;
