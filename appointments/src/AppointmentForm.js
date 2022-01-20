import React, { useState } from "react"

export const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit,
  salonOpensAt,
  salonClosesAt
}) => {

  const [appointment, setAppointment] = useState({service})

  const handleChangeService = ({target}) => {
    setAppointment((appointment) => ({
      ...appointment,
      service: target.value
      })
    )
  }

  return (
    <form id="appointment" onSubmit={() => onSubmit(appointment)}>
      <label htmlFor="service">Salon service</label>
      <select
        id="service"
        name="service"
        value={service}
        onChange={handleChangeService}
      >
        <option />
        {
          selectableServices.map(
            s => <option key={s}>{s}</option>
          )
        }

      </select>
      <TimeSlotTable 
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
      />
    </form>
  )
}

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0)
  // converts 30 minutes to miliseconds
  const increment = 30 * 60 * 1000
  return Array(totalSlots)
    .fill([startTime]) // [[100], [100], [100], [100]]
    .reduce((acc, _, i) => acc.concat([startTime + (i * increment)])
    )
  }

const toTimeValue = timestamp => 
  new Date(timestamp).toTimeString().substring(0, 5)

const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt
}) => {
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt)
  
  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          timeSlots.map(timeSlot => 
            <tr key={timeSlot}>
              <th>{toTimeValue(timeSlot)}</th>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

AppointmentForm.defaultProps = {
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ],
  salonOpensAt: 9,
  salonClosesAt: 19
}