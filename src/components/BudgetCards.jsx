import { useEffect, useState } from "react"
import { Budget } from "../BudgetContext"
import BudgetCard from "./BudgetCard"
import Uncategorized from "./Uncategorized"
import { TotalCard } from "./TotalCard"

export default function BudgetCards() {
    const {state} = Budget()
    const accBudgetList = state.budgetLists.reduce((acc, currentValue) => {
        return acc + currentValue.maximumSpending 
    }, 0)
    const accExpenseList = state.expenseLists.reduce((acc, currentValue) => {
        return acc + currentValue.amount
    }, 0)


    return (
        <>
            {
                state.budgetLists.map(list => {
                    return (
                        <BudgetCard key={list.id}
                            name={list.name}
                            gray
                            cardId={list.id}
                            max={list.maximumSpending}
                        />
                    )
                })
            }
            <Uncategorized />
            <TotalCard amount={accExpenseList} max={accBudgetList} />
        </>
    )
}