import React from 'react'
import NetworkHandler from '../../networkHandler'

export default class Issues extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: []
    }
  }

  componentDidMount() {
    NetworkHandler.request('get_issues.php')
  }

  render() {
    return (
      <main className="overview-content">
        {this.state.issues.map(i => console.log(i))}
      </main>
    )
  }
}
