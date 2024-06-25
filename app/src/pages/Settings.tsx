import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "../layout/DefaultLayout";
import { FiUpload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import toast from 'react-hot-toast';

const Settings = () => {
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { t } = useTranslation('settingsPage');
  
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  // const userInfo = useSelector(state => state.auth.userInfo);

  // Destructure user information if available, or provide default values
  const { name = "", email = "", _id: userId } = userInfo || {};

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNo: "",
    email: "",
    experience: "",
    bio: "",
    speciality: [],
    location: [],
    img: "",
  });

  const [selectedSpecialists, setSelectedSpecialists] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/elderlycare/getDocProfile/" + userId
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doctor profile");
        }
        const doctorProfile = await response.json();
        console.log("doctor profile from react", doctorProfile[0]);
        setFormData(doctorProfile[0]); // Assuming the response is an array with one object
        console.log("form data>>", formData);
        //  const profilepic = doctorProfile.img;

        const mappedData = {
          fullName: doctorProfile[0].fullName || "",
          phoneNo: doctorProfile[0].phoneNo || "",
          email: doctorProfile[0].email || "",
          experience: doctorProfile[0].experience || "",
          bio: doctorProfile[0].bio || "",
          speciality: doctorProfile[0].speciality || [],
          location: doctorProfile[0].location || [],
          img: doctorProfile[0].img || "",
        };
        if (doctorProfile[0]?.imageData?.data?.length > 0) {
          const uint8Array = new Uint8Array(doctorProfile[0]?.imageData?.data);

          // Convert Uint8Array to a blob
          const blob = new Blob([uint8Array], { type: "image/jpeg" }); // Change type if needed

          // Convert blob to a data URL
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result;
            setData(dataUrl);
          };
          reader.readAsDataURL(blob);
        }

        console.log("form mappedData>>", mappedData);
        setFormData({
          ...formData,
          ...mappedData,
        });
        setSelectedSpecialists(doctorProfile[0].speciality || []);
        setSelectedLocation(doctorProfile[0].location || []);
        console.log("form data>>", formData);
        setIsLoading(false);
      } catch (error) {
        console.error(error?.message);
        setIsLoading(false);
      }
    };

    fetchDoctorProfile();
  }, []); // Run only once on component mount
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true); // Start showing loader

    setTimeout(async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/elderlycare/updateDocProfile/" + userId,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          console.log("Profile updated successfully");
          toast("Profile updated successfully");
        } else {
          console.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Network error:", error.message);
      }
      setIsSaving(false); // Hide loader after the operation and the timeout
    }, 1000); // Ensuring the loader is shown for at least 3 seconds
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name);
    console.log("Value:", value);
    if (name === "speciality" || name === "location") {
      console.log("Array value:", Array.isArray(value) ? value : [value]);
      setFormData({
        ...formData,
        [name]: Array.isArray(value) ? value : [value],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitPic = async (e) => {
    console.log("inside handleSubmit");
    e.preventDefault();
    const loading = toast.loading("Loading...")
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("originalname", selectedImage?.name?.split(".")[0]);

    try {
      const response = await fetch(
        "http://localhost:3000/elderlycare/picUpload/" + userId,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        // Handle success, maybe show a success message
        console.log("Profile updated successfully");
        toast.dismiss(loading);
        toast.success("Image Uploaded")
      } else {
        // Handle error response
        console.error("Failed to update profile");
      }
    } catch (error: any) {
      // Handle network error
      toast.dismiss(loading);
        toast.error("Error in uploading image")
      console.error("Network error:", error.message);
    }
  };

  if (isLoading || isSaving) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center">
        <div className="text-center">
          <div className="mb-2 w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          <h2 className="text-lg font-semibold text-gray-800">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName={t("settings.pageTitle")} />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  {t("settings.personalInformation.sectionTitle")}
                </h3>
              </div>
              <div className="p-7">
                <form action="#" onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="name"
                      >
                        {t("settings.personalInformation.labels.fullName")}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          {/* SVG Icon */}
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="fullName"
                          id="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          // placeholder="Full Name"
                          // defaultValue={name}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        {t("settings.personalInformation.labels.phoneNumber")}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNo"
                        id="phoneNo"
                        placeholder="+990 3343 7865"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        // defaultValue=""
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      {t("settings.personalInformation.labels.emailAddress")}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        {/* SVG Icon */}
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        // placeholder="devidjond45@gmail.com"
                        // defaultValue={email}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Experience"
                    >
                      {t("settings.personalInformation.labels.experience")}
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      value={formData.experience}
                      onChange={handleChange}
                      name="experience"
                      id="experience"
                      placeholder={t("settings.personalInformation.placeholders.experience")}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Experience"
                    >
                      {t("settings.personalInformation.labels.bio")}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        {/* SVG Icon */}
                      </span>
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        rows={6}
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Write your bio here"
                        //  defaultValue=""
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="speciality"
                    >
                      {t("settings.personalInformation.labels.speciality")}
                    </label>
                    <FormControl className="w-full">
                      <Select
                        multiple
                        value={selectedSpecialists}
                        onChange={(e) => {
                          setSelectedSpecialists(e.target.value);
                          handleChange({
                            target: {
                              name: "speciality",
                              value: e.target.value,
                            },
                          });
                        }}
                        displayEmpty
                        className="w-full"
                        inputProps={{ "aria-label": "speciality" }}
                      >
                        <MenuItem value="" disabled>
                          {t("settings.personalInformation.labels.speciality")}
                        </MenuItem>
                        <MenuItem value={"Ophthalmologist"}>
                          Ophthalmologist
                        </MenuItem>
                        <MenuItem value={"Orthopedist"}>Orthopedist</MenuItem>
                        <MenuItem value={"Pulmonologist"}>
                          Pulmonologist
                        </MenuItem>
                        <MenuItem value={"Endocrinologist"}>
                          Endocrinologist
                        </MenuItem>
                        <MenuItem value={"Gastroenterologist"}>
                          Gastroenterologist
                        </MenuItem>
                        <MenuItem value={"Urologist"}>Urologist</MenuItem>
                        <MenuItem value={"Psychiatrist"}>Psychiatrist</MenuItem>
                        <MenuItem value={"Physical therapist"}>
                          Physical therapist
                        </MenuItem>
                        <MenuItem value={"Occupational therapist"}>
                          Occupational therapist
                        </MenuItem>
                        <MenuItem value={"Speech therapist"}>
                          Speech therapist
                        </MenuItem>
                        <MenuItem value={"Dietitian"}>Dietitian</MenuItem>
                        <MenuItem value={"Podiatrist"}>Podiatrist</MenuItem>
                        <MenuItem value={"Chiropractor"}>Chiropractor</MenuItem>
                        <MenuItem value={"Home care nurse"}>
                          Home care nurse
                        </MenuItem>
                        {/* Add more specialist options as needed */}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="location"
                    >
                      {t("settings.personalInformation.labels.location")}
                    </label>
                    <FormControl className="w-full">
                      <Select
                        value={selectedLocation}
                        onChange={(e) => {
                          setSelectedLocation(e.target.value);
                          handleChange({
                            target: { name: "location", value: e.target.value },
                          });
                        }}
                        displayEmpty
                        className="w-full"
                        inputProps={{ "aria-label": "Location" }}
                      >
                        <MenuItem value="" disabled>
                          {t("settings.personalInformation.labels.location")}
                        </MenuItem>
                        <MenuItem value={"New York City"}>
                          New York City
                        </MenuItem>
                        <MenuItem value={"Los Angeles"}>Los Angeles</MenuItem>
                        <MenuItem value={"Chicago"}>Chicago</MenuItem>
                        <MenuItem value={"Boston"}>Houston</MenuItem>
                        <MenuItem value={"Miami"}>Miami</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      {t("settings.buttons.cancel")}
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      {t("settings.buttons.save")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-whiten">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  {t("settings.photoSection.sectionTitle")}
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      {/* <img src={userThree} alt="User" /> */}

                      {data && <img src={data} width="300" />}
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        {t("settings.photoSection.labels.editPhoto")}
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary">
                          {t("settings.photoSection.labels.delete")}
                        </button>
                        <button className="text-sm hover:text-primary">
                          {t("settings.photoSection.labels.update")}
                        </button>
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative rounded border border-stroke bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        console.log(event?.target?.files[0]);
                        setSelectedImage(event.target.files[0]);
                      }}
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <FiUpload className="text-primary" />
                      </span>
                      <p>
                        <span className="text-primary">{t("settings.photoSection.labels.clickToUpload")}</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">{t("settings.photoSection.labels.acceptedFormats")}</p>
                      <p>{t("settings.photoSection.labels.maxDimensions")}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      {t("settings.buttons.cancel")}
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      onClick={handleSubmitPic}
                    >
                      {t("settings.buttons.save")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;

