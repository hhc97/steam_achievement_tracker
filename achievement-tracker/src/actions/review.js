const log = console.log

export const getReviews = (forum, reviewNumLimit) => {
  const url = '/api/reviews'

  fetch(url)
  .then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Could not get reviews')
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
  }).catch((error) => {
    log(error)
  })
}