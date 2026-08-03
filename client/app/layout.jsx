/* 
 * Project: PetroFlex
 * File: client/app/layout.jsx
 * Setup: Root layout with Tailwind base styles & global providers.
 */
import './globals.css';

export const metadata = {
  title: 'PetroFlex | Fuel Distribution Dashboard',
  description: 'Modern PetroFlex',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
