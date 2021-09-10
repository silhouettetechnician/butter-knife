
import React, { useState, useContext, useEffect } from 'react';
import StoreContext from '../../../contexts/Context'
import { Formik, ErrorMessage, Form } from 'formik'
import { Select } from '../../../components/VariantSelector'
import { LoginInput } from '../../../components/StyledComponents'
import { useMutation, gql } from '@apollo/client';
import Flex from '../../../styles/Flex'
import { Modal } from "react-responsive-modal";
import axios from 'axios'

const CUSTOMER_CREATE_ADDRESS = gql`
mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
  customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
    customerAddress {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`
const BangersFont = {
    fontFamily: 'bangers',
    textAlign: 'center'
}

const AddAddressForm = () => {
    const [addAdressForm, setAddAdressForm] = useState(false);
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [companyInput, setCompanyInput] = useState("");
    const [addressInput, setAddressInput] = useState("");
    const [apartmentInput, setApartmentInput] = useState("");
    const [cityInput, setCityInput] = useState("");
    const [countryInput, setCountryInput] = useState("");
    const [zipInput, setZipInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");

    const { customerAccessToken } = useContext(StoreContext);
    const [customerCreateAddress] = useMutation(CUSTOMER_CREATE_ADDRESS)
    const [countriesAll, setCountriesAll] = useState([]);

    const getLocations = () => {
        return axios('https://restcountries.eu/rest/v2/all')
    }
    useEffect(() => {
        getLocations().then(({ data }) => { setCountriesAll(data) })
    }, []);

    const handleAddressChange = values => {
        customerCreateAddress({
            variables: {
                "customerAccessToken": customerAccessToken.accessToken,
                "address": {
                    address1: values.address,
                    city: values.city,
                    company: values.company,
                    country: values.country,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: values.phone,
                    zip: values.postcode,
                }
            }
        }).then((result) => {
            setAddAdressForm(!addAdressForm)
        })
    }

    return (
        <>
            <button onClick={() => setAddAdressForm(!addAdressForm)}>Add a new address</button>
            {
                addAdressForm && (
                    <Modal open={addAdressForm} onClose={() => setAddAdressForm(!addAdressForm)}><div className="columns is-centered">
                        <Flex style={{ textAlign: 'center' }} justifyCenter alignCenter>
                            <Formik
                                initialValues={{
                                    firstName: firstNameInput,
                                    lastName: lastNameInput,
                                    company: companyInput,
                                    address: addressInput,
                                    apartment: apartmentInput,
                                    city: cityInput,
                                    postcode: zipInput,
                                    country: countryInput,
                                    phone: phoneInput,
                                }}
                                // validationSchema={FormSchema}
                                onSubmit={
                                    (actions) => {
                                        handleAddressChange(actions)
                                    }
                                }
                            >
                                {props => (
                                <Form onSubmit={props.handleSubmit}>
                                    <h1 style={BangersFont}>ADD ADDRESS</h1>
                                    <Flex>
                                        <div className="control">
                                            <LoginInput border='2px solid lightgrey' placeholder='First Name' className="input" value={firstNameInput} type="text" onChange={(e) => setFirstNameInput(e.target.value)} />
                                        </div>
                                        <div className="control">
                                            <LoginInput border='2px solid lightgrey' placeholder='Last Name' className="input" value={lastNameInput} type="text" onChange={(e) => setLastNameInput(e.target.value)} />
                                        </div>
                                    </Flex>
                                    <Flex>
                                        <div className="control">
                                            <LoginInput border='2px solid lightgrey' placeholder='Company' className="input" value={companyInput} type="text" onChange={(e) => setCompanyInput(e.target.value)} />
                                        </div>
                                        <div className="control">
                                            <LoginInput border='2px solid lightgrey' placeholder='Address' className="input" value={addressInput} type="text" onChange={(e) => setAddressInput(e.target.value)} />
                                        </div>
                                    </Flex>
                                    <Flex>
                                        <div className="control">
                                            <LoginInput border='2px solid lightgrey' placeholder='Apartment' className="input" value={apartmentInput} type="text" onChange={(e) => setApartmentInput(e.target.value)} />
                                        </div>
                                        <div className="control">
                                            <LoginInput border='2px solid lightgrey' placeholder='City' className="input" value={cityInput} type="text" onChange={(e) => setCityInput(e.target.value)} />
                                        </div>
                                    </Flex>
                                    <div className="control">
                                        <div className="select">
                                            <Select value={countryInput} onChange={(e) => setCountryInput(e.target.value)} onBlur={(e) => setCountryInput(e.target.value)} style={{ minWidth: "140px", maxWidth: "310px" }}>
                                                {
                                                    countriesAll.map((country) => (
                                                        <option value={country.name}>{country.name}</option>
                                                    ))
                                                }
                                            </Select>
                                        </div>
                                        <div className="control">
                                            <LoginInput border='2px solid lightgrey' placeholder="Postcode" className="input" value={zipInput} type="text" onChange={(e) => setZipInput(e.target.value)} />
                                        </div>
                                        <div className="control">
                                            <LoginInput border='2px solid lightgrey' placeholder="Phone" className="input" value={phoneInput} type="text" onChange={(e) => setPhoneInput(e.target.value)} />
                                        </div>
                                        <label className="checkbox" htmlFor="checkboxDefaultAddress">
                                            <input type="checkbox" />
                                            Set as default address
                                        </label>
                                    </div>

                                    <button
                                        className="button is-dark"
                                        type='submit'
                                    >
                                        Add address</button>
                                    <button className="link-button" onClick={() => setAddAdressForm(!addAdressForm)} onKeyPress={() => setAddAdressForm(!addAdressForm)}>Cancel</button>
                                </Form>
                                )}
                            </Formik>
                        </Flex>
                    </div>
                    </Modal>
                )}
        </>
    );
};

export default AddAddressForm;