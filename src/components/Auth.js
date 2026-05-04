import { useState } from "react"
import { useNavigate } from "react-router-dom";


export function Auth(props) {

         const {isSignup, showAlert} = props;

    //const [isSignup, setIsSignup] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let users = JSON.parse(localStorage.getItem("users") || "[]");

        if (isSignup) {

            const userExists = users.find(
                user => user.email === email
            );
            if (userExists) {
                showAlert?.("User already exists !", "Error");
                return;
            }
            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            //setIsSignup(false);
            showAlert?.("Signup successfully", "Success");
            navigation("/login");
        }
        else {
            const user = users.find(
                user => user.email === email && user.password === password
            );
            if (!user) {
                showAlert?.("Invalid Details", "Error");
                return;
            }
            // localStorage.setItem("currentUser", true);
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigation("/");
        }

    };
    return (
        <>

            <div className='mt-3'>
                <h2 className='my-2'>Create an Account to use Book-Hub</h2>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="mt-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="name" className="form-control" id="name" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} aria-describedby="name" />
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" id="email" name="email" autoComplete="username" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-success" >{isSignup ? "Signup" : "Login"}</button>
                </form>
            </div>

        </>
    )



    // useEffect(()=> {
    // if(props.login===true){
    //     setText('login')
    // } else {
    //     setText('signup')
    // }
    // }, [])


    //     return <div>
    // {text}
    //     </div>
}
