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
      expect(field('firstName').value).toEqual('value')
    })
  } 

  describe('first name field', () => {
    itRendersAsATextBox('firstName')
    itIncludesTheExistingValue('firstName')


    it('renders a label', () => {
      render(<CustomerForm />)
      expect(labelFor('firstName')).not.toBeNull()
      expect(labelFor('firstName').textContent).toEqual('First name')
    })

    it('assigns an id', () => {
      render(<CustomerForm />)
      expect(field('firstName').id).toEqual('firstName')
    })

    it('assings an id that matches the label id', () => {
      render(<CustomerForm />)
      expect(field('firstName').id).toEqual(labelFor('firstName').htmlFor)
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
      ReactTestUtils.Simulate.change(field('firstName'), {
        target: {value: 'Jamie'}
      })
      ReactTestUtils.Simulate.submit(form('customer'))
    })
  })
})