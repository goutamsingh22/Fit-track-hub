import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Scale,
  Dumbbell,
  Trophy,
  Calendar,
  Target,
} from 'lucide-react';
import { weightHistory, achievements, workouts } from '@/data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const workoutHistory = [
  { week: 'Week 1', count: 4 },
  { week: 'Week 2', count: 5 },
  { week: 'Week 3', count: 3 },
  { week: 'Week 4', count: 6 },
  { week: 'Week 5', count: 5 },
  { week: 'Week 6', count: 4 },
  { week: 'Week 7', count: 5 },
];

const Progress = () => {
  const startWeight = weightHistory[0].weight;
  const currentWeight = weightHistory[weightHistory.length - 1].weight;
  const weightChange = startWeight - currentWeight;
  const isWeightLoss = weightChange > 0;

  const totalWorkouts = workoutHistory.reduce((sum, week) => sum + week.count, 0);
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20 lg:pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Your <span className="text-gradient">Progress</span>
          </h1>
          <p className="text-muted-foreground">
            Track your fitness journey over time
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="stat-card"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div className="text-2xl font-bold">{currentWeight} kg</div>
            <div className="flex items-center gap-1 text-sm">
              {isWeightLoss ? (
                <>
                  <TrendingDown className="w-4 h-4 text-success" />
                  <span className="text-success">-{weightChange.toFixed(1)} kg</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 text-red-500" />
                  <span className="text-red-500">+{Math.abs(weightChange).toFixed(1)} kg</span>
                </>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="stat-card"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold">{totalWorkouts}</div>
            <div className="text-sm text-muted-foreground">Total Workouts</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="stat-card"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
            <div className="text-2xl font-bold">{unlockedAchievements}/{achievements.length}</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="stat-card"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <div className="text-2xl font-bold">7</div>
            <div className="text-sm text-muted-foreground">Weeks Active</div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weight Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Weight Progress</h3>
                <p className="text-sm text-muted-foreground">Your weight over time</p>
              </div>
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
                  <XAxis dataKey="date" stroke="hsl(220, 10%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(220, 18%, 10%)',
                      border: '1px solid hsl(220, 15%, 18%)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="hsl(82, 85%, 55%)"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(82, 85%, 55%)', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: 'hsl(82, 85%, 55%)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Workout Frequency Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Workout Frequency</h3>
                <p className="text-sm text-muted-foreground">Workouts per week</p>
              </div>
              <Dumbbell className="w-5 h-5 text-primary" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workoutHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
                  <XAxis dataKey="week" stroke="hsl(220, 10%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(220, 18%, 10%)',
                      border: '1px solid hsl(220, 15%, 18%)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(82, 85%, 55%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Achievements</h3>
              <p className="text-sm text-muted-foreground">Your fitness milestones</p>
            </div>
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                className={`p-4 rounded-xl border ${
                  achievement.unlocked
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-secondary border-border opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-semibold">{achievement.name}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.unlocked && achievement.unlockedDate && (
                      <p className="text-xs text-primary mt-1">
                        Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Progress;
