import { Auth } from "./Auth";
function Signup(props) {

    return <Auth isSignup={true} showAlert={props.showAlert} />;
}

export default Signup;
