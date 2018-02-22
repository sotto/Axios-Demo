import React, { Component } from 'react';
import axios from 'axios'
import List from './components/List'
import SearchBar from './components/SearchBar'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      users: [],
      store: []
    }
    this.filterNames = this.filterNames.bind(this)
  }

  componentDidMount(){
    axios.get('https://randomuser.me/api/?results=10&inc=name,registered&nat=fr')
    .then(json => json.data.results.map(result => (
      {
        name: `${result.name.first} ${result.name.last}`,
        id: result.registered
      })))
    .then(newData => this.setState({users: newData, store: newData}))
    .catch(error => alert(error))
  }

  filterNames(e){
    this.setState({users: this.state.store.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))})
  }

  render() {
    const {users} = this.state
    return (
      <div className="Card">
        <div className="header">NAME LIST</div>
        <SearchBar searchFunc={(e) => this.filterNames(e)}/>
        <List usernames={users}/>
      </div>
    );
  }
}

export default App;
