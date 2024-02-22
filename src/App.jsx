import { useEffect } from "react"
import { useShows } from "./custom-hook/useShows"
import { Container, Stack, Button } from "react-bootstrap" 
import BudgetProvider from "./BudgetContext"
import BudgetPopUp from "./components/BudgetPopUp"
import ExpensePopUp from "./components/ExpensePopUp"
import BudgetCards from "./components/BudgetCards"


export default function App() {
  const [shows, updateShows] = useShows()
  return (
    <BudgetProvider>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Budget</h1>
          <Button variant="primary" onClick={() => updateShows({budgetPopUp: true})}>Add Budget</Button>
          <Button variant="outline-primary" onClick={() => updateShows({expensePopUp: true})}>Add Expense</Button>
        </Stack>
        <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start" 
          }}>
            <BudgetCards />
        </div>
        <BudgetPopUp show={shows.budgetPopUp} close={() => updateShows({budgetPopUp: false})} />
        <ExpensePopUp show={shows.expensePopUp} close={() => updateShows({expensePopUp: false})} />
      </Container>
    </BudgetProvider>
  )
}
