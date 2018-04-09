import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import FileCtrl from '../controllers/FileCtrl'

const FileComponent = props => {
  const imageExt = [
    'png',
    'jpg',
    'jpeg',
    'tiff',
    'gif',
    'exif',
    'svg',
    'bmp',
    'webp'
  ]
  const videoExt = [
    'mp4',
    'webm',
    'ogv',
    '3gp',
    'ogg',
    'mp3',
    'wave',
    'wav',
    'aac'
  ]

  const fileExt = props.wrappedState.fileSelected.name
    .split('.')
    .slice(-1)[0]
    .toLowerCase()

  const iframe = !!props.wrappedState.fileUrl && (
    <iframe
      key={props.wrappedState.fileSelected.id}
      className="siteFile-iframe"
      src={`https://docs.google.com/viewer?url=${
        props.wrappedState.fileUrl
      }&embedded=true`}
    />
  )
  const image = (
    <img
      key={props.wrappedState.fileSelected.id}
      className="siteFile-image"
      src={props.wrappedState.fileUrl}
      alt={props.fileName}
    />
  )
  const video = (
    <video
      key={props.wrappedState.fileSelected.id}
      className="siteFile-video"
      src={props.wrappedState.fileUrl}
      controls
      autoPlay
    >
      Tu navegador no implementa el elemento <code>video</code>.
    </video>
  )

  return (
    <div className="siteFile">
      <div className="siteFile-menu">
        <a href={props.wrappedState.fileUrl} className="button button-download">
          Descargar
        </a>
        <div>
          {!!props.fileMove().previus && (
            <button className="button" onClick={props.fileMove().movePrevius}>
              &#8592; Anterior
            </button>
          )}
          {!!props.fileMove().next && (
            <button className="button" onClick={props.fileMove().moveNext}>
              Siguiente &#8594;
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={props.fileClose}
          className="button button-close"
        />
      </div>

      <CSSTransitionGroup
        component="div"
        className="siteFile-preview"
        transitionName="siteFile-preview"
        transitionEnterTimeout={1300}
        transitionLeaveTimeout={200}
      >
        {imageExt.indexOf(fileExt) >= 0
          ? image
          : videoExt.indexOf(fileExt) >= 0 ? video : iframe}
      </CSSTransitionGroup>

      <style jsx>{`
        .siteFile {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
        }
        .siteFile-menu {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          height: 60px;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding: 0 10px;
        }
        .siteFile-preview {
          position: absolute;
          width: 100vw;
          height: calc(100vh - 60px);
          overflow: hidden;
        }
        .siteFile-iframe,
        .siteFile-image,
        .siteFile-video {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          border: none;
          margin: 0 auto;
          display: block;
        }
        .siteFile-image,
        .siteFile-video {
          width: auto;
          max-width: 100%;
          height: auto;
          max-height: 100%;
        }
        .siteFile-iframe {
          width: 100%;
        }
        .siteFile-preview-enter {
          opacity: 0;
          z-index: -1;
          margin-top: 100vh;
          -webkit-transition-delay: 1s;
          transition-delay: 1s;
          -webkit-transition-duration: 0.3s;
          transition-duration: 0.3s;
          -webkit-transition-timing-function: ease-in;
          transition-timing-function: ease-in;
        }
        .siteFile-preview-enter-active {
          opacity: 1;
          margin-top: 0;
        }
        .siteFile-preview-leave {
          -webkit-transition-duration: 0.2s;
          transition-duration: 0.2s;
          -webkit-transition-timing-function: ease-out;
          transition-timing-function: ease-out;
        }
        .siteFile-preview-leave-active {
          opacity: 0;
          top: 60px;
        }
        .button {
          color: #000;
          text-decoration: none;
          background: #eee;
          padding: 0.5em 1em;
          border: none;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }
        .button:hover {
          background: #00f;
          color: #fff;
        }
        .button-close::before {
          content: '\00d7';
        }
      `}</style>
    </div>
  )
}

// Compose with HOC
const File = compose(FileCtrl)(FileComponent)

export default File
