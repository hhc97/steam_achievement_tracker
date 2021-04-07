const log = console.log

export const addVoteRecord = (voteRecord) => {
  const url = '/api/voteRecords'
  const request = new Request(url, {
      method: 'post',
      body: JSON.stringify(voteRecord),
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      }
  })

  fetch(request)
      .then(function (res) {
          if (res.status === 200) {
              log("New vote record saved")
          } else {
              log("Error: Cannot add vote record")
          }
      }).catch((error) => {
          log(error)
      })
}

export const getVoteRecords = (forum) => {
  const url = '/api/voteRecords'

  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        log('Error: Cannot get vote record')
      }
    })
    .then((json) => {
      log(json.voteRecords)
      forum.setState({
        voteRecords: json.voteRecords
      })
    })
    .catch((error) => {
      log(error)
    })
}

export const updateVoteRecord = (voteRecord) => {
  const url = `/api/voteRecords/${voteRecord.username}/${voteRecord.reviewId}`
  
  const request = new Request(url, {
    method: 'PATCH',
    body: JSON.stringify(voteRecord),
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
  })

  fetch(request)
  .then(function (res) {
      if (res.status === 200) {
          log("New vote record saved")
      } else {
          log("Error: Cannot update vote record")
      }
  }).catch((error) => {
      log(error)
  })
}