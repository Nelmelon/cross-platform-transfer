# Cross-Platform Transfer App

A web application that allows users to seamlessly transfer text, links, and images between different devices. Simply log in on any device and access your content anywhere.

## Features

- User authentication (login/register)
- Upload and store:
  - Text snippets
  - Links/URLs
  - Images
- Access content from any device
- Secure storage and transfer
- Modern, responsive UI

## Tech Stack

- Frontend:
  - React
  - React Router
  - Axios
  - Vite
- Backend:
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication
  - Multer (file uploads)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd cross-platform-transfer
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Create a `.env` file in the backend directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Start the backend server:
```bash
cd backend
npm run dev
```

6. Start the frontend development server:
```bash
# In the root directory
npm run dev
```

## Usage

1. Register a new account or login with existing credentials
2. Navigate to the Upload page to add new content:
   - Type or paste text
   - Share links
   - Upload images
3. View your content on the Dashboard
4. Access your content from any device by logging in

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
