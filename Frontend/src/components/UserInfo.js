import React from "react";
import "./styles.css";

let GITHUB_USER_DETAILS_API = "https://api.github.com/users/";

export default class UserInfo extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            request_complete: false,
            response_success: false,
            name: null,
            img: null,
            created_at: null,
            followers: null,
            following: null
        };
    }

    componentDidMount()
    {
        this.fetch_details();
    }

    fetch_details = () => {
        let req = new XMLHttpRequest();
        req.open("GET", GITHUB_USER_DETAILS_API + this.props.u_id);
        req.send();
        req.onload = () => {
            let data = JSON.parse(req.response);

            this.setState({
                request_complete: true,
                name: data.login,
                img: data.avatar_url,
                created_at: data.created_at,
                followers: data.followers,
                following: data.following
            });
        }
    }

    close_modal = () => {
        this.props.close_user_info();
    }

    render()
    { 
        return (
            <div id="myModal" className="user-modal">
                <div className="user-modal-content">
                    {this.state.request_complete ? (
                    <>
                        <img
                            className="user-poster-img"
                            src={this.state.img}
                            alt="User Poster"
                        />
                        <div>
                            <span className="user-close" onClick={this.close_modal}>&times;</span>
                            <h2>{this.state.name}</h2>
                        </div>
                        <div className="user-modal-body">
                            <p className="mt-2">Created at: {this.state.created_at}</p>
                            <p className="mb-2">Followers: {this.state.followers}</p>
                            <p className="mb-2">Following: {this.state.following}</p>
                        </div>
                    </>
                    ) : (
                        <h2>Loading details.</h2>
                    )}

                </div>
            </div>
        )
    };
}
