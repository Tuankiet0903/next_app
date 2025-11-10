# Next.js Authentication App

A modern web application built with Next.js 14, featuring user authentication, dark mode, and a responsive design.

## Features

- 🔐 User Authentication

  - Email/Password registration and login
  - Secure password handling
  - Protected routes
  - Session management with NextAuth.js

- 🎨 Theme Support

  - Dark/Light mode toggle
  - Persistent theme preference
  - Smooth theme transitions

- 💼 Dashboard

  - Protected dashboard page
  - User-specific content

- 🎯 Modern UI
  - Responsive design
  - Tailwind CSS styling
  - Clean and intuitive interface
  - Form validation
  - Loading states and error handling

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **UI Components**: Headless UI
- **Container**: Docker support

## Getting Started

### Prerequisites

- Node.js 18 or later
- Docker (optional, for containerized database)
- PostgreSQL (if not using Docker)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Tuankiet0903/next_app.git
   cd next_app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```

4. Set up the database:

   ```bash
   # If using Docker
   docker-compose up -d

   # Initialize Prisma
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Support

To run the entire application using Docker:

```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down
```

## Project Structure

```
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/            # App router pages and API routes
│   │   ├── api/        # API endpoints
│   │   ├── dashboard/  # Protected dashboard page
│   │   ├── login/      # Authentication pages
│   │   └── register/
│   ├── components/     # Reusable components
│   └── contexts/       # React contexts (theme, etc.)
```

## Key Features Explained

### Authentication Flow

1. User registration with email and password
2. Secure password hashing
3. JWT-based session management
4. Protected route middleware
5. Automatic redirect for unauthenticated users

### Theme System

- Theme context provider for global state
- System preference detection
- Persistent theme storage
- Tailwind dark mode integration

### Security Features

- CSRF protection
- Secure password handling
- Protected API routes
- HTTP-only cookies
- Input sanitization

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (when implemented)

### Database Management

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Heroicons](https://heroicons.com/)
