const your_ip_address = '172.20.10.2'
const locationKEY = '6596e0ad9314e091225752fijd9e70a'
const basepath = `http://${your_ip_address}:3000/api`

async function getCity(latitude, longitude) {
  return getJson(fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${locationKEY}`, {
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
            .catch(err => reject(new Error(err)));

        } else {
          // analyzing the cause of error
          response.json()
            .then(obj =>
              reject(obj)
            ) // error msg in the response body
            .catch(err => reject(new Error(err))) // something else
        }
      })
      .catch(err => {
        reject(new Error(err))

        }
      ) // connection error
  });
}

async function searchRide(params) {
  const queryParams = new URLSearchParams([
    ['location', params.location], 
    ["date", params.date],
    ["time", params.time], 
    ["duration", params.duration], 
    ["timeUnit", params.timeUnit]
  ])
  return getJson(fetch(`${basepath}/rides?location=${params.location}&date=${params.date}&time=${params.time}&duration=${params.duration}&timeUnit=${params.timeUnit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })).then(json => {
    return json
  }).catch(err => {
    throw new Error(err)
  })

}
const API = { getCity, searchRide }
export default API;