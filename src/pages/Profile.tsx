import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  User,
  Camera,
  Scale,
  Ruler,
  Calendar,
  Target,
  Save,
} from 'lucide-react';
import { currentUser } from '@/data/mockData';

const fitnessGoals = [
  { value: 'lose_fat', label: 'Lose Fat', emoji: '🔥' },
  { value: 'gain_muscle', label: 'Gain Muscle', emoji: '💪' },
  { value: 'stay_fit', label: 'Stay Fit', emoji: '🏃' },
];

const Profile = () => {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [age, setAge] = useState(currentUser.age.toString());
  const [height, setHeight] = useState(currentUser.height.toString());
  const [weight, setWeight] = useState(currentUser.weight.toString());
  const [goal, setGoal] = useState<'lose_fat' | 'gain_muscle' | 'stay_fit'>(currentUser.goal);

  // Calculate BMI
  const heightInMeters = parseInt(height) / 100;
  const bmi = (parseInt(weight) / (heightInMeters * heightInMeters)).toFixed(1);
  
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-400' };
    if (bmi < 25) return { category: 'Normal', color: 'text-success' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-warning' };
    return { category: 'Obese', color: 'text-destructive' };
  };

  const bmiInfo = getBMICategory(parseFloat(bmi));

  const handleSave = () => {
    // Mock save functionality
    alert('Profile saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20 lg:pb-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Your <span className="text-gradient">Profile</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your personal information and fitness goals
          </p>
        </motion.div>

        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-muted-foreground">{email}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Member since {new Date(currentUser.joinedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* BMI Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Body Mass Index (BMI)</h3>
              <p className="text-sm text-muted-foreground">Based on your height and weight</p>
            </div>
            <Scale className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-gradient">{bmi}</span>
            <span className={`text-lg font-medium ${bmiInfo.color} mb-1`}>
              {bmiInfo.category}
            </span>
          </div>
          
          <div className="mt-4 h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full flex">
              <div className="w-[18.5%] bg-blue-400" />
              <div className="w-[25%] bg-success" />
              <div className="w-[25%] bg-warning" />
              <div className="flex-1 bg-destructive" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Underweight</span>
            <span>Normal</span>
            <span>Overweight</span>
            <span>Obese</span>
          </div>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-card p-6"
        >
          <h3 className="font-semibold mb-6">Personal Information</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fitness Goal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Fitness Goal</h3>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4">
            {fitnessGoals.map((g) => (
              <button
                key={g.value}
                onClick={() => setGoal(g.value as 'lose_fat' | 'gain_muscle' | 'stay_fit')}
                className={`p-4 rounded-xl border text-center transition-all ${
                  goal === g.value
                    ? 'bg-primary/10 border-primary'
                    : 'bg-secondary border-border hover:border-primary/50'
                }`}
              >
                <span className="text-3xl mb-2 block">{g.emoji}</span>
                <span className="font-medium">{g.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button size="lg" onClick={handleSave} className="w-full sm:w-auto">
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
