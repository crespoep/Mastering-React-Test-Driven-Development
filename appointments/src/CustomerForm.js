import React, {useState} from "react"

export const CustomerForm = ({
  firstName,
  lastName,
  onSubmit
}) => {
  const [customer, setCustomer] = useState({firstName})
 
  const handleChangeFirstName = ({target}) => setCustomer(customer => ({
    ...customer,
    firstName: target.value
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
          readOnly
      />
    </form>
  )
}