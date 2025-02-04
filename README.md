# Deparavia Medical Center App

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




