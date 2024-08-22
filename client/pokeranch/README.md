![giphy](https://github.com/user-attachments/assets/216bcdef-cf06-4014-9102-c821ca481153)
# Poke Tamagotchi - A MERN Stack + Vite Virtual Pet Game

Welcome to **Poke Tamagotchi**! This project is a fun, interactive virtual pet game inspired by the classic Tamagotchi, where you can manage, train, and battle your favorite Pokémon. Built with the MERN (MongoDB, Express, React, Node.js) stack, this project demonstrates full-stack development with an engaging UI and a RESTful API backend.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Interactive Gameplay**: Manage your Pokémon, train them, and participate in battles.
- **MERN Stack**: Fully implemented with MongoDB, Express, React, and Node.js.
- **RESTful API**: Seamlessly manage data with a custom API built with Express and Mongoose.
- **Routing**: Navigate through different game modes and trainer profiles with React Router.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or higher) and npm
- **MongoDB**: Ensure you have a running MongoDB instance.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/poke-tamagotchi.git
    cd poke-tamagotchi
    ```

2. **Install server dependencies**:
    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies**:
    ```bash
    cd ../client
    npm install
    ```

4. **Set up MongoDB**:
   Ensure MongoDB is running locally or provide a remote connection string in your environment variables.

### Running the Application

1. **Start the server**:
    ```bash
    cd server
    npm run dev
    ```
    The server will run on [http://localhost:3000](http://localhost:3000).

2. **Start the client**:
    ```bash
    cd client
    npm run dev
    ```
    The React application will be served at [http://localhost:5173](http://localhost:5173).

3. **Access the Application**:
   Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to start playing Poke Tamagotchi!

## Project Structure

### Server (Backend)
```
server/
├── model/                # Mongoose models
│   ├── Pokemon.js
│   └── profile.model.js
├── routes/               # Express route handlers
├── server.js             # Entry point for the backend server
└── package.json          # Server dependencies and scripts
```

### Client (Frontend)
```
client/
├── src/
│   ├── components/       # Reusable React components (Ranch, Fight, Trainer)
│   ├── pages/            # Pages for routing (PokemonProfile, TrainerProfile)
│   ├── App.js            # Main application component
│   ├── index.js          # Application entry point
│   └── index.css         # Global styles
└── package.json          # Client dependencies and scripts
```

## Usage

- **Ranch**: Manage and view all Pokémon you have collected.
- **Fight**: Select Pokémon and engage in battles.
- **Trainer Profile**: View and manage trainer details and their Pokémon.

## API Endpoints

- **GET `/api/pokemon/:id`**: Retrieve a specific Pokémon by its ID.
- **GET `/api/trainers/`**: Get a list of all trainers.
- **GET `/api/trainers/:trainerId`**: Get detailed information about a specific trainer, including their Pokémon.
- **POST `/api/fight/add`**: Add a new Pokémon to the database.
- **PATCH `/api/fight/exp`**: Update a Pokémon's experience points after a battle.
- **DELETE `/api/pokemon/:id`**: Delete a specific Pokémon from the database.


