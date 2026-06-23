import { useEffect, useState } from "react";
import "./Dashboard.css";

function ResolvedComplaints() {

  const [resolvedComplaints, setResolvedComplaints] =
    useState([]);

  useEffect(() => {

    const data =
      JSON.parse(
        localStorage.getItem("resolvedComplaints")
      ) || [];

    setResolvedComplaints(data);

  }, []);

  return (

    <div className="dashboard-container">

      <h1>Resolved Complaints</h1>

      {resolvedComplaints.length === 0 ? (

        <h3>No resolved complaints found.</h3>

      ) : (

        <div className="complaints-grid">

          {resolvedComplaints.map(
            (complaint) => (

            <div
              className="complaint-card"
              key={complaint.complaintId}
            >

              <h3>
                {complaint.complaintId}
              </h3>

              <p>
                <strong>Category:</strong>{" "}
                {complaint.category}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {complaint.department}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {complaint.location}
              </p>

              <p>
                <strong>Status:</strong>

                <span className="resolved">
                  {" "}Resolved
                </span>

              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default ResolvedComplaints;