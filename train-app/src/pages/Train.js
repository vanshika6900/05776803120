import React, { useEffect, useState } from "react";

const TrainSchedule = () => {
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainSchedules = async () => {
      try {
        const response = await fetch("http://104.211.219.98:80/train/trains", {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYzMjUwNjgsImNvbXBhbnlOYW1lIjoiVmFuc2hpa2EgVHJhaW4gQ29tcGFueSIsImNsaWVudElEIjoiNTkzZDQxM2EtZGMyYy00ZTY1LTliYjAtZTVjZjZiYTJhYTgwIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjA1NyJ9.ArKGtPNV-NXlqq68r_Hvhx-AY8ZunZ0UhtNhD4TXeU8",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTrains(Object.values(data) || []);
        } else {
          throw new Error("Failed to fetch train schedules");
        }
      } catch (error) {
        console.error("Error fetching train schedules:", error);
        setError("Failed to fetch train schedules. Please try again later.");
      }
    };

    fetchTrainSchedules();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div>
        <h1>Train Schedules</h1>
        {trains.length === 0 ? (
          <p>No trains available</p>
        ) : (
          <table>
            <thead>
              <tr style={{ color: "black" }}>
                <th>Train Number</th>
                <th>Departure Time</th>
                <th>Seat Availability (Sleeper)</th>
                <th>Seat Availability (AC)</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {trains.map((train) => (
                <tr key={train.trainNumber}>
                  <td>{train.trainNumber}</td>
                  <td>
                    {train.departureTime &&
                      `${train.departureTime.Hours}:${train.departureTime.Minutes}:${train.departureTime.Seconds}`}
                  </td>
                  <td>
                    {train.seatsAvailable &&
                    train.seatsAvailable.sleeper !== undefined
                      ? train.seatsAvailable.sleeper
                      : "N/A"}
                  </td>
                  <td>
                    {train.seatsAvailable &&
                    train.seatsAvailable.AC !== undefined
                      ? train.seatsAvailable.AC
                      : "N/A"}
                  </td>
                  <td>{train.price && train.price.sleeper}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default TrainSchedule;
