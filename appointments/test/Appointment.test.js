import React from 'react'
import ReactDOM from 'react-dom'
import { Appointment } from '../src/Appointment'

describe('Appointment', () => {
    it('renders the customer first name', () => {
        const customer = { firstName: 'Ashley' }
        const component = <Appointment customer={customer} />
        const container = document.createElement('div')
        ReactDOM.render(component, container)
        expect(container.textContent).toMatch('Ashley')
    })

    it('renders another customer first name', () => {
        const customer = { firstName: 'Jordan' }
        const component = <Appointment customer={customer} />
        const container = document.createElement('div')
        ReactDOM.render(component, container)
        expect(container.textContent).toMatch('Jordan')
    })
})