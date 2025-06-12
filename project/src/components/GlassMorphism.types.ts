export interface GlassOptions {
  intensity?: number;
  borderRadius?: string;
  depth?: number;
  className?: string;
  hoverEffect?: boolean;
}

export interface GlassMorphismProps extends GlassOptions {
  children: React.ReactNode;
}