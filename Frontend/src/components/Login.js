import { Link } from "react-router-dom";

let LINK_STYLE = {
    color: 'white',
    textDecoration: 'none'
};

export function Login(props)
{
    return (
        <div>
            <h1>Login page</h1>

            <div className="w-50 mx-auto">
                <form action="/login-server" method="POST">
                    <div className="mb-2">
                        <label className="form-label">Username:</label>
                        <input name="username" className="form-control" type="text" />
                    </div>
                    
                    <div className="mb-2">
                        <label className="form-label">Password:</label>
                        <input name="password" className="form-control" type="password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>

            <hr />

            <button className="btn btn-primary">
                <Link
                    to='/'
                    style={LINK_STYLE}
                >
                    Homepage
                </Link>
            </button>
        </div>
    );
}
