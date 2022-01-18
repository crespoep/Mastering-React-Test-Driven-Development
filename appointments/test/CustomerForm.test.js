import React from "react"
import { createContainer } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'

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

  it('renders the first name field as text box', () => {
      render(<CustomerForm />)
      expectToBeInputFieldOfTypeText(firstNameField())
  })

  it('includes the existing value for the first name', () => {
    render(<CustomerForm firstName="Ashley" />)
    expect(firstNameField().value).toEqual('Ashley')
  })

  it('renders a label field for the first name field', () => {
    render(<CustomerForm />)
    expect(labelFor('firstName')).not.toBeNull()
    expect(labelFor('firstName').textContent).toEqual('First name')
  })

  it('assigns an id to the first name field', () => {
    render(<CustomerForm />)
    expect(firstNameField().id).toEqual('firstName')
  })

  it('assings an id that matches the label id to the first name field', () => {
    render(<CustomerForm />)
    expect(firstNameField().id).toEqual(labelFor('firstName').htmlFor)
  })
})