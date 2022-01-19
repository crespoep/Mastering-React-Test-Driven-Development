import React from "react"
import ReactDOM from "react-dom"
import { AppointmentsDayView } from "./AppointmentsDayView"
import { CustomerForm } from "./CustomerForm"
import { sampleAppointments } from "./sampleData"

// ReactDOM.render(
//     <AppointmentsDayView appointments={sampleAppointments} />,
//     document.getElementById('root')
// )

ReactDOM.render(
    <CustomerForm />,
    document.getElementById('root')
)