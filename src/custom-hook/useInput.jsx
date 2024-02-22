import { useState } from "react"

export function useInput(cardId) {
    const initialValue = {
        name: "",
        maximumSpending: "",
        description: "",
        amount: "",
        budgetCategorized: cardId || "Uncategorized"
    }

    const [inputValues, setInputValues] = useState(initialValue)

    function updateInputValues(fields) {
        setInputValues(prev => {
            return {
                ...prev,
                ...fields
            }
        })
    }

    function clearInputValues(cardId) {
        setInputValues(prev => {
            return {
                ...prev,
                name: "",
                maximumSpending: "",
                description: "",
                amount: "",
                budgetCategorized: cardId || "Uncategorized"
            }
        })
    }

    return [
        inputValues,
        updateInputValues,
        clearInputValues
    ]

}