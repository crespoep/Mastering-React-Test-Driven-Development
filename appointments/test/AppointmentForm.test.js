import React from "react"
import { AppointmentForm } from "../src/AppointmentForm"
import { createContainer } from "./domManipulators"
import ReactTestUtils from 'react-dom/test-utils'

describe('AppointmentForm', () => {
  let render, container

  beforeEach(() => {
    ({ render, container } = createContainer())
  })

  const form = id => container.querySelector(`form[id="${id}"]`)

  const field = fieldName => form('appointment').elements[fieldName]

  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes)
    return options.find(
      option => option.textContent === textContent
    )
  }

  it('renders a form', () => {
    render(<AppointmentForm />)
    expect(form('appointment')).not.toBeNull()
  }) 

  it('has a submit button', () => {
    render(<AppointmentForm />)
    const submitButton = container.querySelector(
      'input[type="submit"]'
    )
    expect(submitButton).not.toBeNull
    expect(submitButton.value).toEqual('Add')
  })

  describe('service field', () => {
    it('renders as a select box', () => {
      render(<AppointmentForm />)
      expect(field('service')).not.toBeUndefined()
      expect(field('service').tagName).toEqual('SELECT')
    })
    it('initially has a blank value chosen', () => {
      render(<AppointmentForm />)
      const firstNode = field('service').childNodes[0]
      expect(firstNode.value).toEqual('')
      expect(firstNode.selected).toBeTruthy()
    })
    
    it('lists all salon services', () => {
      const selectableServices = [
        'Cut',
        'Blow-dry'
      ]
      render(
        <AppointmentForm
          selectableServices={selectableServices}
        />
      )
      const optionNodes = Array.from(
        field('service').childNodes
      ) 
      const renderedServices = optionNodes.map(
        node => node.textContent
      )
      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices)
      )
    })
  
    it('pre-selects the existing value', () => {
      const services = ['Cut', 'Blow-dry']
      render(
        <AppointmentForm
          selectableServices={services}
          service="Blow-dry"
        />
      )
      const option = findOption(
        field('service'),
        'Blow-dry'
      )
      expect(option.selected).toBeTruthy()
    })

    it('renders a label', () => {
      render(<AppointmentForm />)
      const label = container.querySelector('label[for="service"]')
      expect(label).not.toBeNull()
      expect(label.textContent).toEqual('Salon service')
    })

    it('assigns an id that matches the label for', () => {
      render(<AppointmentForm />)
      expect(field('service').id).toEqual('service')
    })

    it('saves existing value when submitted', () => {
      expect.hasAssertions()
      render(
      <AppointmentForm 
        service={'Cut'}
        onSubmit={
          ({service}) => {
            expect(service).toEqual('Cut')
          }
        }
      />
      )
      const form = container.querySelector('form[id="appointment"]')
      ReactTestUtils.Simulate.submit(form)
    })
  })

  const timeSlotTable = () => container.querySelector('table#time-slots')

  const startsAtField = index => 
    container.querySelectorAll(`input[name="startsAt"]`)[
      index
    ]

  describe('stylist field', () => {
    it('renders a select box', () => {
      render(<AppointmentForm />)
      expect(field('stylist')).not.toBeUndefined()
      expect(field('stylist').tagName).toEqual('SELECT')   
    })

    it('initially has a blank value chosen', () => {
      render(<AppointmentForm />)
      const firstNode = field('stylist').childNodes[0]
      expect(firstNode).not.toBeUndefined()
      expect(firstNode.textContent).toEqual('')
      expect(firstNode.selected).toBeTruthy()
    })

    it('renders the list of stylists passed to it', () => {
      const stylists = [
        'John',
        'Richard',
        'Daniel'
      ]
      render(<AppointmentForm selectableStylists={stylists} />)
      const childNodes = field('stylist').childNodes
      const optionNodes = Array.from(childNodes)
      const listOfStylists = optionNodes.map(
        option => option.textContent        
      )
      expect(listOfStylists).toEqual(
        expect.arrayContaining(stylists)
      )
    })

    it('pre-selects existing value', () => {
      const selectableStylists = [
        'John',
        'Richard',
        'Daniel'
      ]
      render(
        <AppointmentForm 
          stylist={"Richard"} 
          selectableStylists={selectableStylists} 
        />
      )
      expect(field('stylist').value).toEqual('Richard')
    })

    it('renders a label', () => {
      render(<AppointmentForm />)
      const stylistLabel = container.querySelector('label[for="stylist"]')
      expect(stylistLabel).not.toBeNull()
      expect(stylistLabel.textContent).toEqual('Stylist')
    })
  })

  describe('time slot table', () => {
    it('renders a table for time slots', () => {
      render(<AppointmentForm />)
      expect(timeSlotTable()).not.toBeNull()
    })
    it('renders a time slot for every half an hour between open and cloase times', () => { 
      render(
        <AppointmentForm salonOpensAt={9} salonClosesAt={11} />
      )
      const timesOfDay = timeSlotTable().querySelectorAll(
        'tbody >* th'
      )
      expect(timesOfDay).toHaveLength(4)
      expect(timesOfDay[0].textContent).toEqual('09:00')
      expect(timesOfDay[1].textContent).toEqual('09:30')
      expect(timesOfDay[3].textContent).toEqual('10:30')
    })

    it('renders an empty cell at the start of the header row', () => {
      render(<AppointmentForm />)
      const headerRow = timeSlotTable().querySelector('thead > tr')
      expect(headerRow.firstChild.textContent).toEqual('')
    })

    it('renders a week of available dates', () => {
      const today = new Date(2018, 11, 1)
      render(<AppointmentForm today={today} />)
      const dates = timeSlotTable().querySelectorAll(
        'thead >* th:not(:first-child)'
      )
      expect(dates).toHaveLength(7)
      expect(dates[0].textContent).toEqual('Sat 01')
      expect(dates[1].textContent).toEqual('Sun 02')
      expect(dates[6].textContent).toEqual('Fri 07')
    })
    
    it('renders a radio button for each time slot', () => {
      const today = new Date()
      const availableTimeSlots = [
        {startsAt: today.setHours(9, 0, 0, 0)},
        {startsAt: today.setHours(9, 30, 0, 0)}
      ]
      render(
        <AppointmentForm 
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      )
      const cells = timeSlotTable().querySelectorAll('td')
      expect(
        cells[0].querySelector('input[type="radio"]')
      ).not.toBeNull()
      expect(
        cells[7].querySelector('input[type="radio"]')
      ).not.toBeNull()
    })

    it('does not render radio buttons for unavailable time slots', () => {
      // the availableTimeSlots props could be removed:
      render(<AppointmentForm availableTimeSlots={[]} />)
      const timesOfDay = timeSlotTable().querySelectorAll(
        'input'
      )
      expect(timesOfDay).toHaveLength(0)
    })

    it('sets radio button values to the index of the corresponding appointment', () => {
      const today = new Date()
      const availableTimeSlots = [
        {startsAt: today.setHours(9, 0, 0, 0)},
        {startsAt: today.setHours(9, 30, 0, 0)}
      ]
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      )
      expect(startsAtField(0).value).toEqual(
        availableTimeSlots[0].startsAt.toString()
      )
      expect(startsAtField(1).value).toEqual(
        availableTimeSlots[1].startsAt.toString()
      )
    })

    it('pre-selects the existing value', () => {
      const today = new Date()
      const availableTimeSlots = [
        {startsAt: today.setHours(9, 0, 0, 0)},
        {startsAt: today.setHours(9, 30, 0, 0)}
      ]
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
          startsAt={availableTimeSlots[0].startsAt}
        />
      )
      expect(startsAtField(0).checked).toEqual(true);
    })

    it('saves existing value when submitted', () => {
      expect.hasAssertions()
      const today = new Date()
      const availableTimeSlots = [
        {startsAt: today.setHours(9, 0, 0, 0)},
        {startsAt: today.setHours(9, 30, 0, 0)}
      ]
      const firstField = startsAtField(0)
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
          startsAt={availableTimeSlots[0].startsAt}
          onSubmit={({startsAt}) => {
            expect(startsAt).toEqual(availableTimeSlots[0].startsAt)
          }}
        />
      )
      const form = container.querySelector('form[id="appointment"]')
      ReactTestUtils.Simulate.submit(form)
    })

    it('saves new value when submitted', () => {
      expect.hasAssertions()
      const today = new Date()
      const availableTimeSlots = [
        {startsAt: today.setHours(9, 0, 0, 0)},
        {startsAt: today.setHours(9, 30, 0, 0)}
      ]
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
          startsAt={availableTimeSlots[0].startsAt}
          onSubmit={({ startsAt }) =>
            expect(startsAt).toEqual(availableTimeSlots[1].startsAt)
          }
        />
      )
      ReactTestUtils.Simulate.change(startsAtField(1), {
        target: {
          value: availableTimeSlots[1].startsAt.toString(),
          name: 'startsAt'
        }
      });
      ReactTestUtils.Simulate.submit(form('appointment'));
    })
  })
})
