import React from "react"
import { AppointmentForm } from "../src/AppointmentForm"
import { createContainer } from "./domManipulators"


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

  describe('service field', () => {
    it('renders as a select box', () => {
      render(<AppointmentForm />)
      expect(field('service')).not.toBeUndefined()
      expect(field('service').tagName).toEqual('SELECT')
    })
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

  
})
