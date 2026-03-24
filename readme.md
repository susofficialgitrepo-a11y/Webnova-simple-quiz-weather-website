# 🌐 FrontendCraft — Task 3: Advanced Styling & JavaScript

> **Internship Project** | HTML · CSS · Vanilla JavaScript  
> A fully responsive, interactive single-page website demonstrating advanced frontend development skills.

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Live Features](#-live-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Weather API Setup](#-weather-api-setup)
- [Quiz Subjects](#-quiz-subjects)
- [Responsive Design](#-responsive-design)
- [Screenshots](#-screenshots)
- [Customisation Guide](#-customisation-guide)
- [Author](#-author)

---

## 📖 About the Project

FrontendCraft Task 3 is an internship assignment focused on gaining advanced skills in **CSS** and **JavaScript** for building interactive, responsive websites.

The project covers three core objectives:

| # | Objective | Implementation |
|---|-----------|----------------|
| 1 | Responsive Design using Media Queries | Mobile · Tablet · Desktop layouts |
| 2 | Interactive JavaScript Features | Image Carousel + Multi-subject Quiz |
| 3 | Fetch Data from a Public API | Real-time Weather via OpenWeatherMap |

---

## ✨ Live Features

### 🧭 Responsive Navbar
- Fixed top navigation bar with smooth scroll links
- Hamburger menu on mobile (< 1024px)
- Blur/glass backdrop effect
- Active link highlights on scroll

### 🦸 Hero Section
- Animated floating skill cards (HTML5, CSS3, JavaScript, REST API)
- Orbiting hub with spinning rings
- Achievement badge chips
- Gradient text heading + CTA buttons
- Morphing background blobs

### 🖼️ Image Carousel (Section 01)
- 5 illustrated slides with unique visual diagrams per topic
- Auto-plays every **4 seconds**
- Pauses on hover
- Previous / Next buttons
- Clickable dot indicators
- Touch / swipe support on mobile
- Keyboard arrow key navigation (← →)
- Slide counter display

### 🧠 Interactive Quiz (Section 02)
- **6 subjects** to choose from
- **10 questions** per subject
- **20-second countdown timer** per question (with animated ring)
- Timer turns yellow at 10s, red at 5s
- Auto-skips with correct answer revealed on timeout
- Instant colour-coded feedback (green = correct, red = wrong)
- Live score tracker
- Animated SVG score ring on result screen
- 5-tier result messages (Perfect → Excellent → Good → Keep Studying → Don't Give Up)
- Replay same subject or switch subjects

### 🌤️ Weather Checker (Section 03)
- City name input field
- 6 quick-pick city buttons
- Fetches real-time data from **OpenWeatherMap API**
- Displays: City name, Country, Temperature, Feels Like, Condition, Humidity, Wind Speed, Visibility, Pressure
- Animated loading indicator (bouncing dots)
- Error handling for invalid cities
- Last updated timestamp

### 🔗 Footer
- Social media links: GitHub, LinkedIn, Twitter/X, Instagram, YouTube, Portfolio
- Brand hover colours per platform
- Navigation links
- Project credits

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic page structure, ARIA labels |
| **CSS3** | Custom properties, Grid, Flexbox, Animations, Media Queries |
| **Vanilla JavaScript** | DOM manipulation, Event listeners, Fetch API, Timer logic |
| **Google Fonts** | Outfit (display) + Nunito (body) |
| **OpenWeatherMap API** | Real-time weather data |

**No frameworks. No libraries. No dependencies.**

---

## 📁 Project Structure

```
task3/
├── index.html      ← Page structure & all sections
├── style.css       ← All styles, variables, animations, media queries
├── script.js       ← All JavaScript (navbar, carousel, quiz, weather)
└── README.md       ← This file
```

---

## 🚀 Getting Started

### Option A — VS Code Live Server (Recommended)

1. Download all 4 files into one folder
2. Open the folder in **VS Code**
3. Install the **Live Server** extension (if not already installed)
4. Right-click `index.html` → **Open with Live Server**
5. Browser opens at `http://127.0.0.1:5500`

### Option B — Direct Browser Open

1. Download all files into one folder
2. Double-click `index.html`
3. Opens directly in your default browser

> ⚠️ The Weather section requires an API key and an internet connection. Quiz and Carousel work fully offline.

---

## 🌦️ Weather API Setup

The Weather Checker uses the **OpenWeatherMap API** (free tier).

### Steps:

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Click **Sign Up** and create a free account
3. Go to **"My API Keys"** in your dashboard
4. Copy your API key
5. Open `script.js` and find **line 12**:

```javascript
const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
```

6. Replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual key:

```javascript
const WEATHER_API_KEY = 'abc123youractualkey456xyz';
```

7. Save and refresh the browser

> 💡 The free tier allows **60 API calls per minute** — more than enough for this project.  
> ⏳ New API keys may take **10–15 minutes** to activate after creation.

---

## 🧠 Quiz Subjects

Each subject contains **10 unique multiple-choice questions**:

| Subject | Icon | Topics Covered |
|---------|------|----------------|
| **Java** | ☕ | OOP, JVM, Collections, Keywords, Data Types |
| **Python** | 🐍 | Syntax, Data Types, Functions, Modules, OOP |
| **Operating Systems** | 🖥️ | Scheduling, Memory, Deadlock, Processes, Kernel |
| **DBMS** | 🗄️ | SQL, Normalisation, Keys, Joins, Transactions |
| **Artificial Intelligence** | 🤖 | ML, Neural Networks, Search Algorithms, Deep Learning |
| **Web Development** | 🌐 | HTML, CSS, JavaScript, DOM, HTTP |

### Quiz Rules:
- Each question has **4 options** (single correct answer)
- **20 seconds** to answer — timer auto-skips on expiry
- Score is counted only for answers selected before timeout
- Final score displayed with an animated SVG ring chart

---

## 📱 Responsive Design

The layout adapts across three breakpoints:

| Breakpoint | Screen Width | Layout Changes |
|------------|-------------|----------------|
| **Desktop** | > 1024px | Full multi-column layout, side panels visible |
| **Tablet** | 600px – 1024px | 2-column grids, hamburger menu, stacked hero |
| **Mobile** | < 640px | Single column, stacked nav, scrollable cities row |
| **XS Mobile** | < 380px | Further scaled typography and card sizes |

### Mobile-specific features:
- Hamburger menu replaces desktop navigation
- Hero animation hidden to save space
- Search box stacks vertically
- Quick city buttons become horizontally scrollable
- Weather card uses CSS Grid for compact layout
- Quiz side cards hidden for cleaner experience

---

## 🎨 Screenshots

> Add your own screenshots here after running the project locally.

```
screenshots/
├── hero.png
├── carousel.png
├── quiz-subjects.png
├── quiz-active.png
├── weather.png
└── mobile.png
```

To add a screenshot in Markdown:
```markdown
![Hero Section](screenshots/hero.png)
```

---

## ✏️ Customisation Guide

### Change the Logo
In `index.html`, find both instances of `.logo-icon` (Navbar + Footer) and replace the SVG inside:

```html
<div class="logo-icon">
  
  <svg xmlns="http://www.w3.org/2000/svg" width="2500" height="1633" viewBox="0 .003 421 274.997" id="w">
  <g fill="#dc1354">
    <path d="M385.872 204.488c-19.401 0-35.171 15.769-35.171 35.127 0 19.359 15.77 35.15 35.17 35.15 19.338 0 35.129-15.791 35.129-35.15 0-19.358-15.791-35.127-35.128-35.127M264.25 202.01l-3.505 1.41c-2.372 0-4.167-.62-5.342-1.902-1.175-1.303-2.265-4.017-3.42-8.205L218.247 64.169h-65.94l-30.918 129.144c-1.068 4.55-2.287 7.543-3.697 8.889l-4.98 2.094c-4.251 0-7.456-3.653-9.486-10.982L60.427 64.169H0l56.666 168.503c3.44 9.979 7.179 17.969 11.154 23.889 3.996 5.918 9.444 10.448 16.346 13.674C91.132 273.398 99.87 275 110.555 275c27.799 0 45.534-14.486 53.098-43.504l22.885-87.627 23.995 86.217c2.628 9.039 6.24 16.9 10.748 23.547 4.51 6.623 10.172 11.88 16.967 15.684 6.857 3.78 14.893 5.684 24.059 5.684 6.262 0 12.842-1.795 19.766-5.363 6.9-3.547 13.332-8.803 19.273-15.812 5.918-6.987 10.49-15.085 13.652-24.337L393.63.005H334.55l-66.966 195.297c-1.22 3.609-2.48 5.767-3.334 6.708"></path>
    <path d="M385.872 274.766c-19.401 0-35.171-15.791-35.171-35.15 0-19.358 15.77-35.127 35.17-35.127 19.338 0 35.129 15.769 35.129 35.127 0 19.359-15.791 35.15-35.128 35.15"></path>
  </g>
</svg>

</div>
Your Name
```

### Change the Site Name
Search for `FrontendCraft` in `index.html` and replace with your name:
- Line 6 — `<title>` tag
- Line 17 — Navbar logo text  
- Line 537 — Footer logo text

### Update Social Media Links
In `index.html`, find the footer section and replace `YOUR_USERNAME`:

```html
<a href="https://github.com/susofficialgitrepo-a11y" ...>GitHub</a>
<a href="https://linkedin.com/in/subham-jana-bb33902b6" ...>LinkedIn</a>
<a href="https://twitter.com/YOUR_USERNAME" ...>Twitter / X</a>
<a href="https://www.instagram.com/subham_jana___igsh=cjIyZTIzcGpjNHI4&utm_source=ig_contact_invite" ...>Instagram</a>

```

### Change Accent Colour
In `style.css`, find the `:root` block and update `--accent`:

```css
:root {
  --accent: #6c63ff;  
}
```

### Add More Quiz Questions
In `script.js`, find `QUESTION_BANK` and add to any subject array:

```javascript
java: [
  // existing questions...
  {
    q:    'Your new question here?',
    opts: ['Option A', 'Option B', 'Option C', 'Option D'],
    ans:  0   // index of correct answer (0 = Option A)
  }
]
```

---

## 👤 Author

**SUBHAM JANA**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/susofficialgitrepo-a11y)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/subham-jana-bb33902b6)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/subham_jana___igsh=cjIyZTIzcGpjNHI4&utm_source=ig_contact_invite)


> 

---

## 📄 License

This project was built as part of an internship task for educational purposes.  
Feel free to use, modify, and share with attribution.

---

<p align="center">
  Built with ❤️ using HTML · CSS · Vanilla JS &nbsp;|&nbsp; Internship Task 3
</p>