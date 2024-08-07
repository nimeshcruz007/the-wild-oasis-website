'use client';
import { useRouter, useSearchParams, usePathname } from "next/navigation";


export default function CabinFilter() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const activeFilter = searchParams.get("capacity") ?? 'all';

    function handleFilter(filter) {
        const params = new URLSearchParams();
        params.set("capacity", filter);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="border border-primary-800 flex">
            <Button activeFilter={activeFilter} handleFilter={handleFilter} filter="all">All</Button>
            <Button activeFilter={activeFilter} handleFilter={handleFilter} filter="small">2 guests</Button>
            <Button activeFilter={activeFilter} handleFilter={handleFilter} filter="medium">4-6 guests</Button>
            <Button activeFilter={activeFilter} handleFilter={handleFilter} filter="large">8-10 guests</Button>
        </div>
    )
}

export function Button({ activeFilter, handleFilter, children, filter }) {
    return (
        <button className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter ? "bg-primary-700 text-primary-50" : ''}`} onClick={() => handleFilter(filter)}>
            {children}
        </button>
    )
}
