<br />
<div align="center">
  <a href="https://github.com/aikeen8/credibly">
    <img src="src/assets/logo.png" alt="Logo" width="200">
  </a>

  <h1 align="center">Credibly</h1>

  <p align="center">
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

Credibly was born out of a specific personal struggle: the tendency to "hoard" online courses and badges but failing to track or finish them.

Many self-learners love learning new skills but often face three problems:
1.  Completing courses across various platforms (like Udemy, Coursera, or YouTube) often leads to a disorganization. Without a centralized view, learners often lose track of their accumulated skills.
2.  With so many topics to learn, it is difficult to decide what to prioritize. Learners often start multiple courses at once but struggle to finish them, resulting in many "In Progress" but few "Completed" ones.
3.  Self-paced learning can be isolating. Unlike structured academic environments, there is often no immediate feedback loop or reward system, making it easy to lose momentum when the excitement of a new achievement fades.

**Credibly solves this by acting as:**
* A single place to log and visualize all your hard-earned credentials, regardless of where it was earned so you never lose track of your growth.
* By requiring you to log goals manually, it forces you to commit to a specific path.
* It uses badges and leaderboards to provide visual progress and keep users engaged.

## Table Of Contents

1. [About The Project](#about-the-project)
    * [Features](#features)
    * [Technologies Used](#technologies-used)
2. [Application Snapshots](#application-snapshots)
3. [Installation](#installation)
    * [Prerequisites](#prerequisites)
4. [Run](#run)

### Features

* Smart Goal Tracking
* AI-Powered Recommendations
* Gamification System
* Interactive Dashboard
* Community Leaderboard 
* Secure Authentication 

### Technologies Used

**Frontend**
* React
* TypeScript
* Tailwind CSS

**Backend**
* Node.js
* Express.js
* MongoDB

**AI & Services**
* Google Gemini API

## Application Snapshots

| **Dashboard** | **Pathways** |
|:---:|:---:|
|<img src="src/assets/dashboard.png" alt="Logo" width="200"> | <img src="src/assets/pathways.png" alt="Logo" width="200"> |

| **Rewards System** | **Community Leaderboard** |
|:---:|:---:|
| <img src="src/assets/rewards.png" alt="Logo" width="200"> | <img src="src/assets/community.png" alt="Logo" width="200"> |

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

