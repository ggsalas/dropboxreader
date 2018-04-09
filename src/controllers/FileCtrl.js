import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import { fileGet } from '../api/dropbox'

function FileCtrl(WrappedComponent) {
  return class extends React.Component {
    static propTypes = {
      entries: PropTypes.array.isRequired,
      fileClose: PropTypes.func.isRequired,
      fileId: PropTypes.string.isRequired
    }

    constructor(props, context) {
      super(props, context)

      this.files = this.props.entries.filter(entry => entry['.tag'] === 'file')
      this.state = {
        fileUrl: '',
        fileSelected: this.files.find(entry => entry.id === this.props.fileId)
      }
    }

    componentDidMount() {
      document.addEventListener('keydown', this._handleKeyboard)
      this.fileGet({
        path: this.props.fileId,
        fileSelected: this.files.find(entry => entry.id === this.props.fileId)
      })
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this._handleKeyboard)
    }

    fileGet = ({ path, fileSelected } = {}) => {
      const { DropBoxAccesToken } = this.props

      return fileGet({ path, fileSelected, DropBoxAccesToken }).then(data =>
        this.setState({ fileUrl: data.link, fileSelected })
      )
    }

    fileMove = () => {
      const fileSelectedIndex = this.files.findIndex(
        entry => entry.id === this.state.fileSelected.id
      )
      const next =
        this.files[fileSelectedIndex + 1] && this.files[fileSelectedIndex + 1]
      const previus =
        this.files[fileSelectedIndex - 1] && this.files[fileSelectedIndex - 1]
      const moveNext = () => this.fileGet({ path: next.id, fileSelected: next })
      const movePrevius = () =>
        this.fileGet({ path: previus.id, fileSelected: previus })

      return { next, previus, moveNext, movePrevius }
    }

    render() {
      return (
        <WrappedComponent
          files={this.files}
          fileGet={this.fileGet}
          fileMove={this.fileMove}
          wrappedState={this.state}
          {...this.props}
        />
      )
    }

    _handleKeyboard = e => {
      //esc key
      if (e.key === 'Escape') this.props.fileClose()

      //previus
      if (e.key === 'ArrowLeft') this.fileMove().movePrevius()

      //next
      if (e.key === 'ArrowRight') this.fileMove().moveNext()
    }
  }
}

export default FileCtrl
