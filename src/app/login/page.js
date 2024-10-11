'use client';

import { useState } from 'react';
import InfoSVG from '../assets/info-circle.svg';
import Image from 'next/image';

const FloatingBox1 = () => {
    return (
        <div className="floating-box1">
        </div>
    );
};

const FloatingBox2 = () => {
    return (
        <div className="floating-box2">
        </div>
    );
}

const NoticeButton = () => {
    const [clickCount, setClickCount] = useState(1);

    return (
        <>
            <button className={"notice-button " + (clickCount == 1 ? "btn-jump " : "") + (!(clickCount % 2) ? "btn-iexpand" : "")} onClick={() => setClickCount(clickCount + 1)}>
                {
                    clickCount % 2 ?
                        <Image src={InfoSVG} alt="Info" width={20} height={20} />
                        :
                        <p>
                            Notice: Login has not been implemented yet. <br />
                            <code>username: admin</code> <br />
                            <code>password: admin</code>
                        </p>
                }
            </button>
        </>
    );
}

export default function Login() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    let sessName = sessionStorage.getItem("username");
    let sessPassword = sessionStorage.getItem("password");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === "admin" && password === "admin") {
            sessionStorage.setItem("username", name);
            sessionStorage.setItem("password", password);

            window.location.href = "/";
        } else {
            alert("Invalid credentials");
            return;
        }
    }

    const logout = () => {
        sessionStorage.clear();
        window.location.href = "/login";
    }

    return (
        <div id="login-main">
            <FloatingBox1 />
            <FloatingBox2 />
            <NoticeButton />
            {
                sessName && sessPassword ?
                    <div className="login-container">
                        <h1>Already Logged In</h1>
                        <hr className="line-grow" />
                        <p>You are already logged in as <code>{sessName}</code></p>
                        <button onClick={() => window.location.href = "/"}>Go to Home</button>
                        <button onClick={() => logout()} className="btn-red">Logout</button>
                    </div>
                    : <div className="login-container">
                        <h1>Login</h1>
                        <hr className="line-grow" />
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit">Login</button>
                        </form>
                    </div>
            }
        </div>
    );
};