import Header from '../Header';

function PageContainer({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default PageContainer;
