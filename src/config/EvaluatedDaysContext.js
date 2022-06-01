import React, { createContext, useState } from 'react';

export const EvaluatedDaysContext = createContext(0)

export const EvaluatedDaysContextProvider = ({ children }) => {
    const [amount, setAmount] = useState(0)

    return (
        <EvaluatedDaysContext.Provider value={{ amount, setAmount }}>
                {children}
        </EvaluatedDaysContext.Provider>
    )
}