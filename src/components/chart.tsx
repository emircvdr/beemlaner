import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const chartData = [
    { date: "2024-01-01", tasks: 87, completedTasks: 52, pendingTasks: 35 },
    { date: "2024-01-02", tasks: 135, completedTasks: 98, pendingTasks: 37 },
    { date: "2024-01-03", tasks: 112, completedTasks: 67, pendingTasks: 45 },
    { date: "2024-01-04", tasks: 94, completedTasks: 31, pendingTasks: 63 },
    { date: "2024-01-05", tasks: 142, completedTasks: 93, pendingTasks: 49 },
    { date: "2024-01-06", tasks: 76, completedTasks: 41, pendingTasks: 35 },
    { date: "2024-01-07", tasks: 117, completedTasks: 83, pendingTasks: 34 },
    { date: "2024-01-08", tasks: 129, completedTasks: 105, pendingTasks: 24 },
    { date: "2024-01-09", tasks: 162, completedTasks: 91, pendingTasks: 71 },
    { date: "2024-01-10", tasks: 104, completedTasks: 55, pendingTasks: 49 },
    { date: "2024-01-11", tasks: 86, completedTasks: 60, pendingTasks: 26 },
    { date: "2024-01-12", tasks: 123, completedTasks: 79, pendingTasks: 44 },
    { date: "2024-01-13", tasks: 97, completedTasks: 46, pendingTasks: 51 },
    { date: "2024-01-14", tasks: 148, completedTasks: 87, pendingTasks: 61 },
    { date: "2024-01-15", tasks: 108, completedTasks: 72, pendingTasks: 36 },
    { date: "2024-01-16", tasks: 131, completedTasks: 94, pendingTasks: 37 },

    { date: "2025-01-01", tasks: 156, completedTasks: 105, pendingTasks: 51 },
    { date: "2025-01-02", tasks: 143, completedTasks: 89, pendingTasks: 54 },
    { date: "2025-01-03", tasks: 127, completedTasks: 72, pendingTasks: 55 },
    { date: "2025-01-04", tasks: 175, completedTasks: 131, pendingTasks: 44 },
    { date: "2025-01-05", tasks: 162, completedTasks: 115, pendingTasks: 47 },
    { date: "2025-01-06", tasks: 138, completedTasks: 83, pendingTasks: 55 },
    { date: "2025-01-07", tasks: 147, completedTasks: 96, pendingTasks: 51 },
    { date: "2025-01-08", tasks: 159, completedTasks: 124, pendingTasks: 35 },
    { date: "2025-03-13", tasks: 158, completedTasks: 92, pendingTasks: 66 },
    { date: "2025-03-14", tasks: 173, completedTasks: 125, pendingTasks: 48 },
    { date: "2025-03-15", tasks: 167, completedTasks: 118, pendingTasks: 49 },
    { date: "2025-03-16", tasks: 179, completedTasks: 126, pendingTasks: 53 },
    { date: "2025-04-16", tasks: 179, completedTasks: 126, pendingTasks: 53 },
    { date: "2025-05-16", tasks: 179, completedTasks: 126, pendingTasks: 53 },
]

const chartConfig = {
    tasks: {
        label: "Tasks",
    },
    completedTasks: {
        label: "Completed Tasks",
        color: "var(--chart-4)",
    },
    pendingTasks: {
        label: "Pending Tasks",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function Chart() {
    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-01-01")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="bg-background mt-2">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>
                        This is your total tasks for the last 3 months
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillCompletedTasks" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--chart-4)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--chart-4)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillPendingTasks" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--chart-2)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--chart-2)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="pendingTasks"
                            type="natural"
                            fill="url(#fillPendingTasks)"
                            stroke="var(--chart-2)"
                            stackId="a"
                        />
                        <Area
                            dataKey="completedTasks"
                            type="natural"
                            fill="url(#fillCompletedTasks)"
                            stroke="var(--chart-4)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
