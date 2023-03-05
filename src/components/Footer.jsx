import React from "react";

export const Footer = () => {
    const now = new Date()
    const year = now.getFullYear()
    return (
        <>
        <footer className="footer">
            <p>&copy; {year} ToDoアプリ</p>
        </footer>
        </>
    )
}