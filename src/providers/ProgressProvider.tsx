import { ProgressContext, useProgressProvider } from '@/hooks/useProgress';

export default function ProgressProvider({ children }: { children: React.ReactNode }) {
  const progress = useProgressProvider();
  return <ProgressContext.Provider value={progress}>{children}</ProgressContext.Provider>;
}
