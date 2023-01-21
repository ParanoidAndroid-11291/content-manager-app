import { useState } from 'react';

const ResourceForm = ({ primaryBtnTxt, onFormSubmit, formData }) => {
  const [ form, setForm ] = useState(formData);
  const { title, link, priority, timeToFinish, desc } = form;

  const submitForm = () => onFormSubmit(form);

  return (
    <div className="ui sixteen wide column" id="form-container">
      <form className="ui form">
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}/>
        </div>
        <div className="field">
          <label>Link</label>
          <div className="ui labeled input">
            <div className="ui label">https://</div>
            <input
              type="text"
              value={link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}/>
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>Priority</label>
            <input
              type="number"
              min={1}
              max={5}
              value={priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}/>
          </div>
          <div className="field">
            <label>Time to complete</label>
            <div className="ui labeled input">
              <div className="ui label">Minutes</div>
              <input
                type="number"
                value={timeToFinish}
                onChange={(e) => setForm({ ...form, timeToFinish: e.target.value })}/>
            </div>
          </div>
        </div>
        <div className="field">
          <label>Description</label>
          <textarea
            rows="2"
            value={desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}/>
        </div>
        <div
          className="ui primary button"
          onClick={() => submitForm()}
        >
          {primaryBtnTxt}</div>
      </form>
    </div>
  );
}

export default ResourceForm;
