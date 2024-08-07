"use server";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";

import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleLogin() {
  await signIn("google", { redirectTo: "/account" });
}

export async function handleLogout() {
  await signOut();
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session.user) throw new Error("Please login to update profile");

  const nationalID = formData.get("nationalID");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const regex = /^[a-zA-Z0-9]{6,12}$/;
  if (!regex.test(nationalID))
    throw new Error("Please enter a valid national ID");

  const updateFields = { nationality, nationalID, countryFlag };
  const guestId = session.user.guestId;

  const { error } = await supabase
    .from("guests")
    .update(updateFields)
    .eq("id", guestId)
    .select()
    .single();

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteGuest(bookingId) {
  const session = await auth();
  if (!session?.user)
    throw new Error("You are not authorized to perform this action");

  const bookings = await getBookings(session.user.guestId);
  const bookingsIds = bookings.map((item) => item.id);

  const bookingExist = bookingsIds.includes(bookingId);

  if (!bookingExist) throw new Error("You can only delete your bookings");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/profile");
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session?.user)
    throw new Error("You are not authorized to perform this action");

  const numGuests = formData.get("numGuests");
  const bookingId = Number(formData.get("bookingId"));
  const observations = formData.get("observations");
  console.log(bookingId);

  const bookings = await getBookings(session.user.guestId);
  const bookingsIds = bookings.map((item) => item.id);

  const bookingExist = bookingsIds.includes(bookingId);

  if (!bookingExist) throw new Error("You can only update your bookings");

  const updatedFields = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  const {
    cabinId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    guestId,
    cabinPrice,
  } = bookingData;

  const newBooking = {
    startDate,
    endDate,
    numNights,
    totalPrice,
    cabinPrice,
    extrasPrice: 0,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    numGuests: formData.get("numGuests"),
    cabinId: Number(cabinId),
    guestId: Number(guestId),
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);
  if (error) throw new Error("Unable to Create Booking, something went wrong");

  revalidatePath(`/cabin/${cabinId}`);
  redirect("/thankyou");
}
