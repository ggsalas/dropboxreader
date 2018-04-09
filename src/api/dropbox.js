const BASE_ENTRIES = {
  recursive: false,
  include_media_info: false,
  include_deleted: false
}

export const entriesFor = ({ path, DropBoxAccesToken } = {}) => {
  return fetch('https://api.dropboxapi.com/2/files/list_folder', {
    method: 'POST',
    body: JSON.stringify(Object.assign({}, BASE_ENTRIES, { path })),
    headers: {
      Authorization: 'Bearer ' + DropBoxAccesToken,
      'Content-Type': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(data => data.entries)
}

export const fileGet = ({ path, fileSelected, DropBoxAccesToken } = {}) => {
  return fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + DropBoxAccesToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ path })
  }).then(resp => resp.json())
}
