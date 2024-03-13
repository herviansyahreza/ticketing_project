import React from "react";
import { Link } from "react-router-dom";

export default function Ticket() {
    return (
        <div>
            <p>This is ticket page</p>
            <Link to="/" className="underline">
                Go to Dashboard
                </Link>
        </div>
    );
}