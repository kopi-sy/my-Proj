import { useParams, useNavigate } from "react-router-dom";
import "./ComplaintDetails.css";

function ComplaintDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const complaint = JSON.parse(
    localStorage.getItem(id)
  );

  if (!complaint) {
    return (
      <div className="details-page">
        <div className="details-card">

          <h2>Complaint Not Found</h2>

          <button
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Back To Dashboard
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="details-page">

      <div className="details-card">

        <h1>Complaint Details</h1>

        <hr />

        <div className="details-content">

          <p>
            <strong>Complaint ID:</strong>
            {" "}
            {complaint.complaintId}
          </p>

          <p>
            <strong>Title:</strong>
            {" "}
            {complaint.title}
          </p>

          <p>
            <strong>Category:</strong>
            {" "}
            {complaint.category}
          </p>

          <p>
            <strong>Department:</strong>
            {" "}
            {complaint.department}
          </p>

          <p>
            <strong>Status:</strong>
            {" "}
            {complaint.status}
          </p>

          <p>
            <strong>Location:</strong>
            {" "}
            {complaint.location}
          </p>

          <div className="description-section">

            <h3>Description</h3>

            <div className="description-box">
              {complaint.description}
            </div>

          </div>

          <button
            className="back-btn"
            onClick={() =>
              navigate("/dashboard", {
              replace: true
            })
            }
          >
            ← Back To Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default ComplaintDetails;