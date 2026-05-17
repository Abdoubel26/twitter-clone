# Twitter Clone

A full-stack MERN (MongoDB, Express, React, Node.js) application that replicates core Twitter features with modern authentication, real-time notifications, messaging capabilities, and AI-powered features.

## Features

- 🔐 **Authentication** - Secure user authentication and session management
- 📬 **Post Feeds** - Create, view, and interact with posts from other users
- 🔔 **Real-time Notifications** - Instant notifications for likes, replies, and follows
- 💬 **Direct Messaging** - Chat functionality for private conversations between users
- 🤖 **Grok-like AI** - AI-powered features for intelligent interactions and suggestions
- 👥 **User Profiles** - Comprehensive user profiles with customization options
- ❤️ **Interactions** - Like, retweet, and reply to posts

## Tech Stack

- **Frontend**: React with TypeScript (75%)
- **Backend**: Node.js & Express with TypeScript
- **Database**: MongoDB
- **Languages**: TypeScript (75%), JavaScript (21.9%), CSS (2.8%), HTML (0.3%)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdoubel26/twitter-clone.git
   cd twitter-clone
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend API).

## Project Structure

```
twitter-clone/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service calls
│   │   └── App.tsx        # Main App component
│   └── package.json
├── server/                # Node.js/Express backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   └── server.ts          # Express server entry point
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Posts
- `GET /api/posts` - Get feed posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get post details
- `POST /api/posts/:id/like` - Like a post
- `POST /api/posts/:id/reply` - Reply to a post

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/follow` - Follow a user

### Messages
- `GET /api/messages` - Get conversations
- `POST /api/messages` - Send a message
- `GET /api/messages/:conversationId` - Get conversation history

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id` - Mark notification as read

## Development

### Running Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
```

### Code Linting
```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, issues, or questions, please open an issue on the [GitHub repository](https://github.com/Abdoubel26/twitter-clone/issues).

## Acknowledgments

- Built with modern web technologies and best practices
- Inspired by Twitter's core functionality
- Community contributions and feedback welcome
