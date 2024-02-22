import { useEffect, useState } from "react"
import { Card, ProgressBar, Stack, Button } from "react-bootstrap"
import { currencyFormater } from "../utils"
import ExpensePopUp from "./ExpensePopUp"
import { useShows } from "../custom-hook/useShows"
import ViewExpensePopUp from "./ViewExpensePopUp"
import { Budget } from "../BudgetContext"

export default function BudgetCard({name, cardId, max, gray}) {
    const [shows, updateShows] = useShows()
    const [accumulateExpenseCardValue, setAccumulateExpenseCardValue] = useState(0)
    const {state, deleteBudgetList, deleteExpenseList} = Budget()
    const filteredExpenseItemByCardId = state.expenseLists.filter(list => list.budgetCategorized === cardId)
    const [classNames, setClassNames] = useState("")

    function deleteCard() {
        const filteredNewBudgetLists = state.budgetLists.filter(list => list.id !== cardId)
        const filteredNewExpenseLists = state.expenseLists.filter(list => list.budgetCategorized !== cardId)
        deleteBudgetList(filteredNewBudgetLists, filteredNewExpenseLists)
    }
    
    function deleteList(listId) {
        const filteredNewExpenseLists = state.expenseLists.filter(list => list.id !== listId)
        deleteExpenseList(filteredNewExpenseLists)
    }

    useEffect(() => {
        const accExpenseCardValue = filteredExpenseItemByCardId.reduce((acc, currentValue) => {
            return acc + currentValue.amount
        }, 0)
        if (accExpenseCardValue > max) {
            setClassNames("bg-danger bg-opacity-10")
        } else if (gray) {
            setClassNames("bg-light")
        }
        setAccumulateExpenseCardValue(accExpenseCardValue)
    }, [state.expenseLists])

  return (
    <>
        <Card className={classNames}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">{currencyFormater.format(accumulateExpenseCardValue)} 
                    <span className="text-muted fs-6 ms-1">/{currencyFormater.format(max)}</span>
                    </div>
                </Card.Title>
                <ProgressBar 
                    className="rounded-pill" 
                    variant={getProgressBarVariant(accumulateExpenseCardValue, max)} 
                    min={0}
                    max={max}
                    now={accumulateExpenseCardValue}
                />
                <Stack direction="horizontal" gap="2" className="mt-4">
                    <Button variant="outline-primary" className="ms-auto" onClick={() => updateShows({expensePopUp: true})}>Add Expense</Button>
                    <Button variant="outline-secondary" onClick={() => updateShows({viewExpensePopUp: true})}>View Expenses</Button>
                </Stack>
            </Card.Body>
        </Card>
        <ExpensePopUp 
            show={shows.expensePopUp} 
            close={() => updateShows({expensePopUp: false})} 
            cardName={name}
            cardId={cardId}
        />
        <ViewExpensePopUp show={shows.viewExpensePopUp} close={() => updateShows({viewExpensePopUp: false})} cardId={cardId} cardName={name} filteredItems={filteredExpenseItemByCardId} deleteList={deleteList} deleteCard={deleteCard} />

    </>
  )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"
}
