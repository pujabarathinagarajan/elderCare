import React, { useEffect, useState } from "react";
import CardDataStats from "../../components/CardDataStats";
import DefaultLayout from "../../layout/DefaultLayout";
import TableOne from "../../components/Tables/TableOne";
import { useSelector } from "react-redux";
const ECommerce: React.FC = () => {
  const [appointmentCounts, setAppointmentCounts] = useState<{
    total: number;
    cancelled: number;
    confirmed: number;
    completed: number;
  } | null>(null);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  // const userInfo = useSelector(state => state.auth.userInfo);

  // Destructure user information if available, or provide default values
  const { name = "", email = "", _id: userId } = userInfo || {};
  useEffect(() => {
    const fetchAppointmentCounts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/elderlycare/getAppointmentCounts?doctorId=` +
            userId
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointment counts");
        }
        const data = await response.json();
        console.log("Fetched appointment counts:", data);
        setAppointmentCounts(data.data); // Set only the data object
      } catch (error) {
        console.error("Error fetching appointment counts:", error);
      }
    };

    fetchAppointmentCounts();
  }, []);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          heading="Completed Appointments"
          title="period of change"
          total={
            appointmentCounts && appointmentCounts.completed !== undefined
              ? appointmentCounts.completed.toString()
              : "-"
          }
          rate="5.39%"
          levelUp
        />
        <CardDataStats
          heading="Cancelled Appointments"
          title="period of change"
          total={
            appointmentCounts && appointmentCounts.cancelled !== undefined
              ? appointmentCounts.cancelled.toString()
              : "-"
          }
          rate="5.39%"
          levelUp
        />
        <CardDataStats
          heading="Confirmed Appointments"
          title="period of change"
          total={
            appointmentCounts && appointmentCounts.confirmed !== undefined
              ? appointmentCounts.confirmed.toString()
              : "-"
          }
          rate="6.48%"
          levelUp
        />
        <CardDataStats
          heading="Total Appointments"
          title="period of change"
          total={
            appointmentCounts && appointmentCounts.total !== undefined
              ? appointmentCounts.total.toString()
              : "-"
          }
          rate="0.95%"
          levelDown
        />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8" style={{ width: "150%" }}>
          <TableOne />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
