# learnwithanimesh

A premium demo web application designed for learning and testing **Playwright** automation scripts. This playground simulates various user interactions such as clicks, varied inputs, drag-and-drop, and native browser dialogs.

## 🚀 Features

- **Mouse Interactions**: Single click, double click, right click, and hover effects.
- **Form Elements**: Input fields, dropdowns, radio buttons, and checkboxes.
- **Complex UI**: Drag and drop zones.
- **Native Dialogs**: Alerts, confirms, and prompts.
- **Simulation Tools**: Configurable artificial delays to test timeout handling and async waiting.
- **Visual Feedback**: Toast notifications and dynamic text updates for easy assertions.

## 🛠️ Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## 📦 Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd learnwithanimesh
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## 🏃‍♂️ Running Locally (Development)

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will typically run at: [http://localhost:5173](http://localhost:5173)

## 🏗️ Building for Production

To build the application for production (optimizing interactions and assets):

1.  **Build the project**:
    ```bash
    npm run build
    ```
    This creates a `dist` folder with the static assets.

2.  **Preview the production build**:
    To manually test the production build locally:
    ```bash
    npm run preview
    ```
    This will serve the `dist` folder on a local static server (usually port 4173).

## 🧪 Testing with Playwright

1.  Ensure the application is running (e.g., `npm run dev`).
2.  Point your Playwright scripts to the local URL (e.g., `http://localhost:5173`).
3.  Use the `id` attributes provided on elements (e.g., `#click-btn`, `#drop-zone`) for robust selectors.

## 📂 Project Structure

- `src/App.jsx`: Main application logic and components.
- `src/App.css`: All custom styling (Vanilla CSS).
- `src/main.jsx`: Entry point.

---
**Happy Testing!** 🚀
