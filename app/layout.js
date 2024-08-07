import "./_styles/globals.css"
import { Josefin_Sans } from "next/font/google";
import Header from "@/app/_components/Header";
import { ReservationProvider } from "@/app/_components/ReservationContext";

export const metadata = {
    title: {
        template: "%s - The Wild Oasis",
        default: "Welcome / The Wild Oasis"
    },
    description: "This is a simple description used for testing purposes"
}

const josefin = Josefin_Sans({
    subsets: ["latin"],
    display: "swap"
})

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${josefin.className} bg-primary-900 text-primary-50 min-h-screen flex flex-col`}>
                <Header />
                <div className="flex-1 px-8 py-12 grid">
                    <main className="max-w-7xl mx-auto w-full">
                        <ReservationProvider>
                            {children}
                        </ReservationProvider>
                    </main>
                </div>
                <footer>Copyright by The Wild Oasis</footer>
            </body>
        </html >
    )
}
