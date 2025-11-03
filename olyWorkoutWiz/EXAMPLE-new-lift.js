/**
 * EXAMPLE: ADDING A NEW LIFT TYPE
 * ================================
 * 
 * This file shows how to add a new lift type (Power Clean) to the workout builder.
 * Copy this structure into workout-data.js to add your own lift type.
 * 
 * STEPS TO ADD THIS TO THE APP:
 * -----------------------------
 * 1. Copy the 'powerClean' object below
 * 2. Paste it into workout-data.js after the 'snatch' object
 * 3. Add a comma after the snatch object's closing brace
 * 4. Save the file
 * 5. Refresh the app - the new lift type appears automatically!
 * 
 * That's it! No changes to HTML, CSS, or JavaScript required.
 */

// ADD THIS TO workoutData in workout-data.js:
const exampleNewLift = {
  
  powerClean: {
    // Display name shown in UI
    displayName: "Power Clean",
    
    // Warmup exercises
    warmup: [
      "Pass Throughs - 2×10",
      "Good Mornings - 2×10",
      "Romanian Deadlifts - 2×8",
      "Power Shrugs - 2×8",
      "Hang Power Clean - 2×5",
      "Power Clean from Floor - 2×3"
    ],
    
    // Technical complexes by intensity
    complexes: {
      light: [
        {
          name: "Complex A: Hip Contact",
          exercises: [
            "Hang Power Clean (mid-thigh)",
            "Hang Power Clean (knee)",
            "Power Clean from Floor"
          ],
          sets: "4-5 sets, rest 90 sec",
          percentage: "40-50%"
        },
        {
          name: "Complex B: Speed Development",
          exercises: [
            "Power Clean Pull",
            "Power Clean",
            "Front Squat"
          ],
          sets: "5 sets, rest 60-90 sec",
          percentage: "40-50%"
        }
      ],
      moderate: [
        {
          name: "Complex C: Full Extension",
          exercises: [
            "Clean Pull",
            "Power Clean",
            "Push Press"
          ],
          sets: "4 sets, rest 2 min",
          percentage: "55-65%"
        },
        {
          name: "Complex D: Landing Position",
          exercises: [
            "Power Clean",
            "Front Squat",
            "Power Clean"
          ],
          sets: "4 sets, rest 2 min",
          percentage: "55-65%"
        }
      ],
      heavy: [
        {
          name: "Complex E: Max Power",
          exercises: [
            "Power Clean",
            "Push Jerk"
          ],
          sets: "3-4 sets, rest 2-3 min",
          percentage: "65-75%"
        },
        {
          name: "Complex F: Pulling Strength",
          exercises: [
            "Clean Pull",
            "Power Clean",
            "2 Front Squats"
          ],
          sets: "3 sets, rest 2-3 min",
          percentage: "65-75%"
        }
      ]
    },
    
    // Main lift progressions by intensity
    progressions: {
      light: {
        name: "Light Day (Build to 70-75%)",
        sets: [
          "3 reps @ 50%",
          "3 reps @ 60%",
          "2 reps @ 65%",
          "2 reps @ 70%",
          "1-2 reps @ 75%"
        ],
        rest: "Rest 2 min between sets"
      },
      moderate: {
        name: "Moderate Day (Build to 80-85%)",
        sets: [
          "3 reps @ 50%",
          "2 reps @ 60%",
          "2 reps @ 70%",
          "1 rep @ 75%",
          "1 rep @ 80%",
          "1 rep @ 85%",
          "Drop back: 2×1 @ 75-80%"
        ],
        rest: "Rest 2-3 min between sets"
      },
      heavy: {
        name: "Heavy Day (Build to 90-95%)",
        sets: [
          "2 reps @ 60%",
          "1 rep @ 70%",
          "1 rep @ 80%",
          "1 rep @ 85%",
          "1 rep @ 90%",
          "1 rep @ 92-95% (work up to daily max)",
          "Drop back: 2-3×1 @ 85-90%"
        ],
        rest: "Rest 3-4 min between sets"
      }
    },
    
    // Accessory finisher options
    accessories: [
      {
        name: "Option 1: Explosive Power",
        exercises: [
          "Box Jumps - 4×5 @ bodyweight",
          "Power Shrugs - 3×6 @ 100-110%",
          "Broad Jumps - 3×5"
        ]
      },
      {
        name: "Option 2: Pull Strength",
        exercises: [
          "Deficit Deadlifts - 4×5 @ 80-85%",
          "Bent-Over Rows - 3×8",
          "Face Pulls - 3×15"
        ]
      },
      {
        name: "Option 3: Front Squat Focus",
        exercises: [
          "Front Squats - 4×4 @ 75-80%",
          "Bulgarian Split Squats - 3×8/leg",
          "Weighted Planks - 3×45 sec"
        ]
      },
      {
        name: "Option 4: Athletic Conditioning",
        exercises: [
          "Dumbbell Power Cleans - 3×10 @ moderate",
          "Kettlebell Swings - 3×20",
          "Medicine Ball Slams - 3×15"
        ]
      },
      {
        name: "Option 5: Core & Stability",
        exercises: [
          "Overhead Squats - 3×5 @ 60%",
          "Single-Leg RDLs - 3×8/leg",
          "Anti-Rotation Press - 3×10/side"
        ]
      }
    ]
  }
  
};

/**
 * HOW IT WORKS:
 * -------------
 * When you add this to workout-data.js, the app automatically:
 * 
 * 1. Creates a "Power Clean" button in the Lift Type section
 * 2. Generates 2 complex buttons for each intensity level (6 total)
 * 3. Creates 5 accessory buttons
 * 4. Shows the specific warmup when Power Clean is selected
 * 5. Updates all workout sections with Power Clean data
 * 
 * The UI is 100% data-driven - no code changes needed!
 */

/**
 * CUSTOMIZATION IDEAS:
 * --------------------
 * 
 * 1. Add specialized variations:
 *    - Hang Clean
 *    - Power Snatch
 *    - Push Press
 *    - Split Jerk (as separate lift)
 * 
 * 2. Add sport-specific programs:
 *    - CrossFit focused
 *    - Weightlifting competition prep
 *    - General strength & conditioning
 * 
 * 3. Add periodization levels:
 *    - Accumulation phase
 *    - Intensification phase
 *    - Realization phase
 *    - Deload week
 * 
 * 4. Add athlete-specific templates:
 *    - Beginner (technique focus)
 *    - Intermediate (volume & load)
 *    - Advanced (max strength & power)
 */
