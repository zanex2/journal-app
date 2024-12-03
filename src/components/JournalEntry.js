'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function JournalEntry({ icon, title, value, onChange }) {
  return (
    <Card className="bg-white/90">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-purple-700">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-purple-200 focus:border-purple-400"
        />
      </CardContent>
    </Card>
  )
}