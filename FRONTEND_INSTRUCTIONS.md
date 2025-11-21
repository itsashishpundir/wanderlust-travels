# Frontend Implementation Instructions

This document outlines the necessary changes to the React frontend (`wanderlust-travels`) to integrate the new backend features: **Homestays**, **Dynamic Image Uploads**, and **Blog Management**.

## 1. API Service Updates (`src/services/api.ts` or similar)
Ensure your API service can handle file uploads.
- Create a helper function for uploading images.
```typescript
// Example upload function
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.imageUrl; // Returns relative path like /assets/images/123.jpg
};
```

## 2. Admin Panel Updates

### A. Image Upload Component
Replace all text inputs for "Image URL" with a file uploader.
- **Component:** Create a reusable `ImageUpload` component.
- **Behavior:**
  - User selects file -> Upload to backend -> Get URL -> Save URL to form state.
  - Show preview of the uploaded image.

### B. New Section: Homestays
Create a CRUD interface for Homestays, similar to Hotels.
- **Route:** `/admin/homestays`
- **Features:**
  - List all homestays.
  - Add/Edit Homestay (Fields: Name, Location, Price/Night, Rating, Image, Amenities, Description).
  - Delete Homestay.

### C. New Section: Blogs
Create a CRUD interface for Blog Posts.
- **Route:** `/admin/blogs`
- **Features:**
  - List all blogs.
  - Add/Edit Blog (Fields: Title, Excerpt, Content, Author, Category, Image).
  - Delete Blog.

### D. Update Existing Sections (Packages, Hotels, Taxis)
- Update their "Add/Edit" forms to use the new `ImageUpload` component instead of a text field.

## 3. Public Website Updates

### A. Homestays Page
- **Route:** `/homestays`
- **Display:** Grid of available homestays.
- **Details:** Clicking a homestay shows details (Price, Amenities, etc.).

### B. Blog Page
- **Route:** `/blog`
- **Display:** List of blog posts.
- **Details:** Clicking a post shows the full content.

### C. Image Rendering
- Ensure all `<img>` tags using backend data prepend the API URL if the image path is relative.
```typescript
// Helper to resolve image URL
const getImageUrl = (path: string) => {
  if (path.startsWith('http')) return path; // External link
  return `${import.meta.env.VITE_API_URL}${path}`; // Local upload
};
```

## 4. Navigation
- Add "Homestays" and "Blog" links to the main Navbar.
