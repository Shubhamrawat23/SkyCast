# SkyCast App ⛅

A responsive React weather application built with Create React App and styled using Tailwind CSS.

---

## Tech Stack

| Category | Technology |
|---|---|
| Frontend Framework | React 18.2.0 |
| Styling | Tailwind CSS 3.4.19 |
| Bundler | Webpack 5 (via react-scripts 5.0.1) |
| Language | JavaScript (JSX) |
| Package Manager | npm |
| Node Requirement | >= 14.0.0 |

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd weatherapp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| Start | `npm start` | Runs the app in development mode with hot reload |
| Build | `npm build` | Builds the app for production to the `build/` folder |
| Test | `npm test` | Launches the test runner in interactive watch mode |
| Eject | `npm run eject` | Ejects from Create React App (irreversible) |

---

## Project Structure

```
weatherapp/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css          # Tailwind directives
│   ├── Component/
│   │   ├── CityWeather/
│   │   │   └── CityWeather.js
│   │   ├── RecentSearch/
│   │   │   └── RecentSearches.js
│   │   └── SearchCity/
│   │       └── SearchInput.js
│   └── Context/
│       └── Context.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## Tailwind CSS Setup

Tailwind is configured alongside PostCSS. The following config files are required:

**`tailwind.config.js`**
```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**`postcss.config.js`**
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**`src/index.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Dependencies

### Production

| Package | Version | Purpose |
|---|---|---|
| react | 18.2.0 | Core UI library |
| react-dom | 18.2.0 | DOM rendering |
| react-scripts | 5.0.1 | CRA build toolchain |
| web-vitals | 2.1.4 | Performance metrics |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| tailwindcss | 3.4.19 | Utility-first CSS framework |
| autoprefixer | 10.4.19 | CSS vendor prefixing |
| postcss | 8.4.38 | CSS transformation toolchain |

### Testing

| Package | Version |
|---|---|
| @testing-library/jest-dom | 5.17.0 |
| @testing-library/react | 13.4.0 |
| @testing-library/user-event | 13.5.0 |

---

## Browser Support

### Production
- Browsers with > 0.2% market share
- Excludes dead browsers
- Excludes Opera Mini

### Development
- Latest Chrome
- Latest Firefox
- Latest Safari

---

## Features

- 🔍 Search weather by city name
- 🕘 Recent searches sidebar
- 🌡️ Toggle between °C and °F units
- 💧 Humidity, wind speed, pressure stats
- 🌅 Sunrise / sunset times
- 📅 5-day weather forecast
- 📱 Fully responsive (mobile & desktop)

---

## License

This project is private and not licensed for public distribution.