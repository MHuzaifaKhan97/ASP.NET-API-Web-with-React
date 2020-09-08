import React, { createContext, useReducer } from 'react';
import LoginReducer from './LoginReducer';
import { CustomerReducer } from './LoginReducer';

let lOGGED_IN = false;
export const LoginContext = createContext(lOGGED_IN);
const initData = [
    {payload:
    { "CustomerID": 1, "Email": "huzaifa@gmail.com", "Mobile": "03122282334", "Password": "Huzaifakhan@#" }
    }
];
export const CustomerContext = createContext(initData)


export const LoginProvider = ({ children }) => {

    let [state, dispatch] = useReducer(LoginReducer, lOGGED_IN);
    let [customer, customerDispatch] = useReducer(CustomerReducer, initData);

    console.log(state);
    function getCustomer(custObj) {
        customerDispatch({
            type: "GET_CUSTOMER",
            payload: custObj
        })
    }
    // console.log("State: " + state)
    function loggedIn() {
        dispatch({ type: 'LOGGED_IN', login: true });
    }
    function loggedOut() {
        dispatch({ type: "LOGGED_OUT", login: false })
    }

    return (
        <LoginContext.Provider value={{
            isLoggedIn: state,
            loggedIn: loggedIn,
            loggedOut: loggedOut,
            customer: customer,
            getCustomer: getCustomer
        }}
        >
            {children}
        </LoginContext.Provider>
    )
}