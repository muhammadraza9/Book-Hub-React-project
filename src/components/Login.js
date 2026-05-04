import { Auth } from "./Auth";

function Login(props) {
    return <Auth isSignup={false} showAlert={props.showAlert} />;
}

export default Login;
