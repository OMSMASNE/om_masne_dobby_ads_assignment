import React from "react";
import { Link } from "react-router-dom";

let LINK_STYLE = {
    color: 'white',
    textDecoration: 'none'
};

export default class Homepage extends React.Component
{
    render()
    {
        return (
            <div>
                <h1 className="text-success">GitHub Information Fetcher</h1>

                <hr />

                <button className="btn btn-primary">
                    <Link
                        to='/login'
                        style={LINK_STYLE}
                    >
                        Login
                    </Link>
                </button>

                <br />
                <br />
                
                <button className="btn btn-secondary">
                    <Link
                        to='/signup'
                        style={LINK_STYLE}
                    >
                        Signup
                    </Link>
                </button>

                <hr />

                <h1 className="text-warning">
                    <p>Note: This website uses unauthenticated API for fetching information from GitHub.</p>
                    <p>So, a rate limit is applied.</p>
                </h1>

            </div>
        );
    }
}
