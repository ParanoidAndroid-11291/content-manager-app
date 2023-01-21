import useSWR from 'swr';
import PageContainer from 'components/PageContainer';
import TaskCard from 'components/TaskCard';

//wrapper function for fetch
const fetcher = (...args) => fetch(...args).then(res => res.json());

const Home = () => {

  const getResources = (status) => {
    //note, the return values HAVE to be data and error
    const { data, error } = useSWR('/api/resources', fetcher);

    if(error){
      return (
        <div>Error</div>
      );
    }

    if(!data){
      return (
        <div className="ui segment">
          <div className="ui active dimmer">
            <div className="ui indeterminate loader"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="ui grid">
        { data.some((resource) => resource.status === status) ?
          (
            data.map((resource) =>
              resource.status === status ? (
                <div className="three wide column" key={resource.id}>
                  <TaskCard resource={resource}/>
                </div>
              ) : null
            )
          ): <div className="ui disabled header">{`No ${status} tasks!`}</div>
        }
      </div>
    );

  }

  return (
    <PageContainer>
      <div className="ui fluid container tasks">
        <h1>Active Tasks</h1>
        { getResources("active") }
      </div>
      <div className="ui divider" />
      <div className="ui fluid container tasks">
        <h1>Inactive Tasks</h1>
        { getResources("inactive") }
      </div>
      <div className="ui divider" />
      <div className="ui fluid container tasks">
        <h1>Completed Tasks</h1>
        { getResources("completed") }
      </div>
    </PageContainer>
  )
}
// export const getServerSideProps = async () => {
//
//   const resData = await fetch("http://localhost:3001/api/resources");
//   const data = await resData.json();
//
//   return {
//     props: {
//       resources: data
//     }
//   }
// };


export default Home;
