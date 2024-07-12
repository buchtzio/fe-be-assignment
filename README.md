# fe-be-assignment
This project includes both frontend and backend implementations.

## Prerequisites

- Node.js v18.18+
- npm (comes with Node.js)
- environment files :
for backend :
we use config environment - 
default.json should hold : 
{
  "PORT": 5000,
  "JWT_SECRET": "BTB_Assignment",
  "RICK_AND_MORTY_API_URL":"https://rickandmortyapi.com/api"
}

test.json should hold :
{
    "PORT": 5001,
    "JWT_SECRET": "BTB_Assignment_Test",
    "RICK_AND_MORTY_API_URL": "https://rickandmortyapi.com/api"
}
  
for frontend we use vite so make .env file and use this :
VITE_API_BASE_URL=http://localhost:5000/api

## How to Run the Application

### Backend

1. Navigate to the backend directory:
    cd be-assignment

2. Start the backend development server:
    npm run dev

3. to run the tests :
 npm run test
   
### Frontend

1. Navigate to the frontend directory:

    cd fe-assignment

2. Start the frontend development server:

    npm run dev

3. to run the tests :
4. 
 npm run test

the fronend url should be localhost:3000 
the backend url : localhost:5000

please make sure to run both of them 

