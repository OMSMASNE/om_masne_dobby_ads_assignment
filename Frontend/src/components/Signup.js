import { Link } from "react-router-dom";

let LINK_STYLE = {
    color: 'white',
    textDecoration: 'none'
};

export function Signup(props)
{
    return (
        <div>
            <h1>Signup page</h1>

            <div className="w-50 mx-auto">
                <form action="/signup-server" method="POST">
                    <div className="mb-2">
                        <label className="form-label">Username:</label>
                        <input name="username" className="form-control" type="text" />
                    </div>
                    
                    <div className="mb-2">
                        <label className="form-label">Password:</label>
                        <input name="password" className="form-control" type="password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Create account</button>
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
