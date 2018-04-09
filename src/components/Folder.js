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
      <style jsx>{`
        .SiteFolder {
          max-width: 800px;
        }
        .SiteFolder ul {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -ms-flex-direction: row;
          flex-direction: row;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          margin: 0;
          padding: 0;
        }
        .SiteFolder-item {
          list-style: none;
          width: 100px;
          padding: 20px;
          margin: 10px;
          font-size: 0.6em;
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
          cursor: pointer;
          word-wrap: break-word;
        }
        .SiteFolder-item:hover {
          background: #00f;
        }
        .SiteFolder-item-folder {
          background: #999;
          color: #fff;
        }
        .SiteFolder-item-file {
          background: #eee;
        }
        .SiteFolder-item-back {
          background: #999;
          color: #fff;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
        }
        .SiteFolder-item-back::before {
          content: '\00ab';
          margin-bottom: 0.2em;
          font-size: 3em;
        }
        .siteFolder-list-enter {
          -webkit-transition-delay: 0.35s;
          transition-delay: 0.35s;
          -webkit-transition-duration: 0.2s;
          transition-duration: 0.2s;
          -webkit-transition-timing-function: ease-in;
          transition-timing-function: ease-in;
          -webkit-transform: translateY(100px);
          transform: translateY(100px);
          opacity: 0;
        }
        .siteFolder-list-enter:nth-child(1) {
          -webkit-transition-delay: 0.05s;
          transition-delay: 0.05s;
        }
        .siteFolder-list-enter:nth-child(2) {
          -webkit-transition-delay: 0.1s;
          transition-delay: 0.1s;
        }
        .siteFolder-list-enter:nth-child(3) {
          -webkit-transition-delay: 0.15s;
          transition-delay: 0.15s;
        }
        .siteFolder-list-enter:nth-child(4) {
          -webkit-transition-delay: 0.2s;
          transition-delay: 0.2s;
        }
        .siteFolder-list-enter:nth-child(5) {
          -webkit-transition-delay: 0.25s;
          transition-delay: 0.25s;
        }
        .siteFolder-list-enter:nth-child(6) {
          -webkit-transition-delay: 0.3s;
          transition-delay: 0.3s;
        }
        .siteFolder-list-enter-active {
          -webkit-transform: translateY(0);
          transform: translateY(0);
          opacity: 1;
        }
        .siteFolder-list-leave {
          display: none;
        }
      `}</style>
    </div>
  )
}

// Compose with HOC
const Folder = compose(FolderCtrl)(FolderComponent)

export default Folder
