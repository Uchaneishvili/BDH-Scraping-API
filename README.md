# BDH-Scraping-API Project README

## Project Overview


This Node.js backend project, developed in TypeScript, serves the purpose of crawling data from [BDH Online Therapeutensuche](https://www.bdh-online.de/patienten/therapeutensuche/), store the collected data in MongoDB, and providing endpoints for data retrieval and export to a CSV file. The project also includes Swagger documentation for API exploration.
## Features

1. **GET Method with Pagination and Search:**
   - Endpoint: `/therapists`
   - This endpoint supports pagination to efficiently retrieve a subset of data.
   - Search functionality is integrated to filter data based on specific criteria.

2. **Generate CSV Method:**
   - Endpoint: `/therapists/csv`
   - This endpoint triggers the generation of a CSV file based on the current data in the system.

3. **Web Scraping Method:**
   - This endpoint initiates a web scraping process to fetch data from external sources. Ensure compliance with relevant terms of use and legal considerations.

4. **POST Method:**
   - Endpoint: `/therapists`
   - Allows the addition of new data to the system.

5. **Swagger Documentation:**
   - Access Swagger documentation by navigating to `/api-docs` when the server is running.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Uchaneishvili/BDH-Scraping-API
   ```

2. Install dependencies:

   ```bash
   cd BDH-Scraping-API
   npm install
   ```

3. Configure MongoDB:

   - Ensure that MongoDB is installed and running.
 
4. Build and run the project:

   ```bash
   npm run build
   npm start
   ```

   The server will be running on `http://localhost:3001` by default.

5. Access Swagger Documentation:

   - Open your browser and go to `http://localhost:3001/api-docs` to access the Swagger documentation.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
