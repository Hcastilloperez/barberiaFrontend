import React from "react";
import { Button } from "semantic-ui-react";
import "./header.css";

function header(props) {
  const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo } = props;

  return (
    <div className="header-page-admin">
      <h2>{title}</h2>

      <div>
        {btnTitle && (
          <Button className="primary" onClick={btnClick}>
            {btnTitle}
          </Button>
        )}
        {btnTitleTwo && (
          <Button negative onClick={btnClickTwo}>
            {btnTitleTwo}
          </Button>
        )}
      </div>
    </div>
  );
}

export default header;
