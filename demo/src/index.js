import React, {Component} from 'react'
import {render} from 'react-dom'

import Folder from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>dropbox-reader Demo 🐱</h1>
      <Folder DropBoxAccesToken="JavJ9PXXF9AAAAAAAAAAWQEII32lxZkLtiiEvH-sK-PBeOhbYGXtpWhN286ihulW"/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
