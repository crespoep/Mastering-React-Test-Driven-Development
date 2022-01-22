import React from "react"
import ReactDOM from "react-dom"
import { sampleAvailableTimeSlots  } from "./sampleData"
import { AppointmentForm } from "./AppointmentForm"

ReactDOM.render(
    <AppointmentForm availableTimeSlots={sampleAvailableTimeSlots } />,
    document.getElementById('root')
)
