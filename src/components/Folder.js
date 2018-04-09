import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import FolderCtrl from '../controllers/FolderCtrl'
import File from '../components/File'

const FolderComponent = props => {
  return (
    <div className="SiteFolder">
      {!!props.wrappedState.fileId && (
        <File
          fileId={props.wrappedState.fileId}
          entries={props.wrappedState.entries}
          fileClose={props.fileClose}
          DropBoxAccesToken={props.DropBoxAccesToken}
        />
      )}

      <CSSTransitionGroup
        component="ul"
        className="SiteFolder-list"
        transitionName="siteFolder-list"
        transitionEnterTimeout={600}
        transitionLeaveTimeout={1}
      >
        {/* Back button */}
        {props.wrappedState.path !== props.initialPath && (
          <li
            key="back"
            onClick={() =>
              props.handleEntryClick({
                tag: 'folder',
                path: props.wrappedState.path
                  .split('/')
                  .slice(0, -1)
                  .join('/')
              })
            }
            className="SiteFolder-item SiteFolder-item-back"
          >
            Atrás
          </li>
        )}

        {/* Files and folders buttons */}
        {props.wrappedState.entries.map(entry => (
          <li
            key={entry.id}
            onClick={() =>
              props.handleEntryClick({
                tag: entry['.tag'],
                entryId: entry.id,
                path: entry.path_lower,
                name: entry.name
              })
            }
            className={
              entry['.tag'] === 'file'
                ? 'SiteFolder-item SiteFolder-item-file'
                : 'SiteFolder-item SiteFolder-item-folder'
            }
          >
            {entry.name}
          </li>
        ))}
      </CSSTransitionGroup>
    </div>
  )
}

// Compose with HOC
const Folder = compose(
  FolderCtrl
)(FolderComponent)

export default Folder
