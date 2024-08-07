import { getBooking, getCabin } from "@/app/_lib/data-service";
import { updateBooking } from "@/app/_lib/action";
import SubmitButton from "@/app/_components/SubmitButton";

export const metadata = {
  title: "Edit Reservation",
};

export default async function Page({ params }) {
  const bookingId = params.reservationid;

  const { numGuests, cabinId, observations } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>
      <form
        action={updateBooking}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <input name="bookingId" type="hidden" defaultValue={bookingId} />
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option key={x} value={x}>
                {x > 1 ? `${x} guests` : `${x} guest`}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <SubmitButton>Update Reservation</SubmitButton>
      </form>
    </div>
  );
}
