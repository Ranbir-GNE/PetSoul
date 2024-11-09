Pet Health Tracker

A comprehensive pet health management application built with the MERN (MongoDB, Express, React, Node.js) stack. This application allows pet owners and veterinarians to record, track, and manage a pet’s health data, including medical history, checkup information, and reports.
Table of Contents

Features

    Pet Health Records: Store and manage details of each pet’s medical history.
    Checkup Reports: Add, view, and manage detailed reports, including vital signs, physical examinations, and lab tests.
    Owner and Pet Information: Track both owner details and specific pet information.
    API Documentation: Access RESTful API endpoints for various operations.

Tech Stack

    Frontend: React.js
    Backend: Node.js, Express.js
    Database: MongoDB, using Mongoose as ODM

API Endpoints

    User Routes (file: server/Routes/UserRoutes.js)
        POST /register: register
        POST /login: login
        GET /:id: getUserById
        PUT /:id: updateUser
        DELETE /:id: deleteUser

    Pet Routes (file: server/Routes/PetsRoutes.js)
        POST /create: createPet
        PUT /:id: updatePet
        DELETE /:id: deletePet
        GET /owner: getPetsByOwnerId
        GET /:id: getPetDetails
        GET /reports/:id: getReports
        GET /records/:id: getRecords
        GET /contact/:id: contact

    Report Routes (file: server/Routes/ReportRoutes.js)
        POST /: addReport
        PUT /:id: updateReports
        DELETE /:id: deleteReport
        GET /:id: viewPetReport

    Health Records Routes (file: server/Routes/HealthRecordsRoutes.js)
        POST /: addRecord
        PUT /:id: updateRecord
        DELETE /id: deleteRecord
        GET /:id: getMedicalHistory
        GET /checkup/:id: getCheckupInformation
        GET /vaccination/:id: getVaccinationRecord

    Vaccination Routes (file: server/Routes/VaccinationRoutes.js)
        POST /: addVaccination
        PUT /:id: updateVaccination
        GET /:id: viewVaccinations
        GET /status/:id: vaccinationStatus
        DELETE /:id: deleteVaccination
        PUT /vaccination/:id: updateNextVaccinationDate
        GET /vaccination/:id: getNextVaccinationDate

