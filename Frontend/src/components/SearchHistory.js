import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    remove
} from '../features/historySlice';

export default function SearchHistory()
{
    const history = useSelector((state) => state.history.value);
    
    const dispatch = useDispatch();

    function remove_user(name)
    {
        let should_remove = window.confirm("Remove user?");

        if(should_remove)
        {
            dispatch(remove(name))
        }
    }

    return (
        <div>
            <h1>Search history</h1>

            <div
                className="w-50 mx-auto"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}
            >
                {
                    history.map((item, i) => {
                        return (
                            <div>
                                <button
                                    className="btn btn-secondary mx-2 my-2"
                                    onClick={() => remove_user(item)}
                                >
                                    {item}
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
