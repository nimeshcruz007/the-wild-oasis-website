import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

export default async function CabinList({ filter }) {

    const cabins = await getCabins();

    let displayCabin;

    if (filter === "all") {
        displayCabin = cabins;
    }
    if (filter === "small") {
        displayCabin = cabins.filter(item => item.maxCapacity <= 2);
    } else if (filter === "medium") {
        displayCabin = cabins.filter(item => item.maxCapacity > 2 && item.maxCapacity <= 7);
    } else if (filter === "large") {
        displayCabin = cabins.filter(item => item.maxCapacity > 7 && item.maxCapacity <= 10);
    }

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {displayCabin.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    )
}
