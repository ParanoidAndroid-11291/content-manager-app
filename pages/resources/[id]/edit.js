import { useRouter } from 'next/router';
import axios from 'axios';

import { HOME_PATH } from 'routes.js'

import PageContainer from 'components/PageContainer';
import ResourceForm from 'components/ResourceForm';
import Message from 'components/Message';

const ResourceEdit = ({ resource }) => {
  const router = useRouter();

  const updateResource = async (formData) => {
    try {
      const res = await axios.patch("/api/resources/", formData);
      router.push(`/resources/${resource.id}`);
    }catch (e) {
      alert(e.response.data);
    }
  };

  // TODO: Create a way for a toast to display when successful edit.

  return (
    <PageContainer>
      <div className="ui container">
        <div className="ui grid">
          <div className="ui sixteen wide column" id="add-header">
            <h2 className="ui icon header">
              <i className="edit icon"></i>
              <div className="content">Edit Resource</div>
            </h2>
          </div>
          {
            resource ?
            <ResourceForm onFormSubmit={updateResource} primaryBtnTxt="Update" formData={resource}/> :
            (
              <div className="ui segment">
                <div className="ui active dimmer">
                  <div className="ui medium text loader">Loading</div>
                </div>
              </div>
            )
          }
        </div>
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

export default ResourceEdit;
