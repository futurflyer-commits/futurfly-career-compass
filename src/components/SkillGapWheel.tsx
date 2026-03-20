import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  level: number;
}

interface ClusterData {
  name: string;
  score: number;
  skills: SkillItem[];
  gap: number;
}

interface SkillGapWheelProps {
  data: ClusterData[];
  showRoleOverlay: boolean;
  onClusterClick: (cluster: ClusterData) => void;
}

export const SkillGapWheel = ({ data, showRoleOverlay, onClusterClick }: SkillGapWheelProps) => {
  const [activeHover, setActiveHover] = useState<ClusterData | null>(null);

  // Format data for Recharts Radar
  const chartData = useMemo(() => {
    return data.map(d => ({
      ...d,
      subject: d.name,
      // Radar uses current score
      currentScore: d.score,
      // if overlay is on, target score is score + gap. Limit max to 10.
      targetScore: showRoleOverlay ? Math.min(10, d.score + d.gap) : null,
      fullMark: 10
    }));
  }, [data, showRoleOverlay]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: ClusterData = payload[0].payload;
      return (
        <div className="bg-background/95 border border-border/50 backdrop-blur-xl p-3 rounded-xl max-w-[220px] shadow-2xl">
          <p className="font-display font-bold text-sm text-foreground mb-1">{data.name}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-bold text-aqua">{data.score.toFixed(1)}</span>
            <span className="text-[10px] uppercase text-muted-foreground tracking-widest">/ 10</span>
          </div>
          {showRoleOverlay && data.gap > 0 && (
            <p className="text-[10px] text-primary mb-2 font-medium">Gap: -{data.gap.toFixed(1)} points</p>
          )}
          <div className="mt-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-bold">Top Skills</p>
            <div className="flex flex-wrap gap-1">
              {(data.skills || []).slice(0, 3).map((s, i) => (
                <span key={i} className="text-[10px] bg-muted/50 text-foreground px-1.5 py-0.5 rounded">
                  {s.name}
                </span>
              ))}
              {data.skills && data.skills.length > 3 && (
                <span className="text-[10px] text-muted-foreground px-1 py-0.5">+{data.skills.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
        <div className="w-16 h-16 border-4 border-aqua/20 border-t-aqua rounded-full animate-spin mb-4" />
        <p className="font-display tracking-widest uppercase text-sm">Loading telemetry...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative" style={{ minHeight: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="hsl(var(--border) / 0.5)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 600, letterSpacing: "1px" }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          
          <Tooltip content={<CustomTooltip />} cursor={false} />

          {/* User Skills Layer (Polygon) */}
          <Radar
            name="Current Expertise"
            dataKey="currentScore"
            stroke="hsl(var(--aqua))"
            strokeWidth={3}
            fill="hsl(var(--aqua))"
            fillOpacity={0.25}
            activeDot={{ r: 6, fill: "hsl(var(--aqua))", strokeWidth: 0 }}
            dot={{ r: 4, fill: "hsl(var(--background))", stroke: "hsl(var(--aqua))", strokeWidth: 2 }}
          />

          {/* Role Requirements Layer (Dotted Outline) */}
          {showRoleOverlay && (
            <Radar
              name="Target Role"
              dataKey="targetScore"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="transparent"
              dot={{ r: 3, fill: "hsl(var(--background))", stroke: "hsl(var(--primary))", strokeWidth: 2 }}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
