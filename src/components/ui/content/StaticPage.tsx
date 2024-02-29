import React from 'react';

interface IContentProps {
  header: string;
  body: any;
}
const StaticPage = async (props: IContentProps) => {
  const { header, body } = props;
  return (
    <React.Fragment>
      <div className="mb-4">
        <div className="static-title my-4" dangerouslySetInnerHTML={{ __html: header }}></div>
        <div className="terms-content" dangerouslySetInnerHTML={{ __html: body }}></div>
      </div>
    </React.Fragment>
  );
};

export default StaticPage;
