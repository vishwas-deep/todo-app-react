import { useState } from "react";
import "./contact.scss"


const Contact = () => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleClick = () => {
        alert(`Hello ${name}, your message "${message}" with "${email}" has ben sent to owner of this TODO app `)
    }


    return (
        <div className="container">
            <div className="contact">
                <h3>Contact Us</h3>
                <form onSubmit={handleClick}>
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required

                    />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message"
                        required

                    />
                    <button type="submit">Send Message</button>

                </form>


            </div>
        </div>
    )
}

export default Contact;


