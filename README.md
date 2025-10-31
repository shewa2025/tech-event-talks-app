# Tech Event Website

A simple single-page website to display the schedule for a one-day tech event. Users can view the schedule and search for talks by category.

## Features

- **Dynamic Schedule:** The event schedule is dynamically generated from a JSON data file.
- **Category Search:** Users can filter talks by category.
- **Simple and Clean UI:** The user interface is designed to be simple and easy to navigate.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript
- **Backend:**
  - Node.js
  - Express.js

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shewa2025/tech-event-talks-app.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd tech-event-website
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```

### Running the Application

1. **Start the server:**
   ```bash
   npm start
   ```
2. **Open your browser** and navigate to `http://localhost:3000`.

## Project Structure

```
tech-event-website/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # CSS styles
│   └── app.js          # Frontend JavaScript
├── server.js           # Express server
├── talks.json          # Talk data
└── package.json        # Project dependencies
```
