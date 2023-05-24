import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import '@/styles/globals.css'


export const metadata = {
  title: 'Prompt Solution | Home Page',
  description: 'Discover & Share AI Prompts, Created by Vickon Cyril',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased font-inter">
      <div className="main">
        <div className="gradient"></div>
      </div>

      <Provider>
        <main className='relative z-10 max-w-7xl mx-auto sm:px-6 px-3'>
          <Nav />
          {children}
        </main>
      </Provider>

        </body>
    </html>
  );
}
