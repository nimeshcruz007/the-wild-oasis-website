import Spinner from "../_components/Spinner"

export default function Loading() {
    return (
        <div className="flex items-center flex-col justify-center">
            <Spinner />
            <p>Loading Cabins...</p>
        </div>
    )
}
