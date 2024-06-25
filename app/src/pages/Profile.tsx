import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import userSix from '../images/user/user-06.png';
import locationIcon from '../images/icon/icon-location.svg';
import starIcon from '../images/icon/star.svg';
import calendarIcon from '../images/icon/icon-calendar.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../authStore/store';
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation('profilePage');
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const navigate = useNavigate();

  // Destructure user information if available, or provide default values
  const { _id: userId } = userInfo || {};

  const [isEditing, setIsEditing] = useState(false);
  const [ratings, setRatings] = useState(4.5);
  const [reviews, setReviews] = useState(120);
  const [appointments, setAppointments] = useState(50);
  const [data, setData] = useState({
    fullName: '',
    bio: '',
    speciality: [],
    location: [],
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // You can add logic here to save the edited data to your backend
  };

  const viewAppointment = () => {
    navigate("/calendar");
  };

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/users/getDocProfile/' + userId
        );
        if (!response.ok) {
          throw new Error('Failed to fetch doctor profile');
        }
        const doctorProfile = await response.json();
        console.log('doctor profile from react', doctorProfile[0]);
        // setFormData(doctorProfile[0]); // Assuming the response is an array with one object
        console.log(data);

        const mappedData = {
          fullName: doctorProfile[0].fullName || '',
          bio: doctorProfile[0].bio || '',
          speciality: doctorProfile[0].speciality || [],
          location: doctorProfile[0].location || [],
        };
        console.log(mappedData);
        setData({
          ...data,
          ...mappedData,
        });
        console.log(data);
      } catch (error) {
        // console.error(error?.message);
      }
    };

    fetchDoctorProfile();
  }, []); // Run only once on component mount

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < Math.floor(ratings); i++) {
      stars.push(<img key={i} src={starIcon} alt="Star Icon" className="h-4 w-4 mr-1" />);
    }
    if (ratings % 1 !== 0) {
      stars.push(<img key={Math.floor(ratings)} src={starIcon} alt="Star Icon" className="h-4 w-4 mr-1" />);
    }
    return stars;
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={t("profile.pageName")} />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="grid grid-cols-12 gap-4 p-4">
          <div className="col-span-12 md:col-span-4">
            <div className="flex flex-col items-center">
              <img
                src={userSix}
                alt="user"
                className="h-24 w-24 md:h-32 md:w-32 object-cover object-center rounded-full border-4 border-primary"
              />
              <div className="flex flex-col items-center mt-4">
                <h2 className="text-xl font-bold">{data.fullName}</h2>
                <p className="text-sm text-gray-500">{isEditing ? <input type="text" value={data.speciality} /> : data.speciality}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <img src={locationIcon} alt="Location Icon" className="h-4 w-4 mr-1" />
                  <span>{data.location}</span>
                </div>
              </div>
              {isEditing ? (
                <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md" onClick={handleSave} style={{ backgroundColor: '#DACDF2FF' }}>{t("profile.save")}</button>
              ) : (
                <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md" onClick={handleEdit} style={{ backgroundColor: '#DACDF2FF' }}>{t("profile.edit")}</button>
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{t("profile.aboutMe")}</h3>
              {isEditing ? (
                <textarea value={data.bio} className="text-gray-600 mt-2" />
              ) : (
                <p className="text-gray-600 mt-2">{data.bio}</p>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{t("profile.reviews")}</h3>
              <div className="border-t border-gray-200 pt-4">
                {/* Reviews content */}
                <div className="flex items-center">
                  <img
                    src={userSix}
                    alt="user"
                    className="h-8 w-8 rounded-full object-cover object-center"
                  />
                  <div className="ml-3">
                    <h4 className="text-lg font-semibold">Jane Smith</h4>
                    <div className="flex items-center">
                      {renderStars()}
                      <span>{ratings}</span>
                    </div>
                    <p className="text-gray-600">"Great service! Highly recommended."</p>
                  </div>
                </div>
                {/* Add more review items here */}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col items-center">
                <span className="font-semibold">{t("profile.rating")}</span>
                <span className="text-rose">{ratings}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">{t("profile.reviews")}</span>
                <span className="text-rose">{reviews}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">{t("profile.appointments")}</span>
                <span className="text-rose">{appointments}</span>
              </div>
              <button className="flex items-center bg-primary text-white px-4 py-2 rounded-md" style={{ backgroundColor: '#DACDF2FF' }} onClick={viewAppointment}>
                <img src={calendarIcon} alt="Calendar Icon" className="h-4 w-4 mr-2" />
                {t("profile.viewAppointments")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
