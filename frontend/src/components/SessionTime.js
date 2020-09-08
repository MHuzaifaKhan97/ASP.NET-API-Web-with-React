import React, { useEffect, useState, useContext } from 'react';
import { LoginContext } from './LoginContext';



class SessionTime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            min: Number(localStorage.getItem('min')),
            sec: Number(localStorage.getItem('sec')),
        }
       
    }

    componentDidMount() {
        this.timer();
    }
    timer = () => {
        setInterval(() => {
            this.setState({ sec: this.state.sec + 1 })
            localStorage.setItem("sec", this.state.sec);

            if (this.state.sec > 59) {
                this.setState({ min:this.state.min + 1, sec: 0 })
                localStorage.setItem("sec", this.state.sec);
                localStorage.setItem("min", this.state.min);
                // console.log("minuteUpdate")
            }
            else if (this.state.min > 59) {
                this.setState({ sec: 0, min: 0 })
                localStorage.setItem("sec", 0);
                localStorage.setItem("min", 0);
                this.props.loggedOut();
            }
        }, 1000)
    }

    render() {
        return (
            <div>
            <p><small className="text-danger">Session ends in 30 min</small> {this.state.min}:{this.state.sec}</p>
            </div>
            )
    }
}



// const SessionTime = () => {

//     let { loggedOut } = useContext(LoginContext);

//     let [sec, setSec] = useState(0);
//     let [min, setMin] = useState(0);
//     useEffect(() => {
//         setInterval(() => {
//             setSec(++sec);
//             // localStorage.setItem("sec",sec);
//             if (sec > 19) {
//                 setSec(0)
//                 setMin(min++)
//                 // localStorage.setItem("sec",sec);
//             }
//             if (min > 3) {
//                 // localStorage.setItem("sec",0);
//                 loggedOut();
//             }
//         }, 1000)
//     },)
//     return (
//         <div>
//             {min}:{sec}
//         </div>
//     )
// }
export default SessionTime;