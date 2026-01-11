<br />
<div align="center">
  <h1 align="center">🏆 Credibly</h1>

  <p align="center">
    A gamified personal learning platform that helps self-learners track their progress, earn badges, and receive AI-powered course recommendations.
    <br />
    <a href="https://credibly-snowy.vercel.app"><strong>View Live Demo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/aikeen8/credibly/issues">Report Bug</a>
    ·
    <a href="https://github.com/aikeen8/credibly/issues">Request Feature</a>
  </p>
</div>

## About The Project

Credibly is an innovative web application designed to solve the lack of motivation in self-paced learning. Unlike traditional to-do lists, this system uses **gamification mechanics** (such as badges, leaderboards, and leveling) to keep users engaged. It integrates **Artificial Intelligence** to analyze user interests and automatically generate personalized learning roadmaps, making the journey from novice to expert smoother and more rewarding.

## Table Of Contents

1. [About The Project](#about-the-project)
    * [Features](#features)
    * [Technologies Used](#technologies-used)
2. [Application Snapshots](#application-snapshots)
3. [Installation](#installation)
    * [Prerequisites](#prerequisites)
4. [Run](#run)
5. [Contributors](#contributors)
6. [License](#license)

### Features

* **🎯 Smart Goal Tracking:** Organize learning paths into Planned, In Progress, and Completed statuses with a visual Kanban-style workflow.
* **🤖 AI-Powered Recommendations:** Integrated with **Google Gemini AI** to suggest relevant courses, skills, and roadmaps based on user goals.
* **🏆 Gamification System:** dynamic badge system that awards users for consistency ("Consistency King") and milestones ("First Steps").
* **📊 Interactive Dashboard:** Provides real-time visual analytics of completion rates, recent activities, and skill acquisition.
* **📱 Fully Mobile Responsive:** Optimized interface with a custom hamburger menu and adaptive layouts for seamless use on any device.
* **👥 Community Leaderboard:** A ranking system to foster healthy competition among learners.
* **🔒 Secure Authentication:** Custom JWT-based authentication system (username-based) with protected routes.

### Technologies Used

* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
* ![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google%20bard&logoColor=white)

## Application Snapshots

| **Dashboard** | **Mobile View** |
|:---:|:---:|
| ![Dashboard Screenshot](LINK_TO_DASHBOARD_IMAGE_HERE) | ![Mobile Screenshot](LINK_TO_MOBILE_IMAGE_HERE) |

| **Rewards System** | **Community Leaderboard** |
|:---:|:---:|
| ![Rewards Screenshot](LINK_TO_REWARDS_IMAGE_HERE) | ![Leaderboard Screenshot](LINK_TO_LEADERBOARD_IMAGE_HERE) |

*(Note: Replace the links above with your actual screenshot URLs)*

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v14 or higher)
* npm
    ```sh
    npm install npm@latest -g
    ```
* MongoDB URI (Local or Atlas)
* Google Gemini API Key

### Setup

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/aikeen8/credibly.git](https://github.com/aikeen8/credibly.git)
    ```
2.  **Install Dependencies (Root, Client, & Server)**
    ```sh
    npm install
    cd client && npm install
    cd ../server && npm install
    ```
3.  **Configure Environment Variables**
    Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

## Run

Start the development servers (Run both client and server):

```sh
# In the root directory (if concurrent is set up)
npm run dev

# OR manually:
# Terminal 1 (Server)
cd server
npm run dev

# Terminal 2 (Client)
cd client
npm run dev
