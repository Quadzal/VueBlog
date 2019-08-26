import store from "../store"

const is_authenticated = function(Router, next, url){
    store.state.auth.token
    ? Router.push(url)
    : next();
}

export default is_authenticated;