"use client"

import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface CommunityEngagementChartProps {
    data: number[]
}

export function CommunityEngagementChart({ data }: CommunityEngagementChartProps) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const chartData = months.map((month, index) => ({
        name: month,
        Engagement: data[index] || 0,
    }))

    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip
                    formatter={(value) => [`${value}%`, "Engagement"]}
                    contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="Engagement"
                    stroke="hsl(88, 50%, 53%)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
