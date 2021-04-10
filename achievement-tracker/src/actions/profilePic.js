import ENV from './../config.js'
const API_HOST = ENV.api_host

export const storeImage = async (Comp) => {
    const url = `${API_HOST}/api/uploadImage/${Comp.state.userName}`
    const binaryFile = Comp.state.uploadImage
    const imageObject = { image: binaryFile }

    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(imageObject),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
    await fetch(request)
        .then(res => {
            if (res.status === 200) {
                Comp.setState({ image: binaryFile, uploadImage: "" })
            } else {
                alert("Could not update profile picture")
            }
        })

}

export const getImage = async (userName, Comp) => {
    const url = `${API_HOST}/api/image/${userName}`

    await fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                alert("Cannot get Profile Images")
            }
        })
        .then(json => {
            Comp.setState({ image: json.image })
        })
        .catch(error => {
            console.log(error);
        });
}