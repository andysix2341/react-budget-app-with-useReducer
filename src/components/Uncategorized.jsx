import { useState, useEffect } from "react"
import { Budget } from "../BudgetContext"
import { Card, Stack, Button } from "react-bootstrap"
import { currencyFormater } from "../utils"
import { useShows } from "../custom-hook/useShows"
import ExpensePopUp from "./ExpensePopUp"
import ViewExpensePopUp from "./ViewExpensePopUp"

export default function Uncategorized() {
    const [accumulateExpenseCardValue, setAccumulateExpenseCardValue] = useState(0)
    const [ shows, updateShows ] = useShows()
    const {state, deleteExpenseList} = Budget()
    const filteredExpenseItemByCardId = state.expenseLists.filter(list => list.budgetCategorized === "Uncategorized")

    function deleteList(listId) {
        const filteredNewExpenseLists = state.expenseLists.filter(list => list.id !== listId)
        deleteExpenseList(filteredNewExpenseLists)
    }

    useEffect(() => {
        const accExpenseCardValue = filteredExpenseItemByCardId.reduce((acc, currentValue) => {
            return acc + currentValue.amount
        }, 0)
        setAccumulateExpenseCardValue(accExpenseCardValue)
    }, [state.expenseLists])

    return (
        <>
            <Card className={accumulateExpenseCardValue === 0 ? "d-none" : "d-block"}>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                        <div className="me-2">Uncategorized</div>
                        <div className="d-flex align-items-baseline">{currencyFormater.format(accumulateExpenseCardValue)} 
                        </div>
                    </Card.Title>
                    <Stack direction="horizontal" gap="2" className="mt-4">
                        <Button variant="outline-primary" className="ms-auto" onClick={() => updateShows({expensePopUp: true})}>Add Expense</Button>
                        <Button variant="outline-secondary" onClick={() => updateShows({viewExpensePopUp: true})}>View Expenses</Button>
                    </Stack>
                </Card.Body>
            </Card>
            <ExpensePopUp 
            show={shows.expensePopUp} 
            close={() => updateShows({expensePopUp: false})} 
            cardName="Uncategorized"
            cardId="Uncategorized"
            />
            <ViewExpensePopUp show={shows.viewExpensePopUp} close={() => updateShows({viewExpensePopUp: false})} cardId="Uncategorized" cardName="Uncategorized" filteredItems={filteredExpenseItemByCardId} deleteList={deleteList} noNeedDeleteButton />
        </>

    )
}

