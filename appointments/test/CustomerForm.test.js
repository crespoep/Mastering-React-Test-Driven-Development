import React from "react"
import { createContainer } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'
import ReactTestUtils from 'react-dom/test-utils'

describe('CustomerForm', () => {
  let render, container

  const form = id => container.querySelector(`form[id="${id}"]`)

  const field = name => form('customer').elements[name]

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

  const itRendersAsATextBox = (fieldName) => {
    it('renders as text box', () => {
      render(<CustomerForm />)
      expectToBeInputFieldOfTypeText(field(fieldName))
    })
  }

  const itIncludesTheExistingValue = (fieldName) => {
    it('includes the existing value', () => {
      //value could be Ashley too
      render(<CustomerForm {...{[fieldName]: 'value'}} />)
      expect(field(fieldName).value).toEqual('value')
    })
  } 

  const itRendersALabel = (fieldName, textValue) => {
    it('renders a label', () => {
      render(<CustomerForm />)
      expect(labelFor(fieldName)).not.toBeNull()
      expect(labelFor(fieldName).textContent).toEqual(textValue)
    })
  }

  const itAssignsAnId = (fieldName) => {
    it('assigns an id', () => {
      render(<CustomerForm />)
      expect(field(fieldName).id).toEqual(fieldName)
    })
  }

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) => {
    it('assings an id that matches the label id', () => {
      render(<CustomerForm />)
      expect(field(fieldName).id).toEqual(labelFor(fieldName).htmlFor)
    })
  }

  const itSavesExistingValueWhenSubmitted = (fieldName, textValue) => {
    it('saves existing value when submitted', () => {
      expect.hasAssertions()
      render(
        <CustomerForm
          {...{[fieldName]: textValue}}
       
          onSubmit={props =>
            expect(props[fieldName]).toEqual(textValue)
          }
        />
      )
      ReactTestUtils.Simulate.submit(form('customer'))
    })
  }

  const itSavesNewValueWhenSubmitted = (fieldName, newValue) => {
    it('saves new value when submitted', () => {
      expect.hasAssertions()
      render(
        <CustomerForm
          {...{[fieldName]: 'Test name'}}
          onSubmit={props => 
            expect(props[fieldName]).toEqual(newValue)
        }
        />
      )
      ReactTestUtils.Simulate.change(field(fieldName), {
        target: {value: newValue, name: fieldName}
      })
      ReactTestUtils.Simulate.submit(form('customer'))
    })
  }

  describe('first name field', () => {
    itRendersAsATextBox('firstName')
    itIncludesTheExistingValue('firstName')
    itRendersALabel('firstName', 'First name')
    itAssignsAnId('firstName')
    itAssignsAnIdThatMatchesTheLabelId('firstName')
    itSavesExistingValueWhenSubmitted('firstName', 'Ashley')
    itSavesNewValueWhenSubmitted('firstName', 'Jamie')
  })

  describe('last name field', () => {
    itRendersAsATextBox('lastName')
    itIncludesTheExistingValue('lastName')
    itRendersALabel('lastName', 'Last name')
    itAssignsAnId('lastName')
    itAssignsAnIdThatMatchesTheLabelId('lastName')
    itSavesExistingValueWhenSubmitted('lastName', 'Ashley')
    itSavesNewValueWhenSubmitted('lastName', 'Jamie')
  })

  describe('phoneNumber', () => {
    itRendersAsATextBox('phoneNumber')
    itIncludesTheExistingValue('phoneNumber')
    itRendersALabel('phoneNumber', 'Phone number')
    itAssignsAnId('phoneNumber')
    itAssignsAnIdThatMatchesTheLabelId('phoneNumber')
    itSavesExistingValueWhenSubmitted('phoneNumber', '12345')
    itSavesNewValueWhenSubmitted('phoneNumber', '12345')
  })
})