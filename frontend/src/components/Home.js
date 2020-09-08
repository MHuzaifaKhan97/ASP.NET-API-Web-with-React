import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import AddTransaction from './AddTransaction';
import { LoginContext } from './LoginContext';
import SessionTime from './SessionTime';

// import { CustomerReducer } from './LoginReducer';

let id = 0;
const Home = (props) => {

    let { isLoggedIn, loggedIn, loggedOut } = useContext(LoginContext);
    let { customer, getCustomer } = useContext(LoginContext);
    const [modalShow, setModalShow] = useState(false);
    // const { loginSuccess, customer } = props;
    // console.log("is Logged In " + isLoggedIn)
    const [transactions, setTransaction] = useState([{}]);

    console.log(isLoggedIn)
    console.log(customer)
    let cust = customer[0].payload;
    console.log(cust.CustomerID)

    useEffect(() => {
        const id = cust.CustomerID;
        console.log(id);
        function getData() {
            fetch(`http://localhost:54199/api/transaction/${id}`)
                .then((res) => res.json())
                .then((result) => {
                    setTransaction(result);
                    console.log(result)
                })
                .catch(error => console.log("Error"))
            // setActiveCustomer(customer)
            // console.log("Customer: " + customer)
            // console.log(result);
        }
        getData()
    }, [])

    function setUserLoggedOut() {
        if (isLoggedIn) {
            console.log("logout")
            loggedOut();
        }
        else {
            console.log("not logout")
        }
    }
    function addModalClose() {
        setModalShow(false);
    }
    console.log(isLoggedIn)
    
    if (!isLoggedIn) return <Redirect to="/signin" />
    return (
        <>
            {/* {loginSuccess ? */}
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h1 className="mt-4 text-left">Payment System - Home </h1>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-danger text-right mt-4" onClick={() => setUserLoggedOut()} >Logout</button>
                        <SessionTime loggedOut={loggedOut} isLoggedIn={isLoggedIn} />
                    </div>
                </div>
                <h3 className="text-left">Welcome: {customer[0].payload.Email}</h3>
                <div className="form-group">
                    <Button variant="primary" onClick={() => setModalShow(true)} >
                        Pay Now
                    </Button>
                    <AddTransaction
                        customer={cust} 
                        show={modalShow}
                        onHide={addModalClose} />
                </div>

                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>CustomerID</th>
                            <th>Amount</th>
                            <th>Bank Name</th>
                            <th>Merchant Name</th>
                            <th>Currency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions ? transactions.map((transaction, index) => {
                            return <tr key={index}>
                                <td>{transaction.TransactionID}</td>
                                <td>{transaction.CustomerID}</td>
                                <td>{transaction.Amount}</td>
                                <td>{transaction.BankName}</td>
                                <td>{transaction.MerchantName}</td>
                                <td>{transaction.Currency}</td>
                            </tr>
                        }) : null}
                    </tbody>
                </Table>

            </div>
            {/* : <Redirect to="/" /> */}

        </>
    )

}
export default Home;