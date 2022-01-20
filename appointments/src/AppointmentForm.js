import React, { useState } from "react"

const timeIncrements = (numTimes, startTime, increment) => 
  Array(numTimes)
    .fill([startTime])
    .reduce((acc, _, i) => acc.concat([startTime + (i * increment)]))

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0)
  // converts 30 minutes to miliseconds
  const increment = 30 * 60 * 1000
  return timeIncrements(totalSlots, startTime, increment)
}

const weeklyDateValues = startDate => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0)
  const increment = 24 * 60 * 60 * 1000
  return timeIncrements(7, midnight, increment)
}

const toShortDate = timestamp => {
  const [day, , dayOfMonth] = new Date(timestamp)
    .toDateString()
    .split(' ')
  return `${day} ${dayOfMonth}`
}

const toTimeValue = timestamp => 
  new Date(timestamp).toTimeString().substring(0, 5)

const mergeDateAndTime = (date, timeSlot) => {
  const time = new Date(timeSlot)
  return new Date(date).setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds()
  )
}

export const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit,
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots,
  startsAt
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
        today={today}
        availableTimeSlots={availableTimeSlots}
        startsAt={startsAt}
      />
    </form>
  )
}

const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots,
  startsAt
}) => {
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt)
  const days = weeklyDateValues(today)

  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {
            days.map(day => <th key={day}>{toShortDate(day)}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          timeSlots.map(timeSlot => 
            <tr key={timeSlot}>
              <th>{toTimeValue(timeSlot)}</th>
              {
                days.map(date => (
                  <td key={date}>
                    <RadioButtonIfAvailable 
                      availableTimeSlots={availableTimeSlots}
                      date={date}
                      timeSlot={timeSlot}
                      checkedTimeSlot={startsAt}
                    />
                  </td>
                ))
              }
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

const RadioButtonIfAvailable = ({
  availableTimeSlots,
  date,
  timeSlot,
  checkedTimeSlot
}) => {
  const startsAt = mergeDateAndTime(date, timeSlot)

  //startsAt is the current selected value
  const isChecked = startsAt === checkedTimeSlot

  if (
    availableTimeSlots.some(availableTimeSlot => availableTimeSlot.startsAt === startsAt)
  ) {
    return (
      <input 
        name="startsAt"
        type="radio"
        value={startsAt}
        checked={isChecked}
        readOnly
      />
    )
  }
  return null
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
  salonClosesAt: 19,
  today: new Date(),
  availableTimeSlots: []
}
