import { useState, useEffect } from "react";
import { BRAND } from "../../types/brand";
import { format, parseISO } from 'date-fns';
import BrandOne from "../../images/brand/brand-01.svg";
import BrandTwo from "../../images/brand/brand-02.svg";
import BrandThree from "../../images/brand/brand-03.svg";
import BrandFour from "../../images/brand/brand-04.svg";
import BrandFive from "../../images/brand/brand-05.svg";
import { useSelector } from "react-redux";
const TableOne = () => {
  const [brandData, setBrandData] = useState<BRAND[]>([]);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  // const userInfo = useSelector(state => state.auth.userInfo);

  // Destructure user information if available, or provide default values
  const { name = "", email = "", _id: userId } = userInfo || {};

  useEffect(() => {
    fetch("http://localhost:3000/elderlycare/getBookingInfo?doctorId=" + userId)
      .then((response) => response.json())
      .then((data) => setBrandData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Confirmed":
        return "text-green-500";
      case "Cancelled":
        return "text-red-500";
      case "Pending":
        return "text-blue-500";
      case "Completed":
        return "text-purple-500";
      default:
        return "text-black"; // Default color
    }
  };

  const handleUpdateChange = async (appointmentId:string, field:string, value:string) => {
    const url = "http://localhost:3000/elderlycare/getBookingInfo?appointmentId="+appointmentId+"&status="+value;
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update the appointment.');
      }
      window.location.reload();
      const result = await response.json();
      console.log('Update successful:', result);
    } catch (error) {
      console.error('Error updating the appointment:', error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Recent Appointments
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Booking ID
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Booking Date
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Patient Name
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Update here
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
              }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {brand.appointmentId}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{format(parseISO(brand.datetime), 'MMMM dd, yyyy HH:mm')}</p>
            </div>

            {/* <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.status}</p>
            </div> */}

            <div
              className={`flex items-center justify-center p-2.5 xl:p-5 ${getStatusColor(
                brand.status
              )}`}
            >
              <p>{brand.status}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.fullName}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <select value={brand.status || ''} onChange={(e) => handleUpdateChange(brand.appointmentId.toString(), 'status', e.target.value)} className="filter-dropdown" style={
                {marginLeft: 40}
              }>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                {/* Other options */}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
