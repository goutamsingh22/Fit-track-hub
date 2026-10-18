import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Clock,
  Flame,
  Dumbbell,
  Home,
  Building,
  Search,
  Filter,
  Play,
  CheckCircle,
} from 'lucide-react';
import { workouts, type Workout } from '@/data/mockData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLocation } from 'react-router-dom';

const categories = ['all', 'home', 'gym'];
const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

const WorkoutCard = ({ workout, index }: { workout: Workout; index: number }) => {
  const [completed, setCompleted] = useState(false);
  
  const difficultyColors = {
    beginner: 'bg-green-500/20 text-green-500',
    intermediate: 'bg-yellow-500/20 text-yellow-500',
    advanced: 'bg-red-500/20 text-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[workout.difficulty]}`}>
            {workout.difficulty}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground flex items-center gap-1">
            {workout.category === 'home' ? <Home className="w-3 h-3" /> : <Building className="w-3 h-3" />}
            {workout.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{workout.name}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-4 h-4" />
            {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Dumbbell className="w-4 h-4" />
            {workout.exercises.length} exercises
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={completed ? "success" : "default"} 
            className="flex-1"
            onClick={() => setCompleted(!completed)}
          >
            {completed ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Completed
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Workout
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Workouts = () => {
  const location = useLocation();
  const isInDashboard = location.pathname.startsWith('/dashboard') || 
    ['/workouts', '/exercises', '/diet', '/progress', '/profile'].includes(location.pathname);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || workout.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || workout.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
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
          Workout <span className="text-gradient">Plans</span>
        </h1>
        <p className="text-muted-foreground">
          Choose from our curated workout plans to match your fitness level
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="glass-card p-4"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Workouts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout, index) => (
          <WorkoutCard key={workout.id} workout={workout} index={index} />
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">No workouts found</p>
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

export default Workouts;
