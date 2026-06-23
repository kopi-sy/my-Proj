import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
 const [officer] = useState(
  JSON.parse(
    localStorage.getItem("loggedOfficer")
  )
);

  useEffect(() => {

  if (!officer) return;

  const data = [];

  for (let i = 0; i < localStorage.length; i++) {

    const key = localStorage.key(i);

    if (
      key === "loggedOfficer" ||
      key === "resolvedComplaints"
    ) {
      continue;
    }

    try {

      const complaint = JSON.parse(
        localStorage.getItem(key)
      );

      if (
        complaint &&
        complaint.complaintId
      ) {

        if (officer.role === "admin") {

          data.push(complaint);

        } else if (
          complaint.department === officer.department
        ) {

          data.push(complaint);
        }
      }

    } catch (err) {
      continue;
    }
  }

  //console.log("Loaded Complaints:", data);

  setComplaints(data);

}, [officer]);

  function logout() {

  localStorage.removeItem("loggedOfficer");

  navigate("/officerlogin", {
    replace: true
  });
}

  function updateStatus(id, newStatus) {

  const complaint = JSON.parse(
    localStorage.getItem(id)
  );

  if (newStatus === "Resolved") {

  complaint.status = "Resolved";

  const resolvedComplaints =
    JSON.parse(
      localStorage.getItem("resolvedComplaints")
    ) || [];

  resolvedComplaints.push(complaint);

  localStorage.setItem(
    "resolvedComplaints",
    JSON.stringify(resolvedComplaints)
  );

  localStorage.removeItem(id);

  setComplaints(prev =>
    prev.filter(
      c => c.complaintId !== id
    )
  );

  alert("Complaint Resolved");

  return;
}

  complaint.status = newStatus;

  localStorage.setItem(
    id,
    JSON.stringify(complaint)
  );

  setComplaints(prev =>
  prev.map(c =>
    c.complaintId === id
      ? { ...c, status: newStatus }
      : c
  )
);
}

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const progress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const filteredComplaints = complaints.filter(
  (complaint) => {

    const matchesId =
      complaint.complaintId
        .toLowerCase()
        .includes(searchId.toLowerCase());

    const matchesStatus =
      filterStatus === "" ||
      complaint.status === filterStatus;

    return (
      matchesId &&
      matchesStatus
    );
  }
);
  if (!officer) {
   navigate(
    "/officerlogin",
    { replace: true }
  );

  return null;
}

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">

  <h1>Officer Dashboard</h1>

  <button
    className="logout-btn"
    onClick={logout}
  >
    Logout
  </button>

    <button
  className="resolved-page-btn"
  onClick={() =>
    navigate("/resolved")
  }
>
  View Resolved
</button>

</div>
      {officer?.role === "admin" && (
  <h3 style={{textAlign:"center",color:"#2563eb"}}>
    Admin Access - Viewing All Departments
  </h3>
)}

      <div className="stats-container">

        <div className="stat-card">
          <h2>{complaints.length}</h2>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h2>{progress}</h2>
          <p>In Progress</p>
        </div>

        <div className="stat-card">
          <h2>{resolved}</h2>
          <p>Resolved</p>
        </div>

      </div>

      <div className="filter-section">

  <input
    type="text"
    placeholder="Search Complaint ID"
    value={searchId}
    onChange={(e) =>
      setSearchId(e.target.value)
    }
  />

  <select
    value={filterStatus}
    onChange={(e) =>
      setFilterStatus(e.target.value)
    }
  >
    <option value="">
      All Status
    </option>

    <option value="Under Review">
      Under Review
    </option>

    <option value="In Progress">
      In Progress
    </option>

    <option value="Resolved">
      Resolved
    </option>

  </select>

</div>

      {filteredComplaints.length === 0 ? (
  <h3>
    {
      filterStatus === "Resolved"
        ? "No resolved complaints found."
        : filterStatus === "In Progress"
        ? "No complaints are currently in progress."
        : filterStatus === "Under Review"
        ? "No complaints are under review."
        : "No complaints found for your department."
    }
  </h3>
) : (

  <div className="complaints-grid">

    {filteredComplaints.map((complaint) => (

  <div
    className="complaint-card"
    key={complaint.complaintId}
  >

        <h3>{complaint.complaintId}</h3>

        <p>
          <strong>Category:</strong> {complaint.category}
        </p>

        <p>
          <strong>Department:</strong> {complaint.department}
        </p>

        <p>
          <strong>Status:</strong>

          <span
            className={
              complaint.status === "Resolved"
                ? "resolved"
                : complaint.status === "In Progress"
                ? "progress"
                : "review"
            }
          >
            {" "}
            {complaint.status}
          </span>
        </p>

        <p>
          <strong>Location:</strong> {complaint.location}
        </p>

       

        <select
          value={complaint.status}
          onChange={(e) =>
            updateStatus(
              complaint.complaintId,
              e.target.value
            )
          }
        >
          <option>Under Review</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        <br /><br />

<button
  className="details-btn"
  onClick={() =>
    navigate(
      `/complaint/${complaint.complaintId}`
    )
  }
>
  View Details
</button>

      </div>

    ))}

  </div>

)}

    </div>
  );
}

export default Dashboard;