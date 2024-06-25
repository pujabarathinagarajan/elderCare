// DoctorList.tsx
import React, { useState, useEffect } from 'react';
import SearchBar from './Searchbar';
import FilterSection from './FilterSection';
import DoctorCard from './DoctorCard';
import '../../css/DoctorList.css';
import Doctor from '../../models/Doctor';
import FilterDoctors from '../../models/FilterDoctors';
import BookAppointment from '../modals/BookApointment';

const DoctorList: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [filters, setFilters] = useState<FilterDoctors>({});
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null); // State to keep track of selected doctor
    const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal

    useEffect(() => {
        fetchDoctors();  // Fetch doctors when filters change
    }, [filters]);

    const fetchDoctors = async () => {
        const queryParams = new URLSearchParams();

        // Appending filters as query parameters if they exist
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                queryParams.append(key, value.toString());
            }
        });

        try {
            const endpoint = `http://localhost:3000/elderlycare/filterDoctors?${queryParams.toString()}`;
            const response = await fetch(endpoint, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response);
            const data = await response.json() as Doctor[];
            setDoctors(data);
        } catch (error) {
            console.error("Failed to fetch doctors:", error);
        }
    };

    const handleFilterChange = (newFilters: FilterDoctors) => {
        setFilters(newFilters);  // Update filters which triggers re-fetching of doctors
    };

    const openModal = (doctor: Doctor) => {
        setSelectedDoctor(doctor); // Set the selected doctor
        setModalIsOpen(true); // Open the modal
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="doctor-list-container">
            <FilterSection onFilterDoctors={handleFilterChange} />
            <div className='right-panel'>
                <SearchBar onSearch={(keyword) => setFilters({ ...filters, keyword })}  placeholder="Search doctors..."/>
                <div className="doctor-list">
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor._id} doctor={doctor} openModal={() => openModal(doctor)} />
                    ))}
                </div>
            </div>
            {selectedDoctor && (
                <BookAppointment
                    modalIsOpen={modalIsOpen} 
                    closeModal={closeModal}
                    selectedDoctor={selectedDoctor}
                />
            )}
        </div>
        
    );
};

export default DoctorList;
