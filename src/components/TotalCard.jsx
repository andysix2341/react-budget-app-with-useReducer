import { Card, ProgressBar } from "react-bootstrap"
import { currencyFormater } from "../utils"


export function TotalCard({amount, max}) {
    return (
        <Card className={max === 0 ? "d-none" : "d-block"}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                <div className="me-2">Total</div>
                <div className="d-flex align-items-baseline">{currencyFormater.format(amount)} 
                </div>/<span className="text-muted fs-6 ms-1">{currencyFormater.format(max)}</span>
                </Card.Title>
                <ProgressBar 
                        className="rounded-pill" 
                        variant={getProgressBarVariant(amount, max)} 
                        min={0}
                        max={max}
                        now={amount}
                    />
            </Card.Body>
        </Card>
    )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"
}