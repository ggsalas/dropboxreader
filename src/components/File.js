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
    </div>
  )
}

// Compose with HOC
const File = compose(FileCtrl)(FileComponent)

export default File
