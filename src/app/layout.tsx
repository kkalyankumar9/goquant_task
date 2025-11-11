import { AppStateProvider } from '@/context/AppStateProvider';
import './globals.css';


export const metadata = { title: 'Latency Topology Visualizer' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
