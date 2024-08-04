import {combineReducers} from "redux"
function loginReducer(state,action){
    switch (action.type) {
        case "LOGIN":
            return{
                ...state,
                isLoggedIn:true
            }
        case "LOGOUT":
            return{
                ...state,
                isLoggedIn:false
            }
        default:
            return{
                ...state,
                isLoggedIn:false
            }
    }
}
let rootReducer = combineReducers({
    isLoggedIn:loginReducer
})
export default rootReducer;