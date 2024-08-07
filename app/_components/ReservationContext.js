'use client';

import { createContext, useState, useContext } from "react";

const initialValue = { from: undefined, to: undefined };
const ReservationContext = createContext(initialValue);

function ReservationProvider({ children }) {
    const [range, setRange] = useState();
    const resetRange = () => {
        setRange(initialValue);
    }
    return <ReservationContext.Provider value={{ range, setRange, resetRange }}>
        {children}
    </ReservationContext.Provider>
}


function useReservation() {
    const reservation = useContext(ReservationContext);
    if (!reservation) {
        throw new Error("Reservation Context is defined outside of its scope");
    }
    return reservation;
}

export { ReservationProvider, useReservation };

