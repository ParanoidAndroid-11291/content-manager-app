import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useSWRConfig } from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router';

const TaskCard = ({ resource }) => {
  const [timePassed, setTimePassed] = useState(0);

  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { title, link, priority, timeToFinish, createdAt, status, id, startTime } = resource;

  //When refreshing page, counter resets. Not desired behavior
  useEffect(() => {
    let interval = null;
    if (status == "active"){
      interval = setInterval(() => {
        setTimePassed(timePassed => timePassed + 1);
      },60000);
    }else if (status == "inactive"){
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  },[timePassed,status]);

  const toDetails = () => router.push(`/resources/${id}`);

  const handleUpdateStatus = async () => {
    try {
      const res = await axios.patch("/api/resources", { ...resource, status: "active", startTime: dayjs().toISOString() });

      //tells swr to update resources with the endpoint
      mutate("/api/resources");
    }catch(e) {
      alert(e.response.data);
    }
  };

  return (
    <div className="ui card">
      <div className="content">
        <div className="header">{ title }</div>
        <div className="meta">
          <span className="date">{`Created at ${dayjs(createdAt).format('MM/DD/YY hh:mm:ss a')}`}</span>
        </div>
        <div className="description">
          <a href={ `https://${link}` }>{ link }</a>
        </div>
        <h4 className="ui sub header">Progress</h4>
        <div className="ui small feed">
          <div className="content">
            {
              status == "inactive" ?
              `Time to finish: ${ timeToFinish } minutes` :
              `Time remaining to finish: ${timeToFinish - timePassed} minutes`
            }
          </div>
          <div className="content">
            {`Priority: ${ priority }`}
          </div>
        </div>
      </div>
      <div className="extra content">
        {
          status === "active" ?
          <button className="ui positive button">Finish</button> :
          <button className="ui primary button" onClick={() => handleUpdateStatus()}>Activate</button>
        }
        <button
          className="ui primary basic button"
          onClick={toDetails}
          >
            Details
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
