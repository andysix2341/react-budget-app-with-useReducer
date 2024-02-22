import { useInput } from "../custom-hook/useInput"
import { Budget, ACTIONS } from "../BudgetContext"
import { closePopUp, updateStateValue } from "./BudgetPopUp"
import { PopUp, TitleElementOnHeader, InputExpenseElement, FooterBudgetElements } from "./PopUpComponents"

export default function ExpensePopUp({show, close, cardId, cardName}) {
    const [inputValues, updateInputValues, clearInputValues] = useInput(cardId)
    const {state, updateExpenseList} = Budget()
    const expenseList = {id: crypto.randomUUID(), description: inputValues.description, amount: parseInt(inputValues.amount), budgetCategorized: inputValues.budgetCategorized}
    const updateValue = () => updateExpenseList(expenseList)
    const closeModals = () => closePopUp(close, clearInputValues, cardId)

    return(
        <PopUp 
            show={show}
            name="Expense"
            close={closeModals}
            submitValue={e => updateStateValue(e, updateValue, [inputValues.description, inputValues.amount], closeModals)}
        >
            <div className="d-flex flex-column">
                <label>Description</label>
                <input type="text" value={inputValues.description} onChange={e => updateInputValues({description: e.target.value})} required />
            </div>
            <div className="d-flex flex-column">
                <label>Amount</label>
                <input type="number" value={inputValues.amount} onChange={e => updateInputValues({amount: e.target.value})} required />
            </div>
            <div className="d-flex flex-column">
                <label>Budget</label>
                <select id="budget-id" defaultValue={cardId || "Uncategorized"} onChange={e => updateInputValues({budgetCategorized: e.target.value})}>
                    <option id="Uncategorized">Uncategorized</option>
                    {
                        state.budgetLists.map(list => {
                            return (
                                <option key={list.id} id={list.id} value={list.id} >{list.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        
        </PopUp>    
    )
}

{/* <PopUp 
    show={show}
    titleElement={<TitleElementOnHeader name={"Expense"} close={() => closePopUp(close, clearInputValues)} />}
    inputElements={<InputExpenseElement 
            description={inputValues.description} 
            amount={inputValues.amount}
            cardName={cardName}
            cardId={cardId}
            budgetCategorized={inputValues.budgetCategorized}
            handleDescription={e => updateInputValues({description: e.target.value})}
            handleAmount={e => updateInputValues({amount: e.target.value})}
            handleBudgetCategorized={e => updateInputValues({budgetCategorized: e.target.selectedOptions[0].id})}
            // updateInputValues({budgetCategorized:e.target.value})
            
            optionLists={state.budgetLists}
        />}
    footerElement={<FooterBudgetElements submitValue={e => updateStateValue(e, updateValue, [inputValues.description, inputValues.amount], closeModals)} />}
/> */}
    // function updateExpenseValue(e, listWantToCheck) {
    //     e.preventDefault()
    //     const checkList = listWantToCheck.every(list => list !== "")
    //     console.log(checkList)
    //     if (!checkList) return alert("input can't be empty")
    //     updateExpenseList(expenseList)
    //     closeModals()
    // }