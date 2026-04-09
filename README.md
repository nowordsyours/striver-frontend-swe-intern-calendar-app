# **🗓️ INTERACTIVE DASHBOARD CALENDAR**

**A beautiful, highly interactive, and fully responsive Dashboard Calendar & Planner built with modern web technologies. This project features a split-layout design with a dynamic seasonal aesthetic on one side and a powerful, functional planner on the other.**

---

## **✨ KEY FEATURES**

* **🌗 ADVANCED DARK/LIGHT MODE:** Seamless toggle between themes. Saves user preference in `localStorage` so the theme persists across sessions.
* **🎨 DYNAMIC SEASONAL THEMES:** The dashboard dynamically updates its aesthetics based on the current month, featuring 12 unique color palettes and backgrounds for Winter, Spring, Summer, and Autumn.
* **📝 ACTION TIMELINE (NOTES SYSTEM):** Select a specific date or range and attach custom notes. Features full CRUD operations saved directly to the browser's `localStorage`.
* **📅 INTERACTIVE DATE MATRIX:** Select start and end dates, use custom Month and Year dropdown pickers, and view pre-configured major Indian Holidays.
* **⏰ LIVE CLOCK & DYNAMIC GREETINGS:** Features a real-time running clock with greetings that adapt to the current time of day.
* **💅 PREMIUM UI/UX:** Custom thin scrollbars, smooth image fade-ins, hover scaling, and fully responsive layout.

---

## **🛠️ TECH STACK**

* **FRAMEWORK:** [Next.js](https://nextjs.org/)
* **STYLING:** [Tailwind CSS v4](https://tailwindcss.com/)
* **DATE MANAGEMENT:** `date-fns`
* **ICONS:** `lucide-react`

---

## **🚀 GETTING STARTED**

### **PREREQUISITES**
Make sure you have Node.js installed on your machine.

### **INSTALLATION**

1.  **CLONE THE REPOSITORY:**
    ```bash
    git clone [https://github.com/nowordsyours/striver-frontend-swe-intern-calendar-app.git]
    (https://github.com/nowordsyours/striver-frontend-swe-intern-calendar-app.git)
    ```

2.  **NAVIGATE TO THE DIRECTORY:**
    ```bash
    cd striver-frontend-swe-intern-calendar app
    ```

3.  **INSTALL DEPENDENCIES:**
    ```bash
    npm install
    ```

4.  **RUN THE DEVELOPMENT SERVER:**
    ```bash
    npm run dev
    ```

5.  **OPEN [HTTP://LOCALHOST:3000](http://localhost:3000)** with your browser to see the result.

---

## **📂 PROJECT STRUCTURE**

```text
src/
├── app/
│   ├── calendar-data.ts       # Constants, holidays, and seasonal themes
│   ├── interfaces.ts          # TypeScript interfaces
│   ├── globals.css            # Tailwind v4 imports and custom CSS
│   ├── layout.tsx             
│   └── page.tsx               # Main entry point
└── components/
    ├── DashboardBoard.tsx     # Root orchestrator 
    ├── DateMatrix.tsx         # Interactive calendar grid
    ├── SeasonalPanel.tsx      # Hero image and live clock
    └── ActionTimeline.tsx     # Sticky notes and timeline functionality
