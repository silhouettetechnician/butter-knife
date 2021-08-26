import React from "react";
import Context from "../contexts/Context";

const withContext = Component => {
  const WithHOC = props => {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };

  return WithHOC;
};

export default withContext;