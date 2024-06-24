const express = require("express");
const userapp = express.Router();
const expressAsyncHandler = require("express-async-handler");

// Define your routes here
userapp.get('/', (req, res) => {
    res.send('Retrieve API root');
});

userapp.post('items/:faculty_id', expressAsyncHandler((req, res) => { 
    let obj = req.body
    const [result] = dbPool.execute(
        `INSERT INTO publications (
          publicationId, publicationTitle, publicationType, conferenceOrJournal,
          conferenceName, journalName, VolumeNumber, PageNumber, issueNumber,
          levelOfCirculation, dateOfPublication, indexedIn, indexProof,
          ISSNnumber, impactFactor, Scoups, webOfScience, SCI, UCGRated,
          ugcProof, h_index, citationCnt, affiliatingInstitute, publisherName,
          paperLink, journalLink, proof, orcidId, vidwanId, technology, domain,
          branch, industry, foreignAuthor, publicationStatus, studentPresence,
          bestPaperAwarded, Q1Q2Q3Q4, facultyName, facultyId, designation, dept,
          authorId1, authorId2, authorId3, authorId4, authorId5, authorId6, authorId7
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          obj.publicationId, obj.publicationTitle, obj.publicationType, obj.conferenceOrJournal,
          obj.conferenceName, obj.journalName, obj.VolumeNumber, obj.PageNumber, obj.issueNumber,
          obj.levelOfCirculation, obj.dateOfPublication, obj.indexedIn, obj.indexProof,
          obj.ISSNnumber, obj.impactFactor, obj.Scoups, obj.webOfScience, obj.SCI, obj.UCGRated,
          obj.ugcProof, obj.hIndex, obj.citationCnt, obj.affiliatingInstitute, obj.publisherName,
          obj.paperLink, obj.journalLink, obj.proof, obj.orcidId, obj.vidwanId, obj.technology, obj.domain,
          obj.branch, obj.industry, obj.foreignAuthor, obj.publicationStatus, obj.studentPresence,
          obj.bestPaperAwarded, obj.Q1Q2Q3Q4, obj.facultyName, obj.facultyId, obj.designation, obj.dept,
          ...obj.authorIds.slice(0, 7) // Assuming you have exactly 7 author IDs
        ]
      );
}))

module.exports = userapp;