# CLAUDE.md — AI Assistant Guide

## Project Overview

This is a full-stack web application that generates COVID-19 movement attestation PDFs ("Attestation de Déplacement Dérogatoire") for French citizens. It implements the French government's mandatory travel justification form used during lockdown periods.

- **Language**: JavaScript (no TypeScript)
- **Architecture**: Monorepo with a React frontend and an Express.js backend
- **License**: MIT

---

## Repository Structure

```
attestation-covid-19/
├── CLAUDE.md                      # This file
├── README.md                      # Brief project description
├── LICENSE                        # MIT License
├── client/                        # React frontend (Create React App)
│   ├── package.json
│   ├── public/
│   │   └── index.html             # HTML entry point (French lang="fr")
│   └── src/
│       ├── index.js               # React DOM entry, Bootstrap imports
│       └── App.js                 # Main form component
└── server/                        # Express.js backend
    ├── package.json
    ├── index.js                   # Express server + API endpoints
    └── documents/
        └── index.js               # HTML-to-PDF template generator
```

---

## Key Files

### `client/src/App.js`
Class-based React component (~105 lines). Manages a controlled form with 7 fields:
- `nom`, `prenom`, `dateNaissance` — personal identity
- `rue`, `ville`, `codePostal` — address
- `motifDeplacement` — travel reason (radio button: work, shopping, health, family, sport/dog)

Key methods:
- `handleChange()` — updates state from form input events
- `createAndDownloadPdf()` — POSTs form data to `/create-pdf`, then GETs `/fetch-pdf`, then triggers a browser download as `Attestation-deplacement.pdf`

### `client/src/index.js`
Imports Bootstrap CSS and renders `<App />` into `#root`.

### `server/index.js`
Express server on port 5000 (or `process.env.PORT`).

Two endpoints:
- `POST /create-pdf` — receives form fields, generates `result.pdf` via `html-pdf`
- `GET /fetch-pdf` — sends `result.pdf` as a file download

Middleware: `cors`, `body-parser`.

### `server/documents/index.js`
Exports a function that receives form fields and returns an HTML string. This HTML is converted to PDF by `html-pdf`. Includes legal wording referencing the French decree of 16 March 2020, formatted personal info, travel reason, date, and a signature area.

---

## Development Workflows

### Starting the Application

You need two terminal sessions:

**Terminal 1 — Start the backend (port 5000):**
```bash
cd server
node index.js
```

**Terminal 2 — Start the frontend (port 3000):**
```bash
cd client
npm start
```

The React dev server proxies API requests to `http://localhost:5000/` (configured in `client/package.json`).

### Building for Production

```bash
cd client
npm run build
```

This produces a static build in `client/build/`. The server must still be run separately.

### Running Tests

```bash
# Client (CRA test runner, interactive)
cd client
npm test

# Server (no tests implemented — exits with error)
cd server
npm test
```

---

## Code Conventions

### JavaScript Style
- **CommonJS** (`require` / `module.exports`) in the server
- **ES6 modules** via CRA in the client
- **Class-based React components** (not function components / Hooks) — this is pre-2020 code
- Arrow functions for event handlers and callbacks
- Template literals for HTML generation in `documents/index.js`

### Naming
- French names used throughout: form field names (`nom`, `prenom`, `rue`, etc.), UI labels, and legal document text are all in French
- File and variable names are in English (standard JS convention)

### Styling
- Bootstrap 4.4.1 for all UI layout and components
- Loaded both via CDN in `public/index.html` and via npm in `client/src/index.js`
- No custom CSS files; inline styles only in the PDF template

### API Communication
- Axios in the client for HTTP calls
- `responseType: 'blob'` required when fetching the PDF
- `file-saver`'s `saveAs()` used to trigger download

---

## Architecture Notes

### PDF Generation Flow
1. User fills form in React → clicks button
2. Client POSTs JSON body to `POST /create-pdf`
3. Server calls `documents/index.js` to build an HTML string
4. `html-pdf` converts HTML to `result.pdf` on disk (server root)
5. Client GETs `/fetch-pdf`
6. Server streams `result.pdf` to the client
7. Client saves blob as `Attestation-deplacement.pdf` in the browser

### Known Limitations
- `result.pdf` is a single shared file — concurrent requests will overwrite each other (not production-safe)
- No input validation on server-side form fields
- No actual server tests
- Dependency versions are from 2020 and are outdated
- No database or persistent storage

---

## Dependencies Summary

### Client
| Package | Version | Purpose |
|---|---|---|
| react | 16.13.1 | UI framework |
| axios | 0.18.1 | HTTP requests |
| react-bootstrap | 1.0.0-beta.17 | Bootstrap components |
| bootstrap | 4.4.1 | CSS framework |
| file-saver | 2.0.2 | Browser file download |
| react-scripts | 2.1.3 | CRA build tooling |

### Server
| Package | Version | Purpose |
|---|---|---|
| express | 4.17.1 | HTTP server |
| cors | 2.8.5 | Cross-origin headers |
| body-parser | 1.19.0 | JSON body parsing |
| html-pdf | 2.2.0 | HTML → PDF conversion |

---

## Common Tasks for AI Assistants

### Adding a new form field
1. Add field to `this.state` in `client/src/App.js`
2. Add a controlled `<Form.Control>` input in the JSX
3. Add the field to the POST body in `createAndDownloadPdf()`
4. Add the field to the destructured parameter in `server/documents/index.js`
5. Incorporate it into the HTML template string

### Changing PDF content or styling
- Edit `server/documents/index.js` — all HTML and inline CSS for the PDF lives here
- The function receives: `{ nom, prenom, dateNaissance, rue, ville, codePostal, motifDeplacement }`

### Adding a new API endpoint
- Add route handler in `server/index.js`
- Call it from `client/src/App.js` using `axios`

### Modifying travel reason options
- Update the radio buttons in `App.js` render method
- Update the corresponding text in the HTML template in `server/documents/index.js`
