"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface CommunityStatsChartProps {
    posts: number[]
    newMembers: number[]
}

export function CommunityStatsChart({ posts, newMembers }: CommunityStatsChartProps) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const data = months.map((month, index) => ({
        name: month,
        Posts: posts[index] || 0,
        "New Members": newMembers[index] || 0,
    }))

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
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
                <Legend />
                <Bar dataKey="Posts" fill="#75c900" radius={[4, 4, 0, 0]} /> {/* Changed color to green */}
                <Bar dataKey="New Members" fill="#497d00" radius={[4, 4, 0, 0]} /> {/* Changed color to blue */}
            </BarChart>
        </ResponsiveContainer>
    )
}
