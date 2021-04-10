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

export const deleteVoteRecordByUser = (username) => {
    const url = `/api/voteRecords/${username}`

    const request = new Request(url, {
        method: 'delete',
        body: JSON.stringify({}),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                log(`All vote records of user ${username} deleted`)
            } else {
                log("Error: Cannot delete vote records")
            }
        }).catch((error) => {
            log(error)
        })
}

export const deleteVoteRecordByReview = (username, reviewId) => {
    const url = `/api/voteRecords/${username}/${reviewId}`

    const request = new Request(url, {
        method: 'delete',
        body: JSON.stringify({}),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                log(`All vote records of this review deleted`)
            } else {
                log("Error: Cannot delete vote records")
            }
        }).catch((error) => {
            log(error)
        })
}