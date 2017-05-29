import React, {Component} from 'react';
import NameItem from './nameitem';

class NameList extends Component {
  renderItems() {
    const onChange = this.props.onChange;
    return (
      this.props.people.map((person, i) => { 
        return (
          <NameItem 
              index={i}
              key={person.email}
              name={person.name}
              email={person.email}
              checked={person.checked} 
              onChange={onChange} />
          )
        })
    );
  }

  render() {
    return(
      <div className="names-list">
        {this.renderItems()}
      </div>
      );
  }
}

export default NameList;