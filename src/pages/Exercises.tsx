import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Info,
} from 'lucide-react';
import { exercises, muscleGroups, equipmentTypes, type Exercise } from '@/data/mockData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLocation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ExerciseCard = ({ exercise, index }: { exercise: Exercise; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="glass-card overflow-hidden group"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold mb-2">{exercise.name}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
            {exercise.muscleGroup}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
            {exercise.equipment}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          {exercise.sets && exercise.reps && (
            <span>{exercise.sets} sets × {exercise.reps} reps</span>
          )}
          {exercise.duration && (
            <span>{exercise.duration}s hold</span>
          )}
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <Info className="w-4 h-4 mr-2" />
              View Instructions
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{exercise.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={exercise.image}
                alt={exercise.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {exercise.muscleGroup}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                  {exercise.equipment}
                </span>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Instructions</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {exercise.instructions.map((instruction, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary font-semibold">{i + 1}.</span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

const Exercises = () => {
  const location = useLocation();
  const isInDashboard = ['/workouts', '/exercises', '/diet', '/progress', '/profile', '/dashboard'].includes(location.pathname);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'All' || exercise.muscleGroup === selectedMuscle;
    const matchesEquipment = selectedEquipment === 'All' || exercise.equipment === selectedEquipment;
    return matchesSearch && matchesMuscle && matchesEquipment;
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
          Exercise <span className="text-gradient">Library</span>
        </h1>
        <p className="text-muted-foreground">
          Browse our complete collection of exercises with detailed instructions
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="glass-card p-4 space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Muscle Group Filter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Muscle Group</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {muscleGroups.map((muscle) => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedMuscle === muscle
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Filter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Equipment</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {equipmentTypes.map((equip) => (
              <button
                key={equip}
                onClick={() => setSelectedEquipment(equip)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedEquipment === equip
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {equip}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Exercises Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredExercises.map((exercise, index) => (
          <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">No exercises found</p>
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

export default Exercises;
