import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axios from "axios";

const GeneratePDF = () => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const generatePDF = () => {
    setLoading(true);
    // Fetch faculty data based on id
    console.log(id)
    fetch(`https://sheetdb.io/api/v1/ohpviljncwcoi?publicationId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        
        if (data.length > 0) {
          console.log("go")
          const faculty = data[0];
          console.log(faculty) // Assuming only one record per faculty ID

          // if (!faculty.publications || faculty.publications.length === 0) {
          //   alert("No publications found for this faculty member.");
          //   return;
          // }

          const doc = new jsPDF();
          console.log("hi")

          // Base64 Images (replace with your actual images)
          const vnrvjietLogo = "data:image/jpeg;base64,..."; // VNRVJIET logo placeholder
          const researchImage = "data:image/jpeg;base64,..."; // Research image placeholder

          // Add college logo
          doc.addImage(vnrvjietLogo, "JPEG", 14, 8, 30, 30);

          // Add main title with custom font size and color
          doc.setFontSize(22);
          doc.setTextColor(40);
          doc.text("VNRVJIET Hyderabad", 50, 20);

          // Add subtitle
          doc.setFontSize(16);
          doc.setTextColor(100);
          doc.text(`Research Papers by ${faculty.facultyName}`, 50, 30);
          console.log("Bye")
          // Add research image
          doc.addImage(researchImage, "JPEG", 160, 8, 40, 40);

          // Add a line break
          doc.setLineWidth(0.5);
          doc.line(14, 40, 196, 40);

          // Add a small description
          doc.setFontSize(12);
          doc.setTextColor(50);
          doc.text(
            `List of research papers published by ${faculty.facultyName}.`,
            14,
            48
          );

          // Prepare data for the table
          // const tableData = faculty.publications.map((publication) => [
          //   publication.publicationId,
          //   publication.publicationTitle,
          //   publication.publicationType,
          //   publication.dateOfPublication,
          // ]);

          // Add table with styles
          // doc.autoTable({
          //   head: [["ID", "Title", "Type", "Year"]],
          //   body: tableData,
            // startY: 60,
            // styles: {
            //   fontSize: 10,
            //   halign: "center",
            //   valign: "middle",
            //   cellPadding: 3,
            //   overflow: "linebreak",
            //   lineColor: [44, 62, 80],
            //   lineWidth: 0.5,
            //   font: "helvetica",
            //   textColor: [44, 62, 80],
            // },
            // headStyles: {
            //   fillColor: [23, 162, 184],
            //   textColor: [255, 255, 255],
            //   fontSize: 11,
            //   fontStyle: "bold",
            // },
          //   bodyStyles: {
          //     fillColor: [245, 245, 245],
          //   },
          //   alternateRowStyles: {
          //     fillColor: [255, 255, 255],
          //   },
          //   margin: { top: 10 },
          // });
          console.log("Reached")
          // Footer with page number
          const pageCount = doc.internal.getNumberOfPages();
          for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(
              `Page ${i} of ${pageCount}`,
              doc.internal.pageSize.width - 20,
              doc.internal.pageSize.height - 10
            );
          }

          // Save the PDF
          doc.save(`${faculty.facultyName}_Published_Papers.pdf`);
        } else {
          alert("Faculty ID not found or no publications available.");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again later.");
      });
  };

  return (
    <div>
      <h1>Generate Faculty Report</h1>
      <div>
        <label>
          Enter Faculty Id:
          <input type="text" value={id} onChange={handleInputChange} />
        </label>
        <button onClick={generatePDF} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default GeneratePDF;
