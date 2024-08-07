import Link from "next/link";
import Image from "next/image";
import { auth } from "@/app/_lib/auth";

export default async function Navigation() {

    const session = await auth();

    return <nav className="z-10 text-xl">
        <ul className="flex gap-16 items-center">
            <li>
                <Link href="/cabins" className="hover:text-accent-400 transition-colors">
                    Cabins
                </Link>
            </li>
            <li>
                <Link href="/about" className="hover:text-accent-400 transition-colors">
                    About
                </Link>
            </li>
            <li>
                {
                    session?.user?.image
                        ?
                        <Link
                            href="/account" className="hover:text-accent-400 transition-colors flex items-center gap-3" >
                            <img src={session.user.image} className="rounded-full w-10" referrerPolicy="no-referrer" />
                            <span>Guest user</span>
                        </Link>

                        :
                        <Link
                            href="/account" className="hover:text-accent-400 transition-colors" > Guest area </Link>
                }
            </li>
        </ul>
    </nav>
}


