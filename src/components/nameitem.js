import React from 'react';

const NameItem = props => {
  return(
    <div className="row col-xs-12">
      <div className="col-xs-1 check-col">
        <div className="well">
          <input type="checkbox" checked={props.checked} onChange={props.onChange.bind(null, props.index)}/>
        </div>
      </div>
      <div className="col-xs-11 name-item">
        <div className="row">
          <div className="col-xs-12 name-row">
            {props.name}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 email-row">
            {props.email}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NameItem;