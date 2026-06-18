# React Conversion Guide

This project has been converted from vanilla JavaScript to React.

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Main component with header and article list
├── components/
│   ├── ArticleList.jsx   # Maps posts to Article components
│   ├── Article.jsx       # Individual article with lazy-loaded comments
│   └── Comments.jsx      # Comments list for each article
└── styles/
    └── titles.css        # CSS styling (moved from root)
```

## Changes from Vanilla JS

- **Removed**: Direct DOM manipulation with `document.createElement()` and `innerHTML`
- **Added**: React components with JSX and React hooks (useState, useEffect)
- **Lazy Loading**: Comments are fetched when the details element is toggled open
- **Build Tool**: Uses Vite for faster development and bundling
- **Styling**: CSS styling preserved and organized in src/styles/

## Features

- Displays posts from JSONPlaceholder API (page 2)
- Shows author names fetched from user endpoints
- Lazy-loads comments when expanding details elements
- Responsive design using MVP.css framework
