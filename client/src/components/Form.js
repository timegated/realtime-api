import React, { useState, useEffect } from 'react';

const INTERVAL = 3000;

const Form = () => {
  const [allChat, setAllChat] = useState([]);
  const [failedTries, setFailedTries] = useState(0);

  async function postNewMsg(user, text) {
    const data = {
      user,
      text,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    };

    await fetch('http://localhost:5000/poll', options);
  }

  async function getNewMsgs() {
    try {
      const res = await fetch('http://localhost:5000/poll');
      const json = await res.json();

      if (res.status >= 400) {
        setFailedTries(prev => prev + 1);
        throw new Error('request did not succeed: ' + res.status);
      }

      setAllChat(json.msg);
      setFailedTries(0);
    } catch (e) {
      console.error(e);
    }
  };

  const rafTimer = async (time) => {
    const BACKOFF = 5000;
    let timeToMakeNextRequest = 0;
    if (timeToMakeNextRequest <= time) {
      await getNewMsgs();
      timeToMakeNextRequest = time + INTERVAL + failedTries * BACKOFF;
    }
  };

  useEffect(() => {
    window.requestAnimationFrame(rafTimer)
    return () => {
      setAllChat([]);
      setFailedTries(0);
    };
  }, [failedTries]);

  return (
    <>
      <form id="chat" className="col s12" onSubmit={postNewMsg}>
        <div className="row">
          <div className="input-field col s3">
            <i className="material-icons prefix">account_circle</i>
            <input id="user" type="text" className="validate" />
            <label htmlFor="user">User Name</label>
          </div>
          <div className="input-field col s9">
            <i className="material-icons prefix">message</i>
            <input id="text" type="tel" className="validate" />
            <label htmlFor="text">Message</label>
          </div>
        </div>
        <div className="col s12 btn-box">
          <button
            className="btn teal lighten-1 waves-effect waves-light"
            type="submit"
          >
            Submit
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>
      <ul>
        {allChat.map((chat, index) => {
          <li key={index}><span className="badge">{chat.user}</span>{chat.msg}</li>
        })}
      </ul>
      <div className="row" style={{ border: "1px solid black", bordeRadius: "5px", marginTop: "1.25rem"}}>
        <h3>Failed Tries</h3>
        <h3>{failedTries}</h3>
      </div>
    </>
  );
};

export default Form;