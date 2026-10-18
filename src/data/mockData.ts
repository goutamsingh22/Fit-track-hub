// Mock data for FitTrack application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  goal: 'lose_fat' | 'gain_muscle' | 'stay_fit';
  streak: number;
  joinedDate: string;
}

export interface DailyStats {
  caloriesBurned: number;
  caloriesGoal: number;
  waterIntake: number;
  waterGoal: number;
  workoutsCompleted: number;
  workoutsPlanned: number;
  stepsCount: number;
  stepsGoal: number;
  activeMinutes: number;
}

export interface Workout {
  id: string;
  name: string;
  category: 'home' | 'gym';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  calories: number;
  exercises: Exercise[];
  image: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  sets?: number;
  reps?: number;
  duration?: number; // in seconds
  instructions: string[];
  image: string;
}

export interface WeeklyProgress {
  day: string;
  calories: number;
  workouts: number;
  activeMinutes: number;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isVeg: boolean;
  items: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

// Current user mock data
export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  age: 28,
  height: 175,
  weight: 72,
  goal: 'gain_muscle',
  streak: 12,
  joinedDate: '2024-01-15',
};

// Daily stats
export const dailyStats: DailyStats = {
  caloriesBurned: 487,
  caloriesGoal: 600,
  waterIntake: 6,
  waterGoal: 8,
  workoutsCompleted: 1,
  workoutsPlanned: 2,
  stepsCount: 7842,
  stepsGoal: 10000,
  activeMinutes: 45,
};

// Weekly progress data
export const weeklyProgress: WeeklyProgress[] = [
  { day: 'Mon', calories: 520, workouts: 2, activeMinutes: 65 },
  { day: 'Tue', calories: 380, workouts: 1, activeMinutes: 40 },
  { day: 'Wed', calories: 610, workouts: 2, activeMinutes: 75 },
  { day: 'Thu', calories: 290, workouts: 1, activeMinutes: 30 },
  { day: 'Fri', calories: 487, workouts: 1, activeMinutes: 45 },
  { day: 'Sat', calories: 0, workouts: 0, activeMinutes: 0 },
  { day: 'Sun', calories: 0, workouts: 0, activeMinutes: 0 },
];

// Weight history for progress tracking
export const weightHistory = [
  { date: 'Week 1', weight: 75 },
  { date: 'Week 2', weight: 74.5 },
  { date: 'Week 3', weight: 74 },
  { date: 'Week 4', weight: 73.2 },
  { date: 'Week 5', weight: 72.8 },
  { date: 'Week 6', weight: 72.5 },
  { date: 'Week 7', weight: 72 },
];

// Exercise library
export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    muscleGroup: 'Chest',
    equipment: 'None',
    sets: 3,
    reps: 15,
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Lower your body until your chest nearly touches the floor',
      'Push yourself back up to the starting position',
      'Keep your core tight throughout the movement',
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
  },
  {
    id: '2',
    name: 'Squats',
    muscleGroup: 'Legs',
    equipment: 'None',
    sets: 4,
    reps: 12,
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting in a chair',
      'Keep your knees behind your toes',
      'Push through your heels to return to standing',
    ],
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
  },
  {
    id: '3',
    name: 'Plank',
    muscleGroup: 'Core',
    equipment: 'None',
    duration: 60,
    instructions: [
      'Start in a forearm plank position',
      'Keep your body in a straight line from head to heels',
      'Engage your core and glutes',
      'Hold the position for the specified duration',
    ],
    image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400',
  },
  {
    id: '4',
    name: 'Deadlift',
    muscleGroup: 'Back',
    equipment: 'Barbell',
    sets: 4,
    reps: 8,
    instructions: [
      'Stand with feet hip-width apart, barbell over mid-foot',
      'Bend at hips and knees to grip the bar',
      'Lift by driving through your heels and extending hips',
      'Lower the bar with control back to the floor',
    ],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
  },
  {
    id: '5',
    name: 'Pull-ups',
    muscleGroup: 'Back',
    equipment: 'Pull-up Bar',
    sets: 3,
    reps: 10,
    instructions: [
      'Hang from the bar with hands slightly wider than shoulders',
      'Pull yourself up until your chin is over the bar',
      'Lower yourself with control',
      'Avoid swinging or using momentum',
    ],
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400',
  },
  {
    id: '6',
    name: 'Lunges',
    muscleGroup: 'Legs',
    equipment: 'None',
    sets: 3,
    reps: 12,
    instructions: [
      'Stand tall with feet hip-width apart',
      'Step forward with one leg and lower your hips',
      'Both knees should bend at 90-degree angles',
      'Push back to starting position and repeat on other leg',
    ],
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400',
  },
  {
    id: '7',
    name: 'Bench Press',
    muscleGroup: 'Chest',
    equipment: 'Barbell',
    sets: 4,
    reps: 10,
    instructions: [
      'Lie on a flat bench with feet flat on the floor',
      'Grip the barbell slightly wider than shoulder-width',
      'Lower the bar to your chest with control',
      'Press the bar back up to the starting position',
    ],
    image: 'https://images.unsplash.com/photo-1534368959876-26bf04f2c947?w=400',
  },
  {
    id: '8',
    name: 'Shoulder Press',
    muscleGroup: 'Shoulders',
    equipment: 'Dumbbells',
    sets: 3,
    reps: 12,
    instructions: [
      'Stand or sit with dumbbells at shoulder height',
      'Press the weights overhead until arms are extended',
      'Lower the weights back to shoulder height',
      'Keep your core engaged throughout',
    ],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400',
  },
];

