import { useRouter } from 'next/router';
import axios from 'axios';

import { HOME_PATH } from 'routes.js'

import PageContainer from 'components/PageContainer';
import ResourceForm from 'components/ResourceForm';

const DEFAULT_DATA = {
  title: '',
  link: '',
  priority: 1,
  timeToFinish: 0,
  desc: ''
}

const ResourceCreate = () => {
  const router = useRouter();

  const createResource = async (formData) => {
    try {
      const res = await axios.post("/api/resources", formData);
      router.push(HOME_PATH);
    }catch (e) {
      alert(e.response.data);
    }

  };

  return (
    <PageContainer>
      <div className="ui container">
        <div className="ui grid">
          <div className="ui sixteen wide column" id="add-header">
            <h2 className="ui icon header">
              <i className="plus square outline icon"></i>
              <div className="content">
                Add Resource
                <div className="sub header">Add a new resource for you to work on.</div>
              </div>
            </h2>
          </div>
          <ResourceForm onFormSubmit={createResource} primaryBtnTxt="Add" formData={DEFAULT_DATA}/>
        </div>
      </div>
    </PageContainer>
  );
};

export default ResourceCreate;
