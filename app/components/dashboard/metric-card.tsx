import { FolderOpen, AlertCircle, AlertTriangle, Clock, TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  FolderOpen,
  AlertCircle,
  AlertTriangle,
  Clock,
};

interface MetricCardProps {
  label: string;
  value: string;
  supportingText: string;
  icon: string;
  trend?: "up" | "down";
  trendLabel?: string;
  supportingTextColor?: string;
}

export default function MetricCard({
  label,
  value,
  supportingText,
  icon,
  trend,
  trendLabel,
  supportingTextColor = "text-foreground-tertiary",
}: MetricCardProps) {
  const Icon = iconMap[icon] || FolderOpen;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow duration-150">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-foreground-tertiary uppercase tracking-wide">
          {label}
        </span>
        <Icon className="w-4 h-4 text-foreground-muted" />
      </div>
      <div className="text-2xl font-semibold text-foreground mb-1">{value}</div>
      <div className={`text-xs ${supportingTextColor} flex items-center gap-1`}>
        {trend === "up" && <TrendingUp className="w-3 h-3" />}
        {trend === "down" && <TrendingDown className="w-3 h-3" />}
        {trend && <span className="font-medium">{trendLabel}</span>}
        <span>{supportingText}</span>
      </div>
    </div>
  );
}
