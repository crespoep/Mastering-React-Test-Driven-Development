import React, {useState} from "react"

export const CustomerForm = ({
  firstName,
  lastName,
  phoneNumber,
  onSubmit
}) => {
  const [customer, setCustomer] = useState({firstName, lastName, phoneNumber})
 
  const handleChangeFirstName = ({target}) => setCustomer(customer => ({
    ...customer,
    firstName: target.value
  }))

  const handleChangeLastName = ({target}) => setCustomer(customer => ({
    ...customer,
    lastName: target.value
  }))

  const handleChangePhoneNumber = ({target}) => setCustomer(customer => ({
    ...customer,
    phoneNumber: target.value
  }))

  return (
    <form id="customer" onSubmit={() => onSubmit(customer)}>
      <label htmlFor="firstName">First name</label>
      <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChangeFirstName}
      />
      <label htmlFor="lastName">Last name</label>
      <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChangeLastName}
      />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
          id="phoneNumber"
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChangePhoneNumber}
      />
    </form>
  )
}