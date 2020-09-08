const LoginReducer = (state, action) => {
    switch (action.type) {
        case 'LOGGED_IN': return action.login
        case 'LOGGED_OUT': return action.login
        default: return state;
    }
}
export const CustomerReducer = (state, action) => {
    switch (action.type) {
        case "GET_CUSTOMER": return [ action.payload]
        default: return state
    }
}

export default LoginReducer;