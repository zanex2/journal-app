'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const MOOD_LEVELS = {
  'Very Happy': 5,
  'Happy': 4,
  'Neutral': 3,
  'Sad': 2,
  'Very Sad': 1
}

export default function MoodEntry({ icon, title, value, onChange }) {
  return (
    <Card className="bg-white/90">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-purple-700">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="border-purple-200 focus:border-purple-400">
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
  )
}