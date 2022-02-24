import React from 'react'
import ReactDOM from 'react-dom'
import { CustomerForm } from './CustomerForm'
import { AppointmentsDayViewLoader } from './AppointmentsDayViewLoader'

export const App = () => (
  <React.Fragment>
    <div className="button-bar">
      <button type="button" id="addCustomer">
        Add customer and appointment
      </button>
    </div>
    <AppointmentsDayViewLoader />
  </React.Fragment>
)
