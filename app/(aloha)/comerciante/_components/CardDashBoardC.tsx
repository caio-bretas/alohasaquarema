"use client"

import { Eye, MousePointerClick, Heart, TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Dados fictícios para o gráfico
const chartData = [
  { day: "Segunda", views: 400, clicks: 240 },
  { day: "Terça", views: 300, clicks: 139 },
  { day: "Quarta", views: 520, clicks: 380 },
  { day: "Quinta", views: 480, clicks: 390 },
  { day: "Sexta", views: 700, clicks: 480 },
  { day: "Sábado", views: 850, clicks: 520 },
  { day: "Domingo", views: 900, clicks: 600 },
];

// Configuração de cores e labels do gráfico
const chartConfig = {
  views: {
    label: "Visualizações",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "Cliques",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CardDashBoardC() {
  const stats = [
    { title: "Visualizações", value: "12,497", icon: Eye, color: "text-blue-600", bgColor: "bg-blue-100/50", change: "+15.2%", type: "up" },
    { title: "Cliques", value: "1,832", icon: MousePointerClick, color: "text-emerald-600", bgColor: "bg-emerald-100/50", change: "+8.1%", type: "up" },
    { title: "Favoritos", value: "450", icon: Heart, color: "text-red-600", bgColor: "bg-red-100/50", change: "-2.5%", type: "down" },
  ];

  return (
    <div className="space-y-6">
      {/* Grid de Stats Superiores */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i} className="border-zinc-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-zinc-500">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 font-medium ${stat.type === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.change} <span className="text-zinc-400 font-normal ml-1">vs. mês passado</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico de Desempenho */}
      <Card className="border-zinc-200 shadow-sm">
        <CardHeader className="flex flex-col items-start space-y-1 pb-6">
          <CardTitle className="text-lg font-bold">Desempenho Semanal</CardTitle>
          <CardDescription>
            Visualizações vs Cliques nos últimos 7 dias
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer config={chartConfig} className="aspect-[12/9] h-[300px] w-full">
            <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
              <defs>
                <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-views)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-views)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-clicks)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-clicks)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-zinc-200" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="clicks"
                type="natural"
                fill="url(#fillClicks)"
                stroke="var(--color-clicks)"
                stackId="a"
                strokeWidth={2}
              />
              <Area
                dataKey="views"
                type="natural"
                fill="url(#fillViews)"
                stroke="var(--color-views)"
                stackId="a"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm border-t border-zinc-100 pt-4">
          <div className="flex gap-2 font-medium leading-none">
            Crescimento de 5.2% esta semana <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="leading-none text-muted-foreground italic">
            Mostrando dados em tempo real com base no tráfego da loja.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}