const log = console.log

export const addReviewOnForum = (review) => {
    const url = '/api/reviews'
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(review),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                log("New review saved")
            } else {
                log("Error: Cannot add review")
            }
            log(res)
        }).catch((error) => {
            log(error)
        })
}

export const getReviewsOnForum = (forum, reviewNumLimit) => {
    const url = '/api/reviews'

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                log('Error: Cannot get reviews')
            }
        })
        .then((json) => {
            forum.setState({
                reviews: json.reviews,
                reviewsInSection: json.reviews,
                reviewsOnPage: json.reviews.slice(
                    0,
                    reviewNumLimit
                )
            })
        })
        .catch((error) => {
            log(error)
        })
}

export const getReviewsOnAdmin = (adminPage) => {
    const url = '/api/reviews'

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                log('Error: Cannot get reviews')
            }
        })
        .then((json) => {
            const reviews = json.reviews.sort((r1, r2) => {
                return r1.reported ? -1 : 1
            })

            adminPage.setState({
                reviews: reviews,
                reviewsOnPage: reviews
            })
        })
        .catch((error) => {
            log(error)
        })
}

export const getUserReviews = (page, username) => {
    const url = '/api/reviews'

    return fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                log('Error: Cannot get reviews')
            }
        })
        .then((json) => {
            // page.setState({
            //   userReviews: json.reviews.filter((review) => {
            //     return review.author === username
            //   })
            // })
            return json.reviews.filter((review) => {
                return review.author === username
            })
        })
        .catch((error) => {
            log(error)
        })
}

export const updateReview = (review) => {
    const url = `/api/reviews/${review.id}`

    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(review),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                log("New review saved")
            } else {
                log("Error: Cannot update review")
            }
        }).catch((error) => {
            log(error)
        })
}

export const deleteReviewOnAdmin = (review) => {
    const url = `/api/reviews/${review.id}`

    const request = new Request(url, {
        method: 'delete',
        body: JSON.stringify(review),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                log("Review deleted")
            } else {
                log("Error: Cannot delete review")
            }
        }).catch((error) => {
            log(error)
        })
}

export const updateUsernameReputation = (username, reputation, deleted) => {
    const url = `/api/reviews/${username}/${reputation}`

    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify({ deleted: deleted }),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                log("Reputation on reviews updated")
            } else {
                log("Error: Cannot update reputation")
            }
        }).catch((error) => {
            log(error)
        })
}