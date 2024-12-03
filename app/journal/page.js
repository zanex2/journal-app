'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flower, Sun, Heart, Coffee, Book, Moon, ChevronLeft, ChevronRight, BarChart, LogOut } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const setTheme = (isDark) => {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(isDark ? 'dark' : 'light');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const getInitialTheme = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') === 'dark';
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

const MOOD_LEVELS = {
  'Very Happy': 5,
  'Happy': 4,
  'Neutral': 3,
  'Sad': 2,
  'Very Sad': 1
};

const JournalApp = () => {
  const [screen, setScreen] = useState('welcome');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [entries, setEntries] = useState({});
  const [showMoodChart, setShowMoodChart] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('journalUserName');
    const savedAge = localStorage.getItem('journalUserAge');
    const savedTheme = localStorage.getItem('journalTheme');
    
    if (savedName && savedAge) {
      setName(savedName);
      setAge(savedAge);
      setScreen('journal');
    }

    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('journalTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('journalTheme', 'light');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('journalUserName');
    localStorage.removeItem('journalUserAge');
    localStorage.removeItem('journalEntries');
    
    setName('');
    setAge('');
    setEntries({});
    setScreen('welcome');
  };

  const saveEntry = (field, value) => {
    setEntries(prev => ({
      ...prev,
      [selectedDate]: {
        ...(prev[selectedDate] || {}),
        [field]: value
      }
    }));
  };

  const handleDateChange = (days) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + days);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMoodChartData = () => {
    const sortedDates = Object.keys(entries).sort();
    return sortedDates.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: MOOD_LEVELS[entries[date]?.mood] || 0
    })).slice(-14);
  };

  if (screen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 dark:from-purple-950 dark:to-gray-900 p-6 transition-colors duration-200">
        <Card className="max-w-md mx-auto mt-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardHeader>
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="bg-white dark:bg-gray-700"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
            <CardTitle className="text-2xl text-center text-purple-800 dark:text-purple-300">
              Welcome to Your Daily Journal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  What&apos;s your name?
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-purple-200 focus:border-purple-400 dark:border-purple-700 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  How old are you?
                </label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="border-purple-200 focus:border-purple-400 dark:border-purple-700 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your age"
                />
              </div>
              <Button 
                onClick={() => {
                  if (name && age) {
                    localStorage.setItem('journalUserName', name);
                    localStorage.setItem('journalUserAge', age);
                    setScreen('journal');
                  }
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800"
              >
                Start Journaling
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 dark:from-purple-950 dark:to-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl text-purple-800 dark:text-purple-300 flex items-center gap-2">
                <Flower className="w-6 h-6 text-pink-500" />
                Hello, {name}!
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowMoodChart(!showMoodChart)}
                  className="bg-white dark:bg-gray-700"
                >
                  <BarChart className="w-4 h-4 mr-2" />
                  {showMoodChart ? 'Hide Mood Chart' : 'Show Mood Chart'}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="bg-white dark:bg-gray-700"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="bg-white dark:bg-gray-700 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDateChange(-1)}
                className="bg-white dark:bg-gray-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                {formatDate(selectedDate)}
              </h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDateChange(1)}
                className="bg-white dark:bg-gray-700"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {showMoodChart && (
              <Card className="bg-white/90 dark:bg-gray-700/90 p-4">
                <CardTitle className="text-lg mb-4 text-purple-700 dark:text-purple-300">
                  Mood Tracking (Last 14 Days)
                </CardTitle>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getMoodChartData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                      <XAxis 
                        dataKey="date" 
                        stroke={isDarkMode ? "#9CA3AF" : "#4B5563"}
                      />
                      <YAxis
                        domain={[0, 5]}
                        ticks={[1, 2, 3, 4, 5]}
                        tickFormatter={(value) => 
                          Object.keys(MOOD_LEVELS).find(key => MOOD_LEVELS[key] === value) || ''
                        }
                        stroke={isDarkMode ? "#9CA3AF" : "#4B5563"}
                      />
                      <Tooltip 
                        formatter={(value) => 
                          Object.keys(MOOD_LEVELS).find(key => MOOD_LEVELS[key] === value) || 'No mood recorded'
                        }
                        contentStyle={{
                          backgroundColor: isDarkMode ? '#1F2937' : 'white',
                          border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                          color: isDarkMode ? 'white' : 'black'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ fill: '#8b5cf6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MoodEntry 
                icon={<Sun className="w-5 h-5 text-yellow-500" />} 
                title="How are you feeling today?"
                value={(entries[selectedDate]?.mood || '')}
                onChange={(value) => saveEntry('mood', value)}
                isDarkMode={isDarkMode}
              />
              <JournalEntry 
                icon={<Heart className="w-5 h-5 text-pink-500" />} 
                title="What are you grateful for?"
                value={(entries[selectedDate]?.gratitude || '')}
                onChange={(value) => saveEntry('gratitude', value)}
                isDarkMode={isDarkMode}
              />
              <JournalEntry 
                icon={<Moon className="w-5 h-5 text-blue-500" />} 
                title="How did you sleep?"
                value={(entries[selectedDate]?.sleep || '')}
                onChange={(value) => saveEntry('sleep', value)}
                isDarkMode={isDarkMode}
              />
              <JournalEntry 
                icon={<Coffee className="w-5 h-5 text-brown-500" />} 
                title="Glasses of water today?"
                value={(entries[selectedDate]?.water || '')}
                onChange={(value) => saveEntry('water', value)}
                isDarkMode={isDarkMode}
              />
              <JournalEntry 
                icon={<Book className="w-5 h-5 text-green-500" />} 
                title="Today's main goal"
                value={(entries[selectedDate]?.goal || '')}
                onChange={(value) => saveEntry('goal', value)}
                isDarkMode={isDarkMode}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const MoodEntry = ({ icon, title, value, onChange, isDarkMode }) => {
  return (
    <Card className="bg-white/90 dark:bg-gray-700/90">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-purple-700 dark:text-purple-300">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="border-purple-200 focus:border-purple-400 dark:border-purple-700 dark:bg-gray-600 dark:text-white">
            <SelectValue placeholder="Select your mood" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(MOOD_LEVELS).map((mood) => (
              <SelectItem key={mood} value={mood}>
                {mood}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

const JournalEntry = ({ icon, title, value, onChange, isDarkMode }) => {
  return (
    <Card className="bg-white/90 dark:bg-gray-700/90">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-purple-700 dark:text-purple-300">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-purple-200 focus:border-purple-400 dark:border-purple-700 dark:bg-gray-600 dark:text-white"
        />
      </CardContent>
    </Card>
  );
};

export default JournalApp;