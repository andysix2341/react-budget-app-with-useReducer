import { createContext, useContext, useReducer } from "react"

const BudgetContext = createContext()

const initialValue = {
    budgetLists: JSON.parse(localStorage.getItem("BUDGET_LISTS")) || [],
    expenseLists: JSON.parse(localStorage.getItem("EXPENSE_LISTS")) || []
}

export const ACTIONS = {
    UPDATE_BUDGET_LISTS: "update_budget_lists",
    UPDATE_EXPENSE_LISTS: "update_expense_lists",
    DELETE_BUDGET_LIST: "delete_budget_list",
    DELETE_EXPENSE_LIST: "delete_expense_list"
}

function reducer(state, {type, payload}) {
    switch(type) {
        case ACTIONS.UPDATE_BUDGET_LISTS: 
            return {
                ...state,
                budgetLists: [...state.budgetLists, payload.budgetList]
            }
        case ACTIONS.UPDATE_EXPENSE_LISTS:
            return {
                ...state,
                expenseLists: [...state.expenseLists, payload.expenseList]
            }
        case ACTIONS.DELETE_BUDGET_LIST:
            return {
                ...state,
                budgetLists: payload.newBudgetLists,
            }
        case ACTIONS.DELETE_EXPENSE_LIST:
            return {
                ...state,
                expenseLists: payload.newExpenseLists
            }
    } 
}

export function Budget() {
    return useContext(BudgetContext)
}

export default function BudgetProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialValue)

    function updateBudgetList(budgetList) {
        return dispatch({type: ACTIONS.UPDATE_BUDGET_LISTS, payload: {budgetList}})
    }

    function updateExpenseList(expenseList) {
        return dispatch({type: ACTIONS.UPDATE_EXPENSE_LISTS, payload: {expenseList}})
    }

    function deleteBudgetList(newBudgetLists, newExpenseLists) {
        dispatch({type: ACTIONS.DELETE_BUDGET_LIST, payload: {newBudgetLists}})
        dispatch({type: ACTIONS.DELETE_EXPENSE_LIST, payload: {newExpenseLists}})
    }

    function deleteExpenseList(newExpenseLists) {
        return dispatch({type: ACTIONS.DELETE_EXPENSE_LIST, payload: {newExpenseLists}})
    }

    return (
        <BudgetContext.Provider value={{state, dispatch, updateBudgetList, updateExpenseList, deleteBudgetList, deleteExpenseList}}>
            {children}
        </BudgetContext.Provider>
    )
}