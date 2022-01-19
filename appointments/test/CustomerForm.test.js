import React from "react"
import { createContainer } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'
import ReactTestUtils from 'react-dom/test-utils'

describe('CustomerForm', () => {
  let render, container

  const form = id => container.querySelector(`form[id="${id}"]`)

  const firstNameField = () => form('customer').elements.firstName

  const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`)

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeUndefined()
    expect(formElement.tagName).toEqual('INPUT')
    expect(formElement.type).toEqual('text')
  }

  beforeEach(() => {
      ({ render, container } = createContainer())
  })

  it('renders a form', () => {
    render(<CustomerForm />)
    expect(form('customer')).not.toBeNull()
  })

  describe('first name field', () => {
    it('renders as text box', () => {
      render(<CustomerForm />)
      expectToBeInputFieldOfTypeText(firstNameField())
    })

    it('includes the existing value', () => {
      render(<CustomerForm firstName="Ashley" />)
      expect(firstNameField().value).toEqual('Ashley')
    })

    it('renders a label', () => {
      render(<CustomerForm />)
      expect(labelFor('firstName')).not.toBeNull()
      expect(labelFor('firstName').textContent).toEqual('First name')
    })

    it('assigns an id', () => {
      render(<CustomerForm />)
      expect(firstNameField().id).toEqual('firstName')
    })

    it('assings an id that matches the label id', () => {
      render(<CustomerForm />)
      expect(firstNameField().id).toEqual(labelFor('firstName').htmlFor)
    })

    it('saves existing value when submitted', () => {
      expect.hasAssertions()
      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({firstName}) =>
            expect(firstName).toEqual("Ashley")
          }
        />
      )
      ReactTestUtils.Simulate.submit(form('customer'))
    })

    it('saves new value when submitted', () => {
      expect.hasAssertions()
      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({firstName}) => 
            expect(firstName).toEqual('Jamie')
        }
        />
      )
      ReactTestUtils.Simulate.change(firstNameField(), {
        target: {value: 'Jamie'}
      })
      ReactTestUtils.Simulate.submit(form('customer'))
    })
  })
})