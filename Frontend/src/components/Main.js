import React from "react";

import axios from 'axios';

import SearchHistory from "./SearchHistory";
import UserInfo from "./UserInfo";
import { UserBox } from "./UserBox";

let GITHUB_USERS_API = 'https://api.github.com/search/users?q=';

export default class Main extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            authenticated: false,
            current_search_term: '',
            current_search_result: null,
            current_user: null,
            show_user_info: false
        };
    }

    search_users = (event) => {
        this.setState({ current_search_term: event.target.value });

        if(event.target.value === '')
            return false;

        let search_query = event.target.value;

        axios.get(GITHUB_USERS_API + search_query)
        .then((response) => {
            let result = response.data.items.slice(0, 10);

            this.setState({
                current_search_result: result
            });
        })
    }

    show_user_info = (name) => {
        this.setState({
            current_user: name,
            show_user_info: true
        });
    }

    close_user_info = () => {
        this.setState({
            current_user: null,
            show_user_info: false
        });
    }

    render()
    {
        return (
            <div>
                <h1>GitHub Information Fetcher</h1>

                <div
                    style={{
                        position: "absolute",
                        right: "10px"
                    }}
                >
                    <form action="/logout-server" method="POST">
                        <button className="btn btn-danger" type="submit">Logout</button>
                    </form>
                </div>

                <input
                    className="form-control w-50 mx-auto my-5"
                    placeholder="Start typing to search for users..."
                    onChange={this.search_users}
                    value={this.state.current_search_term}
                />

                <hr />

                {
                    this.state.current_search_result ? (
                        <h4 className="text-danger mb-5">Click on the user box to add to your history.</h4>
                    )
                    :
                    ""
                }

                <div
                    className="w-50 mx-auto"
                    style = {{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flexWrap: "wrap"
                    }}
                >
                    {
                        this.state.current_search_result ? (
                            this.state.current_search_result.map((item, i) => {
                                return (
                                    <UserBox
                                        key={i}
                                        img={item.avatar_url}
                                        name={item.login}
                                        show_details={this.show_user_info}
                                    />
                                )
                            })
                        )
                        :
                        ""
                    }
                </div>

                <hr />

                <SearchHistory />

                {
                    this.state.show_user_info ? (
                        <UserInfo
                            u_id={this.state.current_user}
                            close_user_info = {this.close_user_info}
                        />
                    )
                    :
                    ""
                }
            </div>
        );
    }
}
