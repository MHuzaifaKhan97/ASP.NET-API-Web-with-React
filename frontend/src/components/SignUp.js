import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { LoginContext } from './LoginContext';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    let { isLoggedIn } = useContext(LoginContext);

    function handleSubmit(e) {
        e.preventDefault()
        console.log(email)
        console.log(mobile)
        console.log(password)

        fetch("http://localhost:54199/api/customer", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CustomerID: null,
                Email: email,
                Mobile: mobile,
                Password: password,
            })
        }).then((res) => res.json())
            .then((result) => {
                // console.log(result)
                if (result) {
                    setLoggedIn(true)
                }
                else { setLoggedIn(false) }
            })
            .catch((error) => console.log("Failed"))

    }
    useEffect(() => {
        async function getData() {
            const api = await fetch('http://localhost:54199/api/customer')
            const data = await api.json();
            console.log(data);
        }
        getData();
    }, [])

    if(loggedIn) return <Redirect to="/signin" />
    else if (isLoggedIn) return <Redirect to="/home" />
    return (
        <>
            <h1 className="mt-5">Payment System - Sign Up</h1>
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
                                        type="number"
                                        placeholder="Enter Mobile..."
                                        name="mobile"
                                        value={mobile}
                                        className="form-control"
                                        onChange={(e) => setMobile(e.target.value)}

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
                                    <button type="submit" className="btn btn-success">Create Customer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default SignUp;