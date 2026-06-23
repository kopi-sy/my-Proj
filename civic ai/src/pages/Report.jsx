import {useState} from "react";
import "./Report.css"
const departmentMap = {
  "Road damage": "Road",
  "water leakage": "Water",
  "Garbage": "Sanitation",
  "Street light": "Electrical",
  "Drainage": "Drainage"
};
function Report() {
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [location,setLocation]=useState("");
    const [image,setImage]=useState(null);
    const [complaintId,setComplaintId]=useState("")
    const [category,setCategory]=useState("")

    function startVoiceInput() {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  const recognition =
    new SpeechRecognition();

  recognition.lang = "ta-IN";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.start();

  recognition.onresult = (event) => {

    const voiceText =
      event.results[0][0].transcript;

    setDescription(voiceText);

  };

}
    function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation(
        `${position.coords.latitude}, ${position.coords.longitude}`
      );
    }
  );
}
    function submit() {

  // Validation
  if (!title || !description || !location || !category) {
    alert("Please fill all fields");
    return;
  }

  const selectedDepartment = departmentMap[category];

  // Load existing complaints
  const existingComplaints = [];

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
        existingComplaints.push(complaint);
      }

    } catch (err) {
      continue;
    }
  }

  // Duplicate Detection
  const duplicate = existingComplaints.find((c) => {

    const sameDepartment =
      c.department === selectedDepartment;

    const sameLocation =
      c.location.toLowerCase().trim() ===
      location.toLowerCase().trim();

    const oldWords =
      c.description.toLowerCase().split(" ");

    const newWords =
      description.toLowerCase().split(" ");

    const commonWords =
      oldWords.filter(word =>
        newWords.includes(word)
      );

    return (
      sameDepartment &&
      sameLocation &&
      commonWords.length >= 3
    );
  });

  if (duplicate) {

    alert(
      `⚠ Similar complaint already exists!\nComplaint ID: ${duplicate.complaintId}`
    );

    return;
  }

  // Generate ID
  const generatedId =
    "CIV-" +
    Math.floor(
      1000 + Math.random() * 9000
    );

  // Create Complaint
  const complaint = {
    complaintId: generatedId,
    title,
    description,
    location,
    category,
    department: selectedDepartment,
    status: "Under Review"
  };

  // Save
  localStorage.setItem(
    generatedId,
    JSON.stringify(complaint)
  );

  // UI Update
  setComplaintId(generatedId);

  alert("Complaint Submitted Successfully");
}
  return (
    <div className="report-page">
      <div className="report-card">
      <h1>Report an Issue</h1>

      <input
        type="text"
        placeholder="Issue Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />
      <input
        type="file"
        placeholder="upload the image"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <br /><br />
      <button onClick={startVoiceInput}>
  🎤 Speak Complaint
</button>

      <textarea
        placeholder="Describe the issue"
         value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <br /><br />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={getCurrentLocation}>Use Current Location</button>

      <br /><br />
      <select value ={category}
      onChange={(e)=> setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Road damage">Road damage</option>
        <option value="Garbage">Garbage</option>
        <option value="water leakage">water leakage</option>
        <option value="Street light">Street light</option>
        <option value="Drainage">Drainage</option>
      </select>
      <br></br>

      <button onClick={submit}>Submit Report</button>
      {complaintId && (
        <div className="success-card">
          <h3>Complaint submitted successfully</h3>
          <p>Your Complaint Id:{complaintId}</p>
          <p>Department : {departmentMap[category]}</p>
          <p>Location : {location}</p>
          <p>Status :Under reviewed</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default Report;