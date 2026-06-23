import { useState } from "react";
import "./Track.css";

function Track() {

  const [complaintId, setComplaintId] = useState("");
  const [searched, setSearched] = useState(false);
  const [complaint, setComplaint] = useState(null);

  function handleSearch() {

    const foundComplaint = JSON.parse(
      localStorage.getItem(complaintId)
    );

    setComplaint(foundComplaint);
    setSearched(true);
  }

  return (

    <div className="track-container">

      <div className="track-card">

        <h1>Track Complaint</h1>

        <input
          type="text"
          placeholder="Enter Complaint ID"
          value={complaintId}
          onChange={(e) =>
            setComplaintId(e.target.value)
          }
        />

        <button onClick={handleSearch}>
          Search
        </button>

        {searched && complaint && (

          <div className="result-card">

            <h2>Complaint Found ✅</h2>

            <p>
              <strong>Complaint ID:</strong>
              {" "}
              {complaint.complaintId}
            </p>

            <p>
              <strong>Status:</strong>
              {" "}
              {complaint.status}
            </p>

            <p>
              <strong>Department:</strong>
              {" "}
              {complaint.department}
            </p>

            <p>
              <strong>Category:</strong>
              {" "}
              {complaint.category}
            </p>

            <p>
              <strong>Location:</strong>
              {" "}
              {complaint.location}
            </p>

          </div>

        )}

        {searched && !complaint && (

          <div className="not-found">

            Complaint Not Found ❌

          </div>

        )}

      </div>

    </div>

  );
}

export default Track;