// Workout plans
export const workouts: Workout[] = [
  {
    id: '1',
    name: 'Full Body Burn',
    category: 'home',
    difficulty: 'beginner',
    duration: 30,
    calories: 250,
    exercises: exercises.slice(0, 4),
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
  },
  {
    id: '2',
    name: 'Upper Body Power',
    category: 'gym',
    difficulty: 'intermediate',
    duration: 45,
    calories: 350,
    exercises: [exercises[0], exercises[4], exercises[6], exercises[7]],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
  },
  {
    id: '3',
    name: 'Leg Day',
    category: 'gym',
    difficulty: 'advanced',
    duration: 50,
    calories: 400,
    exercises: [exercises[1], exercises[3], exercises[5]],
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
  },
  {
    id: '4',
    name: 'Core Crusher',
    category: 'home',
    difficulty: 'intermediate',
    duration: 20,
    calories: 180,
    exercises: [exercises[2]],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
  },
  {
    id: '5',
    name: 'Quick HIIT',
    category: 'home',
    difficulty: 'beginner',
    duration: 15,
    calories: 150,
    exercises: exercises.slice(0, 3),
    image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400',
  },
  {
    id: '6',
    name: 'Strength Builder',
    category: 'gym',
    difficulty: 'advanced',
    duration: 60,
    calories: 500,
    exercises: exercises,
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400',
  },
];

// Meal plans
export const meals: Meal[] = [
  {
    id: '1',
    name: 'Protein Power Breakfast',
    type: 'breakfast',
    calories: 450,
    protein: 35,
    carbs: 40,
    fat: 15,
    isVeg: false,
    items: ['Scrambled eggs (3)', 'Whole wheat toast', 'Avocado', 'Fresh berries'],
  },
  {
    id: '2',
    name: 'Veggie Omelette',
    type: 'breakfast',
    calories: 380,
    protein: 25,
    carbs: 20,
    fat: 22,
    isVeg: true,
    items: ['Eggs (3) with spinach', 'Mushrooms', 'Bell peppers', 'Cheese'],
  },
  {
    id: '3',
    name: 'Grilled Chicken Salad',
    type: 'lunch',
    calories: 520,
    protein: 45,
    carbs: 25,
    fat: 28,
    isVeg: false,
    items: ['Grilled chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Olive oil dressing'],
  },
  {
    id: '4',
    name: 'Quinoa Buddha Bowl',
    type: 'lunch',
    calories: 480,
    protein: 18,
    carbs: 65,
    fat: 16,
    isVeg: true,
    items: ['Quinoa', 'Roasted chickpeas', 'Sweet potato', 'Tahini dressing'],
  },
  {
    id: '5',
    name: 'Salmon with Veggies',
    type: 'dinner',
    calories: 580,
    protein: 42,
    carbs: 30,
    fat: 32,
    isVeg: false,
    items: ['Grilled salmon', 'Steamed broccoli', 'Brown rice', 'Lemon butter sauce'],
  },
  {
    id: '6',
    name: 'Tofu Stir Fry',
    type: 'dinner',
    calories: 420,
    protein: 22,
    carbs: 45,
    fat: 18,
    isVeg: true,
    items: ['Crispy tofu', 'Mixed vegetables', 'Brown rice', 'Soy ginger sauce'],
  },
  {
    id: '7',
    name: 'Greek Yogurt Parfait',
    type: 'snack',
    calories: 220,
    protein: 18,
    carbs: 28,
    fat: 6,
    isVeg: true,
    items: ['Greek yogurt', 'Granola', 'Honey', 'Fresh berries'],
  },
  {
    id: '8',
    name: 'Protein Smoothie',
    type: 'snack',
    calories: 280,
    protein: 25,
    carbs: 35,
    fat: 5,
    isVeg: true,
    items: ['Whey protein', 'Banana', 'Almond milk', 'Peanut butter'],
  },
];

// Achievements
export const achievements: Achievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first workout',
    icon: '🎯',
    unlocked: true,
    unlockedDate: '2024-01-16',
  },
  {
    id: '2',
    name: 'Week Warrior',
    description: 'Workout for 7 consecutive days',
    icon: '🔥',
    unlocked: true,
    unlockedDate: '2024-01-23',
  },
  {
    id: '3',
    name: 'Calorie Crusher',
    description: 'Burn 5,000 calories in total',
    icon: '💪',
    unlocked: true,
    unlockedDate: '2024-02-01',
  },
  {
    id: '4',
    name: 'Hydration Hero',
    description: 'Meet water goal for 14 days',
    icon: '💧',
    unlocked: false,
  },
  {
    id: '5',
    name: 'Iron Will',
    description: 'Complete 50 workouts',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: '6',
    name: 'Perfect Month',
    description: 'Achieve all daily goals for 30 days',
    icon: '⭐',
    unlocked: false,
  },
];

// Muscle groups for filtering
export const muscleGroups = [
  'All',
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs',
  'Core',
];

// Equipment types for filtering
export const equipmentTypes = [
  'All',
  'None',
  'Dumbbells',
  'Barbell',
  'Pull-up Bar',
  'Resistance Bands',
  'Kettlebell',
];
