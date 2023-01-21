
const Message = ({ type, header, msg }) => {

  return (
    <div id="toast" className={`ui ${type} message`}>
      <div className="header">
        { header }
      </div>
      <p>{ message }</p>
    </div>
  );
}

export default Message;
