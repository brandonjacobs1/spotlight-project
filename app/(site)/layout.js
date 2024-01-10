// import { Inter } from 'next/font/google'
//import '../globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NavBar from "@/app/components/nav-bar";

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '16th Ward Spotlights',
  description: 'A webapp to manage spotlights',
}
 export default function RootLayout(props) {
    const { children } = props;
    return (
        <html lang="en">
            <body>
            <NavBar></NavBar>
            {children}
            </body>
        </html>
    )
}
