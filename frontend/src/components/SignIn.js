import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Home from './Home';
import { LoginContext } from './LoginContext';
// import { CustomerReducer } from './LoginReducer';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [customers, setCustomers] = useState([{}]);
    const [loginCustomer, setLoginCustomer] = useState([]);

    let { isLoggedIn, loggedIn } = useContext(LoginContext);
    let { customer, getCustomer } = useContext(LoginContext);
    // console.log(getCustomer)

    useEffect(() => {
         function getData() {
            fetch("http://localhost:54199/api/customer")
            .then((res) => res.json())
            .then((result) =>{
            setCustomers(result)
            })            
        }
        getData()
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        console.log(email, password);

        for (var i = 0; i < customers.length; i++) {
            if (email.toLowerCase() === customers[i].Email && password === customers[i].Password) {
                console.log("Success")
                setLoginCustomer(customers[i]);
                loggedIn();
                getCustomer({
                    type: "GET_CUSTOMER",
                    payload: customers[i]
                })
                console.log(customers[i])
                break;
            }
            else {
                console.log("Failed")
            }
        }
        // console.log(loginCustomer)
    }
    
    if (isLoggedIn) return <Redirect to="/home" />
    // if (isLoggedIn) return <Route to="/home" component={() => <Home />} />
    return (
        <>
            <h1 className="mt-5">Payment System - Sign In</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-left my-5">
                        <div className="p-3 py-4" style={{ boxShadow: '2px 2px 5px black' }}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Enter Email..."
                                        name="email"
                                        value={email}
                                        className="form-control"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        placeholder="Enter Password..."
                                        name="password"
                                        value={password}
                                        className="form-control"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success">Sign In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignIn;