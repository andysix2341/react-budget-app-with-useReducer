import { useInput } from "../custom-hook/useInput"
import { Budget } from "../BudgetContext"
import { Modal, CloseButton, Button } from "react-bootstrap"

export function PopUp({show, name, close, submitValue, children}) {
    return (
        <Modal show={show}>
            <form>
                <Modal.Header>
                    <Modal.Title>
                        <h2>New {name}</h2>
                        <CloseButton onClick={close} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={submitValue}>Add</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}


export function FooterBudgetElements({submitValue}) {
    return (
        <Modal.Footer>
            <Button type="submit" 
                    onClick={submitValue}
            >Add</Button>
        </Modal.Footer>
    )
}


export function TitleElementOnHeader({ name, close }) {
    
    return (
        <Modal.Title>
            <h2>New {name}</h2>
            <CloseButton onClick={close} className="bg-dark" />
        </Modal.Title>
    )
}


export function InputBudgetElements({name, maximumSpending, handleInputName, handleInputSpending}) {
    return (
        <>
            <div className="d-flex flex-column mb-2">
                <label>Name</label>
                <input type="text" value={name} onChange={handleInputName} required />
            </div>
            <div className="d-flex flex-column">
                <label>Maximum Spending</label>
                <input type="number" value={maximumSpending} onChange={handleInputSpending} required />
            </div>
        </>
    )
}

export function InputExpenseElement({description, amount, cardId, handleDescription, handleAmount, handleBudgetCategorized, optionLists}) {
    const [state, , , ] = Budget()
    return (
        <>
            <div className="d-flex flex-column">
                <label>Description</label>
                <input type="text" value={description} onChange={handleDescription} required />
            </div>
            <div className="d-flex flex-column">
                <label>Amount</label>
                <input type="number" value={amount} onChange={handleAmount} required />
            </div>
            <div className="d-flex flex-column">
                <label>Budget</label>
                <select id="budget-id" defaultValue={cardId || "Uncategorized"} onChange={handleBudgetCategorized}>
                    <option id="Uncategorized">Uncategorized</option>
                    {
                        optionLists.map(list => {
                            return (
                                <option key={list.id} id={list.id} value={list.id} >{list.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        </>
    )
}

export function ViewExpense({show, close, deleteCard, items ,cardName, expenseLists, deleteList}) {
    return (
        <PopUp 
            show={show} 
            titleElement={
            <TitleElementOnCard cardName={cardName} close={close} deleteCard={deleteCard}
            />}
            inputElements={<ViewExpenseBody expenseLists={expenseLists} deleteList={deleteList} items={items} />}
            />
            // titleElement={} />
    )
}
const TitleElementOnCard = ({cardName, close, deleteCard}) => {
    return (
        <>
            <Modal.Title>
                <h2>Expenses - {cardName} 
                <Button variant="Danger" onClick={deleteCard}>Delete</Button></h2>
                <CloseButton className="bg-black" onClick={close} />
            </Modal.Title>
        </>
    )
}

const ViewExpenseBody = ({items, deleteList}) => {
    return (
        <ul>
            {
                items.map(item => {
                    return (
                        <li key={item.budgetCategorized}>
                            {item.description} {item.amount} <CloseButton onClick={deleteList} className="bg-black" />
                        </li>
                    )
                })

            }    
        </ul>
    )
            
}