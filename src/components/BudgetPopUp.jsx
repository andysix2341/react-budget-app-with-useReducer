import { useEffect } from "react"
import { PopUp, TitleElementOnHeader, InputBudgetElements, FooterBudgetElements } from "./PopUpComponents"
import { useInput } from "../custom-hook/useInput"
import { Budget } from "../BudgetContext"

export function closePopUp(close, clearInputValues, cardId) {
    close()
    clearInputValues(cardId)
}

export function updateStateValue(e, updateValue, listValuesThatWantToBeChecked, closeModals) {
    e.preventDefault()
    const checkListValue = listValuesThatWantToBeChecked.every(list => list !== "")
    if (!checkListValue) return alert("Please insert the text")
    updateValue()
    closeModals()
}

export default function BudgetPopUp({show, close}) {
    const [inputValues, updateInputValues, clearInputValues] = useInput()
    const {state, dispatch, updateBudgetList} = Budget()
    const budgetList = {id: crypto.randomUUID(), name: inputValues.name, maximumSpending: parseInt(inputValues.maximumSpending)}
    const closeModals = () => closePopUp(close, clearInputValues)
    const updateBudgetValue = () => updateBudgetList(budgetList)

    useEffect(() => {
        localStorage.setItem("BUDGET_LISTS", JSON.stringify(state.budgetLists))
        localStorage.setItem("EXPENSE_LISTS", JSON.stringify(state.expenseLists))
    }, [state.budgetLists, state.expenseLists])

    return (
            <PopUp 
                show={show} 
                name="Budget" 
                close={closeModals} 
                submitValue={e => updateStateValue(e, updateBudgetValue, [inputValues.name, inputValues.maximumSpending], closeModals)} 
            >

                <InputBudgetElements 
                    name={inputValues.name} 
                    maximumSpending={inputValues.maximumSpending} 
                    handleInputName={e => updateInputValues({name: e.target.value})} 
                    handleInputSpending={e => updateInputValues({maximumSpending: e.target.value})}
                />

            </PopUp>
        )
    }
    // <PopUp 
    //     show={show} 
    //     titleElement={
    //             <TitleElementOnHeader name="Budget" close={closeModals} 
    //         />} 
    //     inputElements={
    //         <InputBudgetElements 
    //             name={inputValues.name} 
    //             maximumSpending={inputValues.maximumSpending} 
    //             handleInputName={e => updateInputValues({name: e.target.value})} handleInputSpending={e => updateInputValues({maximumSpending: e.target.value})} 
    //         />} 
    //     footerElement={
    //         <FooterBudgetElements submitValue={e => updateStateValue(e, updateBudgetValue, [inputValues.name, inputValues.maximumSpending], closeModals)} 
    //     />}
    // />