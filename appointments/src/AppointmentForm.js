import React, { useState } from "react"

export const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit,
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots
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
      />
    </form>
  )
}

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0)
  // converts 30 minutes to miliseconds
  const increment = 30 * 60 * 1000
  return timeIncrements(totalSlots, startTime, increment)
  }

const toTimeValue = timestamp => 
  new Date(timestamp).toTimeString().substring(0, 5)

const weeklyDateValues = startDate => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0)
  const increment = 24 * 60 * 60 * 1000
  return timeIncrements(7, midnight, increment)
}

const timeIncrements = (numTimes, startTime, increment) => 
  Array(numTimes)
    .fill([startTime])
    .reduce((acc, _, i) => acc.concat([startTime + (i * increment)]))

const toShortDate = timestamp => {
  const [day, , dayOfMonth] = new Date(timestamp)
    .toDateString()
    .split(' ')
  return `${day} ${dayOfMonth}`
}

const mergeDateAndTime = (date, timeSlot) => {
  const time = new Date(timeSlot)
  return new Date(date).setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds()
  )
}

const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots
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
  timeSlot
}) => {
  const startsAt = mergeDateAndTime(date, timeSlot)

  if (
    availableTimeSlots.some(availableTimeSlot => availableTimeSlot.startsAt === startsAt)
  ) {
    return (
      <input 
        name="startsAt"
        type="radio"
        value={startsAt}
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