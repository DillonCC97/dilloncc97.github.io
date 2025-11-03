# Quick Start Guide

## 🚀 Getting Started

### To Use the App:

1. **Open `index.html`** in your web browser
   - Double-click the file, or
   - Right-click → Open with → Your browser

2. **Select your workout components:**
   - Choose lift type (Clean & Jerk or Snatch)
   - Choose intensity (Light, Moderate, or Heavy)
   - Select a technical complex
   - Select an accessory finisher

3. **Your complete workout appears below!**
   - Print it (Ctrl/Cmd + P) or
   - Keep it on your phone at the gym

---

## 📝 To Modify Workouts:

### Easy Changes (Just Edit Data):

Open **`workout-data.js`** in any text editor to:
- Add new exercises to warmups
- Create new technical complexes
- Add accessory options
- Change sets, reps, or percentages

**The UI updates automatically!** No other files need to be changed.

### Example: Adding a New Complex

```javascript
// In workout-data.js, find the complexes section and add:
{
  name: "Complex G: My New Complex",
  exercises: [
    "Exercise 1",
    "Exercise 2", 
    "Exercise 3"
  ],
  sets: "4 sets, rest 2 min",
  percentage: "50-60%"
}
```

Save the file and refresh the browser - the new complex appears!

---

## 📂 File Structure:

```
workout-app/
├── index.html              ← Open this in your browser
├── workout-data.js         ← Edit this to change workouts
├── app.js                  ← Application logic (rarely needs editing)
├── styles.css              ← Styling (edit to change appearance)
├── README.md               ← Full documentation
├── EXAMPLE-new-lift.js     ← Example of adding new lift type
└── QUICKSTART.md           ← This file
```

---

## 💡 Common Tasks:

### Add a New Exercise to Warmup
1. Open `workout-data.js`
2. Find the `warmup` array
3. Add: `"Your Exercise - 2×10"`
4. Save and refresh

### Create a New Accessory Option
1. Open `workout-data.js`
2. Find the `accessories` array
3. Add:
   ```javascript
   {
     name: "Option X: Your Focus",
     exercises: [
       "Exercise 1 - 4×5",
       "Exercise 2 - 3×8"
     ]
   }
   ```
4. Save and refresh

### Add a Completely New Lift Type
See `EXAMPLE-new-lift.js` for a complete template!

---

## 🎨 Customizing Appearance:

Open **`styles.css`** to change:
- Colors (line 15-20)
- Fonts (line 27)
- Spacing and layout

---

## ❓ Need Help?

See **`README.md`** for comprehensive documentation including:
- Detailed architecture explanation
- Step-by-step modification guides
- Troubleshooting tips
- Browser support information

---

## 📱 Mobile Use:

The app works perfectly on phones:
- Responsive design
- Touch-friendly buttons
- Easy to read at the gym
- No app installation required

Just bookmark `index.html` on your phone!

---

**That's it! You're ready to start building custom Olympic lifting workouts.**
