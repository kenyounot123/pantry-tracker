# Pantry Tracker App

A web application for tracking pantry items and generating recipes based on available ingredients. Deployed using Vercel CI/CD [https://pantry-tracker-app-chi.vercel.app/](https://pantry-tracker-app-chi.vercel.app/)

## Tech Stack

- **Frontend**: Next.js, React, MUI
- **Backend**: Firebase, Firestore
- **Authentication**: Firebase Google Auth
- **APIs**: OpenRouter API
- **AI**: Llama 3.1 model for recipe generation
- **Image Classification** (Future Feature): React Camera Pro

## Features

- **Pantry Management**: Track and manage pantry items.
- **Recipe Generation**: Get recipe suggestions based on pantry items using the Llama 3.1 model via the OpenRouter API.
- **Image Classification**: (Future) Take pictures of pantry items using React Camera Pro for image classification and automatic addition to the database.

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

- Node.js and npm
- Firebase account and Firestore setup

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/kenyounot123/pantry-tracker.git
   ```
2. **Navigate to project repo:**
   ```bash
   cd pantry-tracker
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up Firebase:**
  - Create a .env.local file in the root directory.
  - Add your Firebase configuration to the .env.local file:
  ```bash
  NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
  NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
  ```
5. **Start server:**
   ```bash
   npm run dev
   ```
6. **Open [http://localhost:3000](http://localhost:3000) in browser**

## Screenshots 
<img width="1428" alt="image" src="https://github.com/user-attachments/assets/4fe5d7fe-56b7-47ee-8b89-d6edd675a09b">


## Future Improvements

- Implement image classification using React Camera Pro for automatic pantry item addition.
- Enhance user interface and experience based on feedback.
