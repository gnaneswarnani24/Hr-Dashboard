# Hr-Dashboard
### 🔧 **Tech Stack**

- **React (with Next.js App Router)**
- **Tailwind CSS**
- **JavaScript (ES6+)**
- **State Management:** Context API or Zustand (your choice)
- **Optional Bonus:** Chart.js, NextAuth.js


### 🎯 **Core Features (Must Have)**

### 1. 🏠 **Dashboard Homepage (`/`)**

- Fetch and display dummy data (use `https://dummyjson.com/users?limit=20`).
- Render user cards with:
    - Full Name, Email, Age, Department (generate via `randomuser.me` + mock logic)
    - A rating bar (1–5 stars) showing performance (randomized or assign logic)
    - Buttons: `View`, `Bookmark`, and `Promote`

### 2. 🔍 **Search & Filter**

- A search bar to filter users by name, email, or department (case-insensitive).
- Multi-select filter dropdown by department or performance rating.

### 3. 👤 **Dynamic User Details Page (`/employee/[id]`)**

- Show detailed profile:
    - Address, Phone, Bio (mock), Past performance history (randomized list)
    - Show performance rating as stars and color-coded badges
- Add a tabbed UI:
    - `Overview`, `Projects`, `Feedback`
    - Each tab should load dynamically (mock data okay)

### 4. 📌 **Bookmark Manager (`/bookmarks`)**

- List all bookmarked employees.
- Allow:
    - Removing from bookmarks
    - Triggering “Promote” or “Assign to Project” (just UI actions)

### 5. 📊 **Analytics Page (`/analytics`)**

- Create a chart (using Chart.js or any lib) showing:
    - Department-wise average ratings
    - Bookmark trends (mocked)
- Optional: Use server-side rendering or static generation for this page.

---

### ⚙️ **Tech Requirements**

- **Next.js App Router**
- **Client-side and/or server-side data fetching**
- Use of:
    - **Custom hooks** (`useBookmarks`, `useSearch`)
    - **Reusable components** (Card, Badge, Modal, Button)
    - **Responsive design** (Mobile to Desktop)
- **Dark/Light mode** using Tailwind classes

---

### 🧠 **Advanced Expectations**

- Proper state management (Context or Zustand)
- Component-level loading & error states
- Modular folder structure (`components/`, `hooks/`, `lib/`, `pages/`)
- Form handling (e.g., for "Feedback" tab)
- Responsive with keyboard-accessibility where applicable

---

### ⭐️ **Bonus (Extra Points)**

- Add **Authentication** (NextAuth.js or mock login screen)
- Add a “Create User” modal or page with basic form validation
- Paginate or infinite scroll the main user list
- Animate tab/content transitions (Framer Motion or Tailwind)

<img width="1388" alt="Screenshot 2025-05-25 at 2 58 58 PM" src="https://github.com/user-attachments/assets/0636bfaf-fcd7-43ef-8978-b086bd7d32e6" />
<img width="1388" alt="Screenshot 2025-05-25 at 2 59 09 PM" src="https://github.com/user-attachments/assets/d1757689-fabb-4803-b66a-3ae322607212" />
<img width="1388" alt="Screenshot 2025-05-25 at 2 59 57 PM" src="https://github.com/user-attachments/assets/8ebb021c-d384-4250-bf63-57236fd6f0dc" />
<img width="1388" alt="Screenshot 2025-05-25 at 3 00 07 PM" src="https://github.com/user-attachments/assets/96f5db87-ef49-4273-872d-4a1b9fdfabc6" />




