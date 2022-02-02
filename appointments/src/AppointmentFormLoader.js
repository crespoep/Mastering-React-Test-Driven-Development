import React, { useEffect } from 'react'
import { AppointmentForm } from '../src/AppointmentForm'

export const AppointmentFormLoader = () => {

  useEffect(() => {
    const fetchAvailableTimeSlots = () => {
      window.fetch('/availableTimeSlots', {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      })
    }

    fetchAvailableTimeSlots()
  }, [])

  return (
    <AppointmentForm availableTimeSlots={[]} />
  )
}