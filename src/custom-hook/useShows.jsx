import { useState } from "react"

const initialValue = {
    expensePopUp: false,
    budgetPopUp: false,
    viewExpensePopUp: false
}

export function useShows() {
    const [shows, setShows] = useState(initialValue)

    function updateShows(fields) {
        return setShows(prev => {
            return {
                ...prev, ...fields
            }
        })
    }

    return [
        shows,
        updateShows
    ]
}