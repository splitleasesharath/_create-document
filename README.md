# _create-document Page

This is the document creation interface for the Split Lease application. It allows users to select a policy document, optionally rename it, select a host recipient, and create a new Documents Sent record.

## Features

- **Document Selector**: Searchable dropdown for selecting from available policy documents
- **Document Name Input**: Auto-populates with selected document name, editable by user
- **Host Selector**: Searchable dropdown for selecting a host user
- **Create Document**: Button to submit and create a new Documents Sent record

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Supabase** for database operations
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **shadcn/ui** component patterns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase project with the required tables:
  - `ZAT-Policies Documents`
  - `Users` (or Supabase auth users)
  - `Documents Sent`

### Installation

1. Clone the repository:
```bash
git clone https://github.com/splitleasesharath/_create-document.git
cd _create-document
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000/_create-document](http://localhost:3000/_create-document) in your browser.

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_CRISP_WEBSITE_ID`: (Optional) Your Crisp chat website ID

## Database Schema

### ZAT-Policies Documents Table
- `id` (uuid, primary key)
- `Name` (text) - Document name
- Additional fields as needed

### Documents Sent Table
- `id` (uuid, primary key)
- `document_on_policies` (uuid, foreign key to ZAT-Policies Documents)
- `document_sent_title` (text)
- `host_user` (uuid, foreign key to auth.users)
- `host_email` (text)
- `host_name` (text)
- `created_at` (timestamp)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Page URL

Production: `https://app.split.lease/_create-document`

## Documentation

For comprehensive requirements and specifications, see the requirements document in the project root.
