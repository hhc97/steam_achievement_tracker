const log = console.log

export const addReview = (review) => {
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

export const getReviews = (forum, reviewNumLimit) => {
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

export const updateReviewVotes = (review) => {
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