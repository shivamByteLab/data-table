# React Internship Assignment – Artworks DataTable

This project is a React + TypeScript application built using **Vite** that displays artwork data from the **Art Institute of Chicago API** in a tabular format.  
It implements **server-side pagination**, **persistent row selection**, and a **custom bulk selection overlay**, following all constraints mentioned in the assignment.

---

## 🔗 Live Demo

👉 <DEPLOYED_APP_URL>

## 📦 Repository

👉 <https://github.com/shivamByteLab/data-table>

---

## 🛠 Tech Stack

- **React** (with Hooks)
- **TypeScript** (strict typing)
- **Vite** (project setup)
- **PrimeReact** (DataTable, OverlayPanel, UI components)
- **CSS** (custom, no UI frameworks)

---

## 📡 API Used

Art Institute of Chicago – Artworks API

<https://api.artic.edu/api/v1/artworks?page=1>

The API is **page-based** (1-indexed).  
Each page is fetched individually to ensure true server-side pagination.

---

## 📋 Displayed Fields

The table displays the following fields exactly as required:

- `title`
- `place_of_origin`
- `artist_display`
- `inscriptions`
- `date_start`
- `date_end`

---

## ⚙️ Application Features

### 1. Server-Side Pagination

- Data is fetched **page by page** from the API.
- Only the **current page data** is stored in memory.
- No prefetching, caching, or storing of other pages.
- Pagination is implemented using a **custom page-based paginator** that works directly with the API’s pagination model.

**Important:**

- Changing pages always triggers a new API request.
- Previously visited pages are fetched again, as required.

---

### 2. Row Selection with Checkboxes

- Each row has a checkbox for selection.
- A “Select All” checkbox is available for the **current page only**.
- Selection is fully controlled by application state (not PrimeReact internal state).

---

### 3. Persistent Selection Across Pages

Row selection persists when navigating between pages.

#### Strategy Used

- The application stores **only artwork IDs** in a `Set<number>`.
- No row objects or page data from other pages are stored.
- When a page loads:
  - Rows whose IDs exist in the `selectedIds` set are marked as selected.
- When a row is unselected on a page:
  - Its ID is removed from the set.
- Rows from other pages remain unaffected.

This ensures:

- Persistent selection
- Low memory usage
- No violation of assignment constraints

---

### 4. Custom Bulk Row Selection (Overlay Panel)

A custom bulk selection feature is implemented using a **popover (OverlayPanel)** triggered by a **dropdown arrow next to the “Select All” checkbox**.

#### How It Works

- The user enters a number `N` in the bulk selection overlay.
- The app selects as many rows as possible from the **current page**.
- If the target is not reached:
  - A **bulk selection intent** is stored.
  - As the user navigates to new pages, rows are progressively selected until the target is reached.
- No additional API calls are made.
- No future page data is fetched or stored.

This approach strictly avoids:

- Prefetching pages
- Fetching rows from other pages in advance
- Storing row objects from non-visible pages

---

### 5. Event Handling & UX Stability

- Event propagation is explicitly controlled to prevent:
  - Checkbox clicks triggering unintended row actions
  - Bulk selection arrow triggering “Select All”
- Pagination UI uses **fixed-width buttons** to prevent layout shifts with large page numbers.
- UI remains stable regardless of page count or selection size.

---

## 🚫 What This Project Explicitly Avoids

To comply with the assignment’s “Checks Before Submission”:

- ❌ No fetching of multiple pages in a loop
- ❌ No storing data from other pages
- ❌ No caching of API responses
- ❌ No selection of unseen rows
- ❌ No AI-generated bulk selection logic that fetches ahead

---

## 🧠 Key Design Decisions

- **Page-based pagination** was chosen to align directly with the API design.
- **ID-based selection tracking** was used instead of row objects to ensure scalability and correctness.
- **Progressive bulk selection** was implemented as intent-based logic rather than data-based logic.

These decisions ensure correctness, performance, and compliance with the assignment rules.

---

## ▶️ Running the Project Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 👨‍🦱 Author

### shivambytelab
