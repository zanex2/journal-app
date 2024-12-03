import './globals.css'

export const metadata = {
  title: 'Daily Journal App',
  description: 'Track your daily moods and activities',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}