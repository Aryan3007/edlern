"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface CommunityGrowthChartProps {
    data: number[]
}

export function CommunityGrowthChart({ data }: CommunityGrowthChartProps) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const chartData = months.map((month, index) => ({
        name: month,
        Members: data[index] || 0,
    }))

    return (
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
                <defs>
                    <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(88, 50%, 53%)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(88, 50%, 53%)" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="Members"
                    stroke="hsl(88, 50%, 53%)"
                    fillOpacity={1}
                    fill="url(#colorMembers)"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}
