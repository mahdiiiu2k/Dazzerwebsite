import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl p-6 transition-all duration-300",
        hover && "hover-glow hover:scale-105",
        className
      )}
    >
      {children}
    </div>
  );
}
