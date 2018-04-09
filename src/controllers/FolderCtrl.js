import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import { entriesFor } from '../api/dropbox'

function FolderCtrl(WrappedComponent) {
  return class extends React.Component {
    static propTypes = {
      initialPath: PropTypes.string.isRequired
    }
    static defaultProps = {
      initialPath: ''
    }

    constructor(props, context) {
      super(props, context)
      this.state = {
        entries: [],
        path: this.props.initialPath,
        fileId: ''
      }
    }

    componentDidMount() {
      const { DropBoxAccesToken } = this.props

      entriesFor({ path: this.state.path, DropBoxAccesToken }).then(entries =>
        this.setState({ entries })
      )
    }

    handleEntryClick = ({ tag, entryId, path, name } = {}) => {
      const { DropBoxAccesToken } = this.props

      if (tag === 'folder') {
        entriesFor({ path, DropBoxAccesToken }).then(entries =>
          this.setState({ entries, path })
        )
      } else if (tag === 'file') {
        this.setState({ fileId: entryId })
      }
    }

    fileClose = e => {
      this.setState({ fileId: '' })
    }

    render() {
      return (
        <WrappedComponent
          handleEntryClick={this.handleEntryClick}
          fileClose={this.fileClose}
          wrappedState={this.state}
          {...this.props}
        />
      )
    }
  }
}

export default FolderCtrl
