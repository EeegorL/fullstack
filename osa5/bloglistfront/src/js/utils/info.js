const showMsg = (err, setMsg, seconds) => {
    setMsg(err);
    setTimeout(()=>setMsg(""),seconds*1000);
}

export default showMsg;