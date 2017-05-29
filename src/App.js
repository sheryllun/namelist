import React, { Component } from 'react';
import './App.css';
import NameList from './components/namelist';

class App extends Component {
  constructor() {
    super();
    this.state = {
      people: []
    }

    this.onCheckedChange = this.onCheckedChange.bind(this);
    this.getSelectedNames = this.getSelectedNames.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if(response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
        }

        response.json().then((data) => {
          let people = data.map((item) => {
            return {
              name: item.name, 
              email: item.email,
              checked: false
            };
          });

          people = this.parseNames(people);
          this.setState({people});
        })
      })
      .catch((err) => {
        console.log('Fetch error');
      });
  }

  parseNames(data) {
    return data.sort((a,b) => {
      const nameA = this.strip(a.name);
      const nameB = this.strip(b.name);
      const aLast = nameA.split(' ')[1];
      const bLast = nameB.split(' ')[1];
      return aLast > bLast ? 1 : -1;
    });
  }

  strip(name) {
    return name.toLowerCase()
               .replace(/^(mrs?\. )/i, '')
               .trim();
  }

  onCheckedChange(index) {
    const people = this.state.people;
    people[index].checked = !people[index].checked;
    this.setState({people});
  }

  getTotalChecked() {
    return this.state.people.filter(props => props.checked).length;
  }

  getSelectedNames() {
    const checkedPeople = this.state.people.filter(props => props.checked).map(person => person.name);

    const eachPerson = checkedPeople.map(person => {
      return(`<li>${person}</li>`);
    }).join('');
    this.results.innerHTML = eachPerson;
  }

  render() {
    let className = "status";
    className += this.getTotalChecked() === 0 ? " not-visible" : "";
    return (
      <div className="App container-fluid">
          <div className={className}>
            {this.getTotalChecked()} of {this.state.people.length} selected
          </div>
          <NameList people={this.state.people} 
                    onChange={this.onCheckedChange} 
          />
        <button className='btn btn-primary' 
                onClick={this.getSelectedNames}>
                Confirm
        </button>
        <ul className="results"
             ref={(list) => {this.results = list;}}
        />
      </div>
    );
  }
}

export default App;
