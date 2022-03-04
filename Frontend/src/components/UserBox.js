import React from "react";

import { useDispatch } from "react-redux";

import {
    add
} from '../features/historySlice';


export function UserBox(props)
{
    const dispatch = useDispatch();

    function show_user_info()
    {
        props.show_details(props.name);

        add_user(props.name);
    }

    function add_user(name) 
    {
        dispatch(add(name));
    }

    return (
        <div className="mb-2 px-2">
            <button
                onClick={() => show_user_info(props.name)}
            >
                <img src={props.img} width="20vw"/>
                <h5>{props.name}</h5>
            </button>
        </div>
    );
}