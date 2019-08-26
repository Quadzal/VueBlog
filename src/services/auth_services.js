import store from "../store"

const authRoleBased = function(Router, Urls, Roles ) {
    return new Promise(function(resolve, reject){
        let token = store.state.auth.token;
        let user = store.state.auth.user;
        if (token) {
            store.dispatch("checkToken", token)
            .then((response) => {
                user.role = response.data.user.role;
                Roles.includes(user.role.toLowerCase())
                ? resolve(true)
                : Router.push(Urls.unauth_url);
            })
            .catch((err) => Router.push(Urls.unauth_url));
        }
        else{
            Router.push(Urls.login_url);
        }
        
    })
    
}

export default authRoleBased;