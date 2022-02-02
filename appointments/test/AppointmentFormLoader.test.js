import React from 'react'
import 'whatwg-fetch'
import { createContainer } from './domManipulators'
import { fetchResponseOk } from './spyHelpers'
import * as AppointmentFormExports from '../src/AppointmentForm'
import {
  AppointmentFormLoader
} from '../src/AppointmentFormLoader'

describe('AppointmentFormLoader', () => {
  let render, renderAndWait, container

  const today = new Date()
  const availableTimeSlots = [
    { startsAt: today.setHours(9, 0, 0, 0) }
  ]
  beforeEach(() => {
    ({ render, renderAndWait, container } = createContainer())
    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk(availableTimeSlots))
    jest
      .spyOn(AppointmentFormExports, 'AppointmentForm')
      .mockReturnValue(null)
  })

  afterEach(() => {
    window.fetch.mockRestore()
    AppointmentFormExports.AppointmentForm.mockRestore()
  })

  it('fetches data when component is mounted', async () => {
    await renderAndWait(<AppointmentFormLoader />)
    expect(window.fetch).toHaveBeenCalledWith(
      '/availableTimeSlots',
      expect.objectContaining({
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      })
    )
  })

  it('initially passes no data to AppointmentForm', async() => {
    await renderAndWait(<AppointmentFormLoader />)
    expect(
      AppointmentFormExports.AppointmentForm
    ).toHaveBeenCalledWith(
      { availableTimeSlots: [] },
      expect.anything()
    )
  })

  it('displays time slots that are fetched on mount', async () => {
    await renderAndWait(<AppointmentFormLoader />)

    expect(
      AppointmentFormExports.AppointmentForm
    ).toHaveBeenCalledWith(
      {
        availableTimeSlots
      },
      expect.anything()
    )
  })
})