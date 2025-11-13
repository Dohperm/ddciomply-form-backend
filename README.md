# DDComply Form Backend

NDPC registration form backend with MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB locally or update MONGODB_URI in .env

3. Set up Cloudinary credentials in .env:
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET

4. Run the server:
```bash
npm run dev
```

## API Endpoints

- POST `/api/register` - Submit registration form
- GET `/api/registrations` - Get all registrations

## File Upload

Supports PDF, DOC, DOCX, JPG, PNG files up to 5MB each. Files are uploaded to Cloudinary and URLs are stored in the database.