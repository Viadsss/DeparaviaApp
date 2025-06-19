# Deparavia Medical Center App

An application for managing patient admissions and records in healthcare facilities. It offers secure logins for patients, doctors, and admins, and includes features for handling patient data, admissions, and visits. Created collaboratively for the "Information and Management" course.

**Demo Video:** https://www.youtube.com/watch?v=trl7HTWvlbc

![Deparavia-1](https://github.com/user-attachments/assets/cb96ff99-b16b-4b80-8f4d-3ccce6bf3b8c)
![Deparavia-2](https://github.com/user-attachments/assets/6afc1340-45c8-4196-8759-0d8ec6ee770b)
![Deparavia-3](https://github.com/user-attachments/assets/ac91d86a-b8c7-4655-8199-51d95f03fb50)


## Group Members
- Dela Cruz, Jhana Mae
- Pangilinan, Hazel Ann
- Regala, Kaye
- Viado, John Paul

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).
- MySQL installed on your computer. You can download it from [mysql.com](https://www.mysql.com/).

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Cloning the Repository

First, clone the repository to your local machine:

```
git clone https://github.com/Viadsss/DeparaviaApp.git
```

### Setting Up the Backend
1. Navigate to the `backend` directory:
    ```sh
    cd DeparaviaApp/backend
    ```

2. Copy the `.env-example` file to `.env`:

    - On Unix-based systems (Linux/macOS):
        ```sh
        cp .env-example .env
        ```

    - On Windows:
        ```sh
        copy .env-example .env
        ```

3. Install the required node modules:
    ```sh
    npm install
    ```
    
4. Open the .env file in a text editor to update the configuration with your MySQL database credentials:
```sh
code .env
```

### Setting Up the Frontend
1. Navigate to the `frontend` directory
```sh
  cd ../frontend
```
2. Copy the `.env-example` file to `.env`:

    - On Unix-based systems (Linux/macOS):
        ```sh
        cp .env-example .env
        ```

    - On Windows:
        ```sh
        copy .env-example .env
        ```

3. Install the required node modules:
    ```sh
    npm install
    ```
    
4. Open the .env file in a text editor to update the configuration with your own Admin Username and Password credentials:
```sh
code .env
```

### Running the Application
#### Starting the Frontend Development Server
1. In the frontend directory, run:
```sh
npm run dev
```

#### Starting the Backend Server
2. Open a new terminal window, navigate to the backend directory, and run:
```sh
cd DeparaviaApp/backend
npm run server
```

### Accessing the Application
Open your browser and go to `localhost:5137`




