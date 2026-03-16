export interface TabProps {
  name: string;
  label: string;
  Icon: React.ComponentType<{ color?: string; width?: number; height?: number }>;
}