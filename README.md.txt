# News Feed Reader

This repository contains the code for the News Feed Reader web application. This application allows users to read news articles from various categories, bookmark their favorite articles, and view them later. The project is built with a **React.js** frontend, a **Node.js/Express** backend, and integrates with **NewsAPI**.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Usage Instructions](#usage-instructions)

## Features
- Fetch and display articles by topic (e.g., Technology, Sports, Politics).
- Bookmark articles for later reading.
- Delete articles from bookmarks.
- Responsive user interface built with React and Bootstrap.

## Prerequisites
Before you begin, make sure you have the following software installed on your system:
- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/)

Additionally, you need a valid **NewsAPI** key to fetch news articles. You can get one by registering at [NewsAPI](https://newsapi.org/).

## Installation

To set up the project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/yulalalaa/news-feed-reader
cd ../news-feed-reader

### 2. Set Up Backend
Navigate to the backend folder and install dependencies:

```bash

cd ../backend
npm install


### 3. Set Up Frontend
Navigate to the frontend folder and install dependencies:

```bash

cd ../frontend
npm install

## Running the Application

1. Running the Backend
Navigate to the backend directory and run:

```bash

node server.js
This command starts the backend server on the specified port (e.g., http://localhost:5000).

2. Running the Frontend
Navigate to the frontend directory and run:

```bash

npm start
This command starts the React development server on the default port (http://localhost:3000).

3. Viewing the Application
Open a web browser and go to:

http://localhost:3000
You should see the News Feed Reader application running.

## Usage Instructions
- Select Topic: Use the dropdown to select a news category (Technology, Sports, Health, Business, Politics).
- Bookmark Articles: Click on the Bookmark button to save an article.
- View Bookmarks: Click on View Bookmarks to see all bookmarked articles.
- Delete Bookmark: Click on the Delete Bookmark button to remove an article from bookmarks.