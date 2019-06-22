import React from 'react';

const NotFound = () => (
  <div className="flex-container-center">
    <div className="page my-3">
      <div className="page-content">
        <div className="container text-center">
           <div className="display-1 text-muted mb-5"><i className="si si-exclamation"></i> 404</div>
           <h1 className="h2 mb-3">Oops.. You just found an error page..</h1>
           <p className="h4 text-muted font-weight-normal mb-7">We are sorry but our service is currently not available…</p>
           <a className="btn btn-primary" href="/#/">
            <i className="fe fe-arrow-left mr-2"></i>Go back
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
