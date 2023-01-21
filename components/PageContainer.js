import HeaderBar from 'components/HeaderBar';

const PageContainer = ({ children }) => {
  return (
    <div className="ui fluid container">
      <HeaderBar />
      { children }
    </div>
  );
};

export default PageContainer;
