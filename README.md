# RealEstate Pro - Full Stack Next.js Application

A comprehensive real estate platform built with Next.js, Clerk Authentication, MongoDB, Prisma ORM, and Tailwind CSS.

## Features

- **User Authentication**: Secure authentication with Clerk (email, username, and Google auth)
- **User Roles**: Different access levels for users, agents, and admins
- **Property Listings**: Browse, search, and filter properties
- **Property Management**: Add, edit, and delete property listings
- **User Dashboard**: Manage saved properties, listings, and messages
- **Admin Panel**: Manage users, properties, and view analytics
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS and shadcn/ui

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Authentication**: Clerk
- **Database**: MongoDB Atlas
- **ORM**: Prisma
- **Styling**: Tailwind CSS and shadcn/ui components
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- Clerk account

### Environment Setup

Create a `.env` file in the root directory with the following variables:

\`\`\`
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# MongoDB
DATABASE_URL=your_mongodb_connection_string

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/real-estate-website.git
   cd real-estate-website
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Generate Prisma client:
   \`\`\`bash
   npx prisma generate
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                  # Next.js App Router
│   ├── actions/          # Server Actions
│   ├── api/              # API Routes
│   ├── admin/            # Admin dashboard
│   ├── dashboard/        # User dashboard
│   ├── properties/       # Property listings
│   └── about/            # About page
├── components/           # React components
│   ├── ui/               # UI components from shadcn/ui
│   └── custom/           # Custom components
├── lib/                  # Utility functions and libraries
│   └── prisma.ts         # Prisma client
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma     # Database schema
├── public/               # Static assets
└── middleware.ts         # Clerk authentication middleware
\`\`\`

## Deployment

This application can be easily deployed to Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Setting Up Clerk Webhooks

To keep your MongoDB database in sync with Clerk user data:

1. Go to your Clerk Dashboard
2. Navigate to Webhooks
3. Create a new webhook endpoint: `https://your-domain.com/api/webhook/clerk`
4. Select the following events:
   - user.created
   - user.updated
   - user.deleted
5. Copy the signing secret and add it to your environment variables as `CLERK_WEBHOOK_SECRET`

## Setting Up User Roles

By default, all new users are assigned the "USER" role. To change a user's role:

1. Log in as an admin
2. Go to the Admin Dashboard
3. Navigate to the Users tab
4. Find the user you want to modify
5. Change their role to "AGENT" or "ADMIN"

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.dev/)
- [Prisma](https://prisma.io/)
- [MongoDB](https://mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
