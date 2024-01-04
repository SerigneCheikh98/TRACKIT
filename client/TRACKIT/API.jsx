const locationKEY = '6596e0ad9314e091225752fijd9e70a'


async function getCity(latitude, longitude) {
    return getJson( fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${locationKEY}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    })).then(json => {
        return json
    }).catch(err => {
        throw new Error("Location retrieval failed")
    })

}

function getJson(httpResponsePromise) {
    // server API always return JSON, in case of error the format is the following { error: <message> } 
    return new Promise((resolve, reject) => {
      httpResponsePromise
        .then((response) => {
          if (response.ok) {
  
            // the server always returns a JSON, even empty {}. Never null or non json, otherwise the method will fail
            response.json()
              .then(json => resolve(json))
              .catch(err => reject(new Error("Cannot parse server response")));
  
          } else {
            // analyzing the cause of error
            response.json()
              .then(obj =>
                reject(obj)
              ) // error msg in the response body
              .catch(err => reject(new Error("Cannot parse server response"))) // something else
          }
        })
        .catch(err =>
          reject(new Error("Cannot communicate"))
        ) // connection error
    });
  }

const API = { getCity }
export default API;