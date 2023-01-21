import PageContainer from 'components/PageContainer';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const ResourceDetail = ({ resource }) => {
  const router = useRouter();

  const {
    title,
    link,
    priority,
    timeToFinish,
    desc,
    createdAt,
    status,
    id
  } = resource;

  return (
    <PageContainer>
      <div className="ui fluid container" id="resource-detail-wrapper">
        <div className="header-wrapper">
          <h2 className="ui header">
            { title }
          </h2>
          <button
            className="ui icon basic button"
            style={{ marginLeft: "0.5rem" }}
            onClick={() => router.push(`/resources/${id}/edit`)}
          >
            <i className="edit outline icon"></i>
          </button>
        </div>
        <div className="ui segment">
          <div className="ui grid">
            <div className="ui four wide column">
              <div className="ui label">Created At</div>
              <span className="detail-label">{ dayjs(createdAt).format('MM/DD/YY hh:mm:ss a') }</span>
            </div>
            <div className="ui four wide column">
              <div className="ui label">Priority</div>
              <span className="detail-label">{ priority }</span>
            </div>
            <div className="ui four wide column">
              <div className="ui label">Time to finish</div>
              <span className="detail-label">{ timeToFinish } minutes</span>
            </div>
            <div className="ui four wide column">
              <div className="ui label">Status</div>
              <span
                className={ status === "active" ? "detail-label active" : "detail-label" }>
                { status }
              </span>
            </div>
          </div>
        </div>
        <h4 className="ui horizontal divider header">Description</h4>
        <p>{ desc }</p>
      </div>
    </PageContainer>
  );
};

export const getServerSideProps = async ({ params }) => {
  const resData = await fetch("http://localhost:3001/api/resources/" + params.id);
  const data = await resData.json();

  return {
    props: {
      resource: data
    }
  }
}

export default ResourceDetail;
