import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import {
  Apple,
  Droplets,
  Flame,
  Beef,
  Wheat,
  Droplet,
  Leaf,
} from 'lucide-react';
import { meals, type Meal } from '@/data/mockData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLocation } from 'react-router-dom';

const mealTypes = ['all', 'breakfast', 'lunch', 'dinner', 'snack'];
const dietTypes = ['all', 'veg', 'non-veg'];

const MealCard = ({ meal, index }: { meal: Meal; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              meal.type === 'breakfast' ? 'bg-orange-500/20 text-orange-500' :
              meal.type === 'lunch' ? 'bg-blue-500/20 text-blue-500' :
              meal.type === 'dinner' ? 'bg-purple-500/20 text-purple-500' :
              'bg-green-500/20 text-green-500'
            }`}>
              {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
            </span>
            {meal.isVeg && (
              <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success flex items-center gap-1">
                <Leaf className="w-3 h-3" />
                Veg
              </span>
            )}
          </div>
          <h3 className="font-semibold text-lg">{meal.name}</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gradient">{meal.calories}</div>
          <div className="text-xs text-muted-foreground">kcal</div>
        </div>
      </div>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-2 rounded-lg bg-secondary">
          <Beef className="w-4 h-4 mx-auto mb-1 text-red-400" />
          <div className="text-sm font-semibold">{meal.protein}g</div>
          <div className="text-xs text-muted-foreground">Protein</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-secondary">
          <Wheat className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
          <div className="text-sm font-semibold">{meal.carbs}g</div>
          <div className="text-xs text-muted-foreground">Carbs</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-secondary">
          <Droplet className="w-4 h-4 mx-auto mb-1 text-blue-400" />
          <div className="text-sm font-semibold">{meal.fat}g</div>
          <div className="text-xs text-muted-foreground">Fat</div>
        </div>
      </div>

      {/* Items */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">Includes:</p>
        <div className="flex flex-wrap gap-1">
          {meal.items.map((item, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Diet = () => {
  const location = useLocation();
  const isInDashboard = ['/workouts', '/exercises', '/diet', '/progress', '/profile', '/dashboard'].includes(location.pathname);
  
  const [selectedMealType, setSelectedMealType] = useState('all');
  const [selectedDietType, setSelectedDietType] = useState('all');
  const [waterIntake, setWaterIntake] = useState(6);
  const waterGoal = 8;

  const filteredMeals = meals.filter((meal) => {
    const matchesMealType = selectedMealType === 'all' || meal.type === selectedMealType;
    const matchesDietType = selectedDietType === 'all' || 
      (selectedDietType === 'veg' && meal.isVeg) ||
      (selectedDietType === 'non-veg' && !meal.isVeg);
    return matchesMealType && matchesDietType;
  });

  const content = (
    <div className="space-y-8 pb-20 lg:pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          Diet & <span className="text-gradient">Nutrition</span>
        </h1>
        <p className="text-muted-foreground">
          Healthy meal ideas to fuel your fitness journey
        </p>
      </motion.div>

      {/* Water Intake Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Droplets className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold">Water Intake</h3>
              <p className="text-sm text-muted-foreground">Stay hydrated throughout the day</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{waterIntake}/{waterGoal}</div>
            <div className="text-xs text-muted-foreground">glasses</div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {Array.from({ length: waterGoal }).map((_, i) => (
            <button
              key={i}
              onClick={() => setWaterIntake(i + 1)}
              className={`flex-1 h-16 rounded-lg transition-all ${
                i < waterIntake
                  ? 'bg-blue-500/30 border border-blue-500/50'
                  : 'bg-secondary border border-border hover:border-blue-500/30'
              }`}
            >
              <Droplets className={`w-5 h-5 mx-auto ${
                i < waterIntake ? 'text-blue-500' : 'text-muted-foreground'
              }`} />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-wrap gap-4"
      >
        <div className="flex gap-2">
          {mealTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedMealType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedMealType === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {dietTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedDietType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedDietType === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {type === 'veg' ? '🥗 Veg' : type === 'non-veg' ? '🍗 Non-veg' : 'All'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Daily Calories Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Flame className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Daily Calorie Target</h3>
            <p className="text-sm text-muted-foreground">Based on your goal to gain muscle</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gradient">2,400</div>
            <div className="text-xs text-muted-foreground">Total kcal</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">150g</div>
            <div className="text-xs text-muted-foreground">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">280g</div>
            <div className="text-xs text-muted-foreground">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">70g</div>
            <div className="text-xs text-muted-foreground">Fat</div>
          </div>
        </div>
      </motion.div>

      {/* Meals Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.map((meal, index) => (
          <MealCard key={meal.id} meal={meal} index={index} />
        ))}
      </div>

      {filteredMeals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Apple className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">No meals found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
        </motion.div>
      )}
    </div>
  );

  if (isInDashboard) {
    return <DashboardLayout>{content}</DashboardLayout>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 container px-4">
        {content}
      </div>
      <Footer />
    </div>
  );
};

export default Diet;
