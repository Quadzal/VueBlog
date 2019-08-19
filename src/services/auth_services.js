import store from "../store"

const authRoleBased = function(Router, Urls, Token, Role ) {
    return new Promise(function(resolve, reject){
        if (Object.keys(store.state.auth.user).length > 0) {

            store.state.auth.user.role == Role ? resolve(true) : Router.push(Urls.unauth_url);
        }

        else{
            if (Token) {
                store.dispatch("checkToken", Token)
                .then((response) => {

                    response.data.user.role == Role ? resolve(true) : Router.push(Urls.unauth_url);
                })
                .catch((err) => {
                    Router.push(Urls.login_url);
                })
            }
    
            else{
                Router.push(Urls.login_url);
            }
        }
        
    })
    
}

export default authRoleBased;