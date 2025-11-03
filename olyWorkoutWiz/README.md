# Olympic Lifting Workout Builder

A minimalist, modular web application for generating custom Olympic lifting workouts for Clean & Jerk and Snatch training.

## 📁 Project Structure

```
workout-app/
├── index.html          # HTML structure (minimal, semantic markup)
├── styles.css          # All styling (minimalist academic design)
├── app.js             # Application logic (state management, UI rendering)
├── workout-data.js    # Workout data (single source of truth)
└── README.md          # This file
```

## 🎯 Architecture Overview

### Separation of Concerns

1. **index.html** - Structure only
   - Semantic HTML5 elements
   - No inline styles or scripts
   - Container elements for dynamic content

2. **styles.css** - Presentation only
   - Academic minimalist design
   - Mobile-responsive layout
   - Print-friendly styles

3. **app.js** - Behavior only
   - State management
   - UI rendering logic
   - Event handling
   - No workout data (pure logic)

4. **workout-data.js** - Data only
   - All workout configurations
   - Intensity level metadata
   - No application logic

### Data-Driven Design

The UI is **automatically generated** from the workout data structure. Adding new workouts, complexes, or accessories requires **zero changes to app.js** - just edit workout-data.js.

## 📝 How to Add or Modify Workouts

### Adding a New Lift Type

1. Open `workout-data.js`
2. Add a new object to `workoutData`:

```javascript
const workoutData = {
  cleanAndJerk: { ... },
  snatch: { ... },
  // Add your new lift here
  powerClean: {
    displayName: "Power Clean",
    warmup: [...],
    complexes: {
      light: [...],
      moderate: [...],
      heavy: [...]
    },
    progressions: {
      light: {...},
      moderate: {...},
      heavy: {...}
    },
    accessories: [...]
  }
};
```

3. Save the file - the UI will automatically show the new lift type!

### Adding a New Complex

1. Open `workout-data.js`
2. Navigate to the lift type and intensity level
3. Add a new complex object to the array:

```javascript
complexes: {
  moderate: [
    { ... existing complex ... },
    // Add your new complex here
    {
      name: "Complex G: New Pattern",
      exercises: [
        "Exercise 1",
        "Exercise 2",
        "Exercise 3"
      ],
      sets: "4 sets, rest 2 min",
      percentage: "50-60%"
    }
  ]
}
```

4. Save - the new complex button appears automatically!

### Adding a New Accessory

1. Open `workout-data.js`
2. Navigate to the lift type's `accessories` array
3. Add a new accessory object:

```javascript
accessories: [
  { ... existing accessories ... },
  // Add your new accessory here
  {
    name: "Option 6: Your Focus",
    exercises: [
      "Exercise 1 - Sets×Reps @ Load",
      "Exercise 2 - Sets×Reps @ Load"
    ]
  }
]
```

4. Save - the new accessory option appears automatically!

### Adding a New Intensity Level

1. Open `workout-data.js`
2. Add to `intensityLevels` object:

```javascript
const intensityLevels = {
  light: { ... },
  moderate: { ... },
  heavy: { ... },
  // Add your new intensity
  maxEffort: {
    displayName: "Max Effort",
    description: "70-80%, build to 95-100%"
  }
};
```

3. Add corresponding complexes and progressions to each lift type:

```javascript
complexes: {
  light: [...],
  moderate: [...],
  heavy: [...],
  maxEffort: [...]  // Add here
},
progressions: {
  light: {...},
  moderate: {...},
  heavy: {...},
  maxEffort: {...}  // And here
}
```

4. Save - the new intensity button appears automatically!

## 🎨 Customizing Design

### Changing Colors

Edit the color variables in `styles.css` (lines 15-20):

```css
/* COLOR PALETTE */
- Primary Text: #1a1a1a
- Secondary Text: #666
- Background: #fafaf9
- Surface: #fff
- Borders: #e5e5e5, #d4d4d4
```

### Changing Fonts

Edit the Google Fonts import in `styles.css` (line 27):

```css
@import url('https://fonts.googleapis.com/...');
```

Then update font-family declarations throughout the file.

### Changing Layout

The app uses CSS Grid for responsive layout. Modify breakpoints and grid templates in `styles.css`:

```css
@media (min-width: 768px) {
  .selection-grid {
    grid-template-columns: 1fr 1fr;
  }
}
```

## 🔧 Modifying Behavior

### Changing Default Selections

Edit initial state in `app.js` (lines 26-31):

```javascript
const state = {
  liftType: 'cleanAndJerk',  // Change default lift
  intensity: 'moderate',      // Change default intensity
  selectedComplex: 0,         // Change default complex (0-indexed)
  selectedAccessory: 0        // Change default accessory (0-indexed)
};
```

### Adding New Features

All UI rendering functions are in `app.js`. Common modifications:

- **Change button rendering**: Edit `createButton()` function
- **Add new workout sections**: Create new render function and call in `renderWorkout()`
- **Modify state logic**: Update setter functions (e.g., `setLiftType()`)

## 📱 Mobile Optimization

The app is fully responsive:

- Single column layout on mobile (< 768px)
- Touch-friendly button sizes (min 44px tap target)
- Readable font sizes on all screen sizes
- No horizontal scrolling

## 🖨️ Print Support

The app includes print-optimized styles:

- Selection panel hidden when printing
- Clean, readable workout output
- No background colors or borders

Use browser's print function (Ctrl/Cmd + P) to print workout.

## 🚀 Deployment

This is a static web app with no server requirements:

1. Upload all files to any web server
2. Ensure all files are in the same directory
3. Open `index.html` in browser
4. No build process or dependencies required

## 📊 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

Uses vanilla JavaScript (ES6+) and modern CSS. No polyfills required for modern browsers.

## 🐛 Troubleshooting

**Buttons not appearing:**
- Check browser console for JavaScript errors
- Ensure all files are in the same directory
- Verify workout-data.js loads before app.js

**Workout not updating:**
- Check state object in browser console
- Verify render functions are being called
- Ensure element IDs in HTML match those in app.js

**Styling issues:**
- Verify styles.css is loading (check Network tab)
- Check for CSS syntax errors
- Clear browser cache

## 📄 License

Free to use and modify for personal and commercial purposes.

## 🤝 Contributing

To contribute:
1. Follow existing code style and comments
2. Test on mobile and desktop
3. Update this README if adding new features
4. Keep separation of concerns (data/logic/style)
