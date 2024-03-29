import Axios from "axios";
import { BASE_URL, CONSTANT } from './constant';
const M_BASE = "http://35.247.152.248"

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': "*",

}

export function getStatusWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=17b3ac29ca8c3bbdc427123e277b022e`
  console.log("CALL TO API: " + url)
  return Axios.get(url).then(res => res.data)
}

export function registerApi(username, password) {

  return fetch(M_BASE + "/users", {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ "email": username, "password": password }),

  }).then(res => res)
    .catch(err => console.log(err))
}

export function loginApi(username, password) {

  const body = JSON.stringify({ "email": username, "password": password })
  console.log([body, typeof body])

  return Axios.post(
    M_BASE + "/tokens",
    // {"email":"tieugiacat97@gmail.com", "password":"123"},
    { "email": username, "password": password },
    { headers: headers }
  ).then(res => res)
    .catch(err => {
      console.log("CATCH")
      console.log()
      console.log(err)
    })
}

export function addDeviceApi(token, type, name, room, isApp) {
  console.log(["ADD API", type, name, room, isApp])
  var body = !isApp ?
    {
      "type": "device",
      "name": name,
      "metadata": {
        "type": type,
        "room": room
      }}
       : {
        "type": "app",
        "name": name,
        "metadata": {
          "type": "app",
        }
       }

console.log([body, typeof body])

// return fetch(M_BASE + "/things",
// )
return Axios.post(
  M_BASE + "/things",
  body,
  {
    headers: {
      ...headers,
      "Authorization": token,
    }
  }
).then(res => res)
  .catch(err => console.log(err))
}


export function getDevicesApi(token) {
  console.log(["TOKEN", token])
  return Axios.get(
    M_BASE + '/things',
    {
      headers: {
        ...headers,
        "Authorization": token,
      }
    }
  ).then(res => res)
    .catch(err => {
      console.log(["CATCH ERROR", err])
      return err
    })
}



export function deleteDevicesApi(token, thingId) {
  return Axios.delete(
    M_BASE + '/things/' + thingId,
    {
      headers: {
        ...headers,
        "Authorization": token,
      }
    }
  ).then(res => res)
    .catch(err => console.log(err))
}


export function createChanelApi(chanel_name, token) {
  console.log(["TOKEN", token])
  return Axios.post(
    M_BASE + '/channels',
    {
      "name": chanel_name
    },
    {
      headers: {
        ...headers,
        "Authorization": token,
      }
    }
  ).then(res => res)
    .catch(err => console.log(err))
}

export function getChannelApi(token) {
  return Axios.get(
    M_BASE + '/channels',
    {
      headers: {
        ...headers,
        "Authorization": token
      }
    }
  ).then(res => res)
    .catch(err => console.log(err))
}


export function addThingstoChannelApi(token, channel_id, thing_id) {
  return Axios.put(
    M_BASE + "/channels/" + channel_id + "/things/" + thing_id,
    {},
    {
      headers: {
        ...headers,
        "Authorization": token
      }
    }
  ).then(res => res)
    .catch(err => console.log(err))
}