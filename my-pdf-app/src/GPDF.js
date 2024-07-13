import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./abc.css"; // Assuming you create a separate CSS file for styling

const FetchFacultyData = () => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const fetchFacultyData = () => {
    setLoading(true);
    fetch(`https://sheetdb.io/api/v1/ohpviljncwcoi?facultyId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.length > 0) {
          generatePDF(data);
        } else {
          console.log("Faculty ID not found or no publications available.");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();

    // Set document title
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("VNR VJIET Hyderabad", 20, 20);

    // Add subtitle
    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text(`Research Papers by Faculty ID: ${id}`, 20, 30);

    // Draw a line
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Define the columns for the table
    const columns = [
      { header: "Publication ID", dataKey: "publicationId" },
      { header: "Publication Title", dataKey: "publicationTitle" },
      { header: "Conference Name", dataKey: "conferenceName" },
      { header: "Date of publication", dataKey: "dateOfPublication" },
    ];

    // Map the data to match the table columns
    const rows = data.map((item) => ({
      publicationId: item.publicationId,
      publicationTitle: item.publicationTitle,
      conferenceName: item.conferenceName,
      dateOfPublication: item.dateOfPublication,
    }));

    // Add the table to the PDF
    doc.autoTable({
      startY: 40, // Ensures the table starts below the heading and line
      head: [columns.map((col) => col.header)],
      body: rows.map((row) => columns.map((col) => row[col.dataKey])),
    });

    // Save the PDF
    doc.save("faculty_data.pdf");
  };

  return (
    <div className="container">
      <h1>Fetch Faculty Data</h1>
      <div className="input-container">
        <label>
          Enter Faculty Id:
          <input type="text" value={id} onChange={handleInputChange} />
        </label>
        <button
          onClick={fetchFacultyData}
          disabled={loading}
          className="fetch-button"
        >
          {loading ? "Fetching..." : "Fetch"}
        </button>
      </div>
    </div>
  );
};

export default FetchFacultyData;
