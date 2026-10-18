import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import {
  Flame,
  Droplets,
  Footprints,
  Timer,
  Dumbbell,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { dailyStats, weeklyProgress, currentUser } from '@/data/mockData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const statCards = [
  {
    icon: Flame,
    label: 'Calories Burned',
    value: dailyStats.caloriesBurned,
    goal: dailyStats.caloriesGoal,
    unit: 'kcal',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Droplets,
    label: 'Water Intake',
    value: dailyStats.waterIntake,
    goal: dailyStats.waterGoal,
    unit: 'glasses',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Footprints,
    label: 'Steps',
    value: dailyStats.stepsCount,
    goal: dailyStats.stepsGoal,
    unit: 'steps',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Timer,
    label: 'Active Time',
    value: dailyStats.activeMinutes,
    goal: 60,
    unit: 'min',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

const Dashboard = () => {
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
            Welcome back, <span className="text-gradient">{currentUser.name.split(' ')[0]}</span>
          </h1>
          <p className="text-muted-foreground">
            Here's your fitness summary for today
          </p>
        </motion.div>

        {/* Streak Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="glass-card p-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Zap className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold">{currentUser.streak} days</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Keep it going!</p>
            <p className="text-primary font-semibold">🔥 On fire!</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const progress = (stat.value / stat.goal) * 100;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="stat-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="mb-3">
                  <span className="text-2xl font-bold">{stat.value.toLocaleString()}</span>
                  <span className="text-muted-foreground text-sm ml-1">/ {stat.goal.toLocaleString()} {stat.unit}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Weekly Activity</h3>
                <p className="text-sm text-muted-foreground">Calories burned this week</p>
              </div>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyProgress}>
                  <defs>
                    <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(82, 85%, 55%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(82, 85%, 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
                  <XAxis dataKey="day" stroke="hsl(220, 10%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(220, 18%, 10%)',
                      border: '1px solid hsl(220, 15%, 18%)',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="calories"
                    stroke="hsl(82, 85%, 55%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCalories)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Today's Workouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Today's Workouts</h3>
                <p className="text-sm text-muted-foreground">
                  {dailyStats.workoutsCompleted} of {dailyStats.workoutsPlanned} completed
                </p>
              </div>
              <Dumbbell className="w-5 h-5 text-primary" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-success/10 border border-success/20">
                <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-success" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Upper Body Power</p>
                  <p className="text-sm text-muted-foreground">45 min • 350 kcal</p>
                </div>
                <span className="badge-success text-xs px-2 py-1 rounded-full">Completed</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary border border-border">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Core Crusher</p>
                  <p className="text-sm text-muted-foreground">20 min • 180 kcal</p>
                </div>
                <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">Pending</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
