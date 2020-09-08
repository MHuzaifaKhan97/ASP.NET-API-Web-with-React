import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

var options = [
    { value: 'Meezan Bank', label: 'Meezan Bank' },
    { value: 'Askari Bank', label: 'Askari Bank' },
    { value: 'Habib Bank', label: 'Habib Bank' },
    { value: 'UBL Bank', label: 'UBL Bank' }
];

const AddTransaction = (props) => {

    const [amount, setAmount] = useState(0);
    const [currency,setCurrency] = useState("");
    const [bankName,setBankName] = useState("Meezan Bank");
    const [merchant,setMerchant] = useState("Merchant 1");

    console.log(props);
    function ID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:54199/api/transaction', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TransactionID: ID(),
                CustomerID:props.customer.CustomerID,
                Amount:Number(amount),
                BankName:bankName,
                MerchantName:merchant,
                Currency:currency
            })
        })
            .then(response => response.json())
            .then(result => {
                alert(result)
            }, (error) => {
                alert("Failed"+error)
            });
        console.log(ID())
        console.log(ID(),props.customer.CustomerID,amount,currency,bankName,merchant,currency);

    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Pay Now
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        required
                                        placeholder="Enter Amount..."
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="radio"
                                        selected
                                        name="currency"
                                        value="USD"
                                        className="mx-2"
                                        onChange={(e) => setCurrency(e.currentTarget.value)}
                                        /> USD
                                    <input
                                        type="radio"
                                        name="currency"
                                        className="mx-2"
                                        onChange={(e) => setCurrency(e.currentTarget.value)}
                                        value="PKR"
                                    /> PKR
                                </div>
                                <div className="form-group">
                                    <select className="form-control" onChange={(e)=> setBankName(e.target.value)} >
                                        <option value="Meezan Bank">Meezan Bank</option>
                                        <option value="Habib Bank">Habib Bank</option>
                                        <option value="Askari Bank" >Askari Bank</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select className="form-control"  onChange={(e)=> setMerchant(e.target.value)} >
                                        
                                        <option value="Merchant 1">Merchant 1</option>
                                        <option defaultValue="Merchant 1" value="Merchant 2">Merchant 2</option>
                                        <option value="Merchant 3">Merchant 3</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary" type="submit">Pay Now</button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default AddTransaction;