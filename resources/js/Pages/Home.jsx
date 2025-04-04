import React from "react";

const Home = (props) => {
    return (
        <>
            <h1>メモ帳内容</h1>
            <ul>
                {props.notepads.map((notepad) => (
                    <li key={notepad.id}>
                        <p>{notepad.name}</p>
                        <p>{notepad.created_at}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Home;
