/**
 * WORKOUT DATA CONFIGURATION
 * =========================
 * This file contains all workout data for the Olympic Lifting Workout Builder.
 * 
 * HOW TO ADD OR MODIFY WORKOUTS:
 * ------------------------------
 * 1. Each lift type (cleanAndJerk, snatch) has the same structure
 * 2. To add a new lift type, duplicate an existing structure and modify the content
 * 3. To add complexes, add them to the appropriate intensity level (light/moderate/heavy)
 * 4. To add accessories, add them to the accessories array
 * 5. The UI will automatically generate buttons and options based on this data
 * 
 * STRUCTURE EXPLANATION:
 * ----------------------
 * - displayName: Human-readable name shown in the UI
 * - warmup: Array of warmup exercises (string format)
 * - complexes: Object with three intensity levels
 *   - Each complex has: name, exercises array, sets, percentage
 * - progressions: Object with three intensity levels
 *   - Each progression has: name, sets array, rest
 * - accessories: Array of accessory options
 *   - Each option has: name, exercises array
 */

const workoutData = {
  // ==========================================
  // CLEAN & JERK WORKOUTS
  // ==========================================
  cleanAndJerk: {
    displayName: "Clean & Jerk",
    
    // Warmup exercises (empty bar, 15-20 min)
    warmup: [
      "Pass Throughs - 2×10",
      "Good Mornings - 2×10",
      "Romanian Deadlifts - 2×8",
      "Overhead Squat (Snatch Grip) - 2×5",
      "Front Squat - 2×5",
      "Push Press - 2x5",
      "Muscle Clean + Front Squat - 2×3",
      "Jerk Balance - 2x3",
    ],
    
    // Technical complexes organized by intensity
    complexes: {
      light: [
        {
          name: "Complex A: Positional Focus",
          exercises: [
            "Hang Clean (mid-thigh)",
            "Hang Clean (knee)",
            "Clean from Floor",
            "Front Squat"
          ],
          sets: "4-5 sets, rest 90 sec",
          percentage: "35-45%"
        },
        {
          name: "Complex B: Speed & Timing",
          exercises: [
            "Tall Clean",
            "Power Clean",
            "Front Squat + Jerk"
          ],
          sets: "5 sets, rest 60-90 sec",
          percentage: "35-45%"
        }
      ],
      moderate: [
        {
          name: "Complex C: Full Movement",
          exercises: [
            "Clean Pull",
            "Hang Clean",
            "Clean",
            "Jerk"
          ],
          sets: "4 sets, rest 2 min",
          percentage: "50-60%"
        },
        {
          name: "Complex D: Jerk Emphasis",
          exercises: [
            "Clean",
            "Push Jerk",
            "Split Jerk"
          ],
          sets: "4 sets, rest 2 min",
          percentage: "50-60%"
        }
      ],
      heavy: [
        {
          name: "Complex E: Strength Builder",
          exercises: [
            "Clean",
            "Front Squat",
            "Jerk"
          ],
          sets: "3-4 sets, rest 2-3 min",
          percentage: "60-70%"
        },
        {
          name: "Complex F: Power + Squat",
          exercises: [
            "Clean Pull",
            "Power Clean",
            "2 Front Squats",
            "Jerk"
          ],
          sets: "3 sets, rest 2-3 min",
          percentage: "60-70%"
        }
      ]
    },
    
    // Main lift progressions by intensity
    progressions: {
      light: {
        name: "Light Day (Build to 65-70%)",
        sets: [
          "3 reps @ 50%",
          "3 reps @ 55%",
          "2 reps @ 60%",
          "2 reps @ 65%",
          "1-2 reps @ 70%"
        ],
        rest: "Rest 2 min between sets"
      },
      moderate: {
        name: "Moderate Day (Build to 75-80%)",
        sets: [
          "3 reps @ 50%",
          "2 reps @ 60%",
          "2 reps @ 65%",
          "1 rep @ 70%",
          "1 rep @ 75%",
          "1 rep @ 80%",
          "Drop back: 2×1 @ 70-75%"
        ],
        rest: "Rest 2-3 min between sets"
      },
      heavy: {
        name: "Heavy Day (Build to 85-90%)",
        sets: [
          "2 reps @ 60%",
          "1 rep @ 70%",
          "1 rep @ 75%",
          "1 rep @ 80%",
          "1 rep @ 85%",
          "1 rep @ 87-90% (work up to daily max)",
          "Drop back: 2-3×1 @ 80-85%"
        ],
        rest: "Rest 3-4 min between sets"
      }
    },
    
    // Accessory finisher options
    accessories: [
      {
        name: "Option 1: Front Squat Focus",
        exercises: [
          "Front Squats - 4×3 @ 80-85%",
          "Back Rack Reverse Lunges - 3×6/leg",
          "Weighted Planks - 3×45 sec"
        ]
      },
      {
        name: "Option 2: Posterior Chain",
        exercises: [
          "Romanian Deadlifts - 4×6 @ moderate-heavy",
          "Bulgarian Split Squats - 3×8/leg",
          "GHD Sit-ups - 3×15"
        ]
      },
      {
        name: "Option 3: Power & Stability",
        exercises: [
          "Push Press - 4×4 @ 75-80%",
          "Front Squat Pauses (3 sec) - 3×3 @ 70%",
          "Pallof Press - 3×10/side"
        ]
      },
      {
        name: "Option 4: Volume Squats",
        exercises: [
          "Back Squats - 4×5 @ 70-75%",
          "Walking Lunges - 3×20 steps (total)",
          "Hollow Rocks - 3×20"
        ]
      },
      {
        name: "Option 5: Conditioning + Core",
        exercises: [
          "Front Squat - 3×8 @ 65-70%",
          "Box Step-ups - 3×10/leg (moderate weight)",
          "Superset: Toes to Bar (3×10) + Plank (3×30 sec)"
        ]
      }
    ]
  },

  // ==========================================
  // SNATCH WORKOUTS
  // ==========================================
  snatch: {
    displayName: "Snatch",
    
    // Warmup exercises (empty bar, 15-20 min)
    warmup: [
      "Pass Throughs - 2×10",
      "Snatch Grip Romanian Deadlifts - 2×8",
      "Muscle Snatch - 2×5",
      "Snatch Balance - 2×5",
      "Overhead Squat - 2×5",
      "Snatch Grip Behind Neck Press - 2×8",
      "Hang Power Snatch - 2×3",
      "Power Snatch + Overhead Squat - 2×2"
    ],
    
    // Technical complexes organized by intensity
    complexes: {
      light: [
        {
          name: "Complex A: Positional Snatch",
          exercises: [
            "Snatch High-Pull",
            "Hang Power Snatch (above knee)",
            "Hang Snatch (below knee)",
            "Overhead Squat"
          ],
          sets: "4-5 sets, rest 90 sec",
          percentage: "35-45%"
        },
        {
          name: "Complex B: Speed Development",
          exercises: [
            "2 Snatch Balances",
            "Hang Power Snatch (mid-thigh)",
            "Snatch from Floor"
          ],
          sets: "5 sets, rest 60-90 sec",
          percentage: "35-45%"
        }
      ],
      moderate: [
        {
          name: "Complex C: Full Sequence",
          exercises: [
            "Snatch Pull",
            "Power Snatch",
            "Snatch",
            "Overhead Squat"
          ],
          sets: "4 sets, rest 2 min",
          percentage: "50-60%"
        },
        {
          name: "Complex D: Pull Focus",
          exercises: [
            "Snatch Pull",
            "Hang Snatch Pull",
            "Power Snatch",
            "Snatch"
          ],
          sets: "4 sets, rest 2 min",
          percentage: "50-60%"
        }
      ],
      heavy: [
        {
          name: "Complex E: Strength Builder",
          exercises: [
            "Snatch",
            "Overhead Squat",
            "Snatch Balance"
          ],
          sets: "3-4 sets, rest 2-3 min",
          percentage: "60-70%"
        },
        {
          name: "Complex F: Extended Pull",
          exercises: [
            "Snatch Pull",
            "Hang Snatch Pull",
            "Power Snatch",
            "2 Overhead Squats"
          ],
          sets: "3 sets, rest 2-3 min",
          percentage: "60-70%"
        }
      ]
    },
    
    // Main lift progressions by intensity
    progressions: {
      light: {
        name: "Light Day (Build to 65-70%)",
        sets: [
          "3 reps @ 50%",
          "3 reps @ 55%",
          "2 reps @ 60%",
          "2 reps @ 65%",
          "1-2 reps @ 70%"
        ],
        rest: "Rest 2 min between sets"
      },
      moderate: {
        name: "Moderate Day (Build to 75-80%)",
        sets: [
          "3 reps @ 50%",
          "2 reps @ 60%",
          "2 reps @ 65%",
          "1 rep @ 70%",
          "1 rep @ 75%",
          "1 rep @ 80%",
          "Drop back: 2×1 @ 70-75%"
        ],
        rest: "Rest 2-3 min between sets"
      },
      heavy: {
        name: "Heavy Day (Build to 85-90%)",
        sets: [
          "2 reps @ 60%",
          "1 rep @ 70%",
          "1 rep @ 75%",
          "1 rep @ 80%",
          "1 rep @ 85%",
          "1 rep @ 87-90% (work up to daily max)",
          "Drop back: 2-3×1 @ 80-85%"
        ],
        rest: "Rest 3-4 min between sets"
      }
    },
    
    // Accessory finisher options
    accessories: [
      {
        name: "Option 1: Overhead Strength",
        exercises: [
          "Overhead Squats - 4×3 @ 80-85%",
          "Snatch Grip Push Press - 3×5 @ 70%",
          "Weighted Planks (overhead plate hold) - 3×30 sec"
        ]
      },
      {
        name: "Option 2: Pulling Power",
        exercises: [
          "Snatch Grip Deadlifts - 4×5 @ 90-100% of snatch max",
          "Snatch High-Pulls - 3×4 @ 80-85%",
          "Good Mornings - 3×8",
          "Hanging Leg Raises - 3×10"
        ]
      },
      {
        name: "Option 3: Squat + Stability",
        exercises: [
          "Back Squats - 4×4 @ 75-80%",
          "Overhead Walking Lunges (barbell or plate) - 3×20 steps",
          "Sotts Press - 3×5 (light)"
        ]
      },
      {
        name: "Option 4: Volume Overhead Work",
        exercises: [
          "Snatch Balance - 4×3 @ 70-75%",
          "Overhead Squat Pauses (3 sec) - 3×3 @ 65-70%",
          "Single Arm Overhead Carries - 3×30m/arm (KB or DB)",
          "Hollow Rocks - 3×20"
        ]
      },
      {
        name: "Option 5: Conditioning + Posterior",
        exercises: [
          "Front Squats - 3×6 @ 70%",
          "Romanian Deadlifts (snatch grip) - 3×8",
          "Superset: GHD Back Extensions (3×12) + Toes to Bar (3×10)"
        ]
      }
    ]
  }
};

/**
 * INTENSITY METADATA
 * ==================
 * Defines the intensity levels available in the app.
 * Used to generate intensity selection buttons automatically.
 */
const intensityLevels = {
  light: {
    displayName: "Light",
    description: "35-45%, build to 65-70%"
  },
  moderate: {
    displayName: "Moderate",
    description: "50-60%, build to 75-80%"
  },
  heavy: {
    displayName: "Heavy",
    description: "60-70%, build to 85-90%"
  }
};
