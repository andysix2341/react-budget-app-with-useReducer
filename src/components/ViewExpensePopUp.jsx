import { useEffect } from "react"
import { Modal, Button, CloseButton } from "react-bootstrap"

export default function ViewExpensePopUp({show, close, cardName, filteredItems, deleteCard, deleteList, noNeedDeleteButton}) {

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title className="d-flex justify-content-around gap-2 align-items-center">
                    <h2>Expenses - {cardName}</h2>
                    {
                        !noNeedDeleteButton
                        &&
                        <Button variant="outline-danger" className="ml-2" onClick={deleteCard} >Delete</Button>
                    }
                    <CloseButton onClick={close} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className="list-unstyled">
                    {
                        filteredItems.map(list => {
                            return (
                                <li id={list.id} className="d-flex justify-content-between" key={list.id}>{list.description} {list.amount} <CloseButton onClick={() => deleteList(list.id)} /> 
                                </li>
                            )
                        })
                    }
                </ul>
            </Modal.Body>
        </Modal>
    )
}