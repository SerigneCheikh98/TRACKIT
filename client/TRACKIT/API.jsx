const your_ip_address = '192.168.1.51'
const locationKEY = '6596e0ad9314e091225752fijd9e70a'
const basepath = `http://${your_ip_address}:3000/api`

const dayjs = require('dayjs')
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

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

// ========================================== RIDES ==========================================

async function searchRide(params) {
  return getJson(fetch(`${basepath}/rides?location=${params.location}&date=${dayjs(params.date, 'DD/MM/YYYY').format('YYYY/MM/DD').toString()}&time=${params.time}&duration=${params.duration.value}&timeUnit=${params.timeUnit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  })).then(json => {
    const res = json.map( item => {
      return  {
        ...item,
        date: dayjs(item.date, 'YYYY/MM/DD').format('DD/MM/YYYY').toString()
      }
    })
    return res
  }).catch(err => {
    throw new Error(err)
  })

}

async function getDailyRide(params) {
  return getJson(fetch(`${basepath}/rides/daily?location=${params.location}&date=${dayjs(params.date, 'DD/MM/YYYY').format('YYYY/MM/DD').toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  })).then(json => {
    const res = json.map( item => {
      return  {
        ...item,
        date: dayjs(item.date, 'YYYY/MM/DD').format('DD/MM/YYYY').toString()
      }
    })
    return res
  }).catch(err => {
    return err
  })

}

async function addRequestRide(params) {
  return getJson(fetch(`${basepath}/rides`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({
      location: params.location,
      date: dayjs(params.date, 'DD/MM/YYYY').format('YYYY/MM/DD').toString(),
      time: params.time,
      duration: params.duration,
      timeUnit: params.timeUnit
    })
  })).then(json => {
    const res = json.map( item => {
      return  {
        ...item,
        date: dayjs(item.date, 'YYYY/MM/DD').format('DD/MM/YYYY').toString()
      }
    })
    return res
  }).catch(err => {
    return err
  })

}
// ========================================== NOTIFICATION ==========================================


async function getNotification() {
  return getJson(fetch(`${basepath}/notification`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  })).then(json => {
    const res = json.map( item => {
      return  {
        ...item,
        Date: dayjs(item.Date, 'YYYY/MM/DD').format('DD/MM/YYYY').toString()
      }
    })
    return res
  }).catch(err => {
    throw err
  })
}

async function deleteNotification(id, status) {
  return getJson(fetch(`${basepath}/notification/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({
      status: status
    })
  })).then(json => {
    return json
  }).catch(err => {
    throw err
  })
}

async function setNotificationSeen(id) {
  return getJson(fetch(`${basepath}/notification/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  })).then(json => {
    return json
  }).catch(err => {
    throw err
  })
}

// ========================================== LOGIN ==========================================

const login = (credentials) => {
  return getJson( fetch(`${basepath}/login`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
  })).then( json => {
      return json
  })
}

const logout = () => {
  return getJson( fetch(`${basepath}/login`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
      credentials: 'include',   
  }))
  .then( json => {
      return json
  })
}

const stillLoggedIn = () => {
  return getJson( fetch(`${basepath}/login/current`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
      credentials: 'include'
  }))
  .then( json => {
      return json
  })
}

// ========================================== REPORT ==========================================

const getAllTopics = () => {
  return getJson( fetch(`${basepath}/topics`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
  }))
  .then( json => {
    return json
  })
  .catch((err) => {
    return err
  })
}

const getEvaluationsByStudentId = () => {
  return getJson( fetch(`${basepath}/evaluations`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
  }))
  .then( json => {
    return json
  })
  .catch((err) => {
    return err
  })
}

const API = { getCity, searchRide, getDailyRide, addRequestRide, getNotification, setNotificationSeen, deleteNotification, login, logout, stillLoggedIn, getAllTopics, getEvaluationsByStudentId }
export default API;