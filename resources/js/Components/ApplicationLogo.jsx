import React from "react";

export default function ApplicationLogo(props) {
    return (
        <img
            src="/strange-notepad-icon_trans.png"
            alt="Strange Notepad Logo"
            style={{ display: "block", ...props.style }}
            {...props}
        />
    );
}
