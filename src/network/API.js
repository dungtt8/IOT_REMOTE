import Axios from "axios";
import { BASE_URL, CONSTANT } from './constant';
const M_BASE = "http://35.247.152.248"

const headers = {
  'Content-Type' : 'application/json'
}

export function getStatusWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=17b3ac29ca8c3bbdc427123e277b022e`
  console.log("CALL TO API: " + url)
  return Axios.get(url).then(res => res.data)
}

export function registerApi(username, password){
  return Axios.post(
    M_BASE + "/users",
    {"email":username, "password":password},
    {headers: headers}
  ).then(res => res)
  .catch(err => {
    console.log("REGISTER FAIL ")
    console.log(err)
  })
}

export function loginApi(username, password) {

  return Axios.post(
    M_BASE  + "/tokens",
    {
      email: username,
      password: password
    },
    {headers: headers}
  ).then(res => res)
  .catch(err => {
    console.log("CATCH")
    console.log(err)
  })
}

export function addDeviceApi(token,type, name, room){
  return Axios.post(
    M_BASE + "/things",
    {
      "type":"device",
      "name":name,
      "metadata":{
        "type": type,
        "room": room
      }
    },
    {
      headers:{
        "Content-Type": "application/json",
        "Authorization": token,
      }
    }
  ).then(res => res)
  .catch(err => console.log(err))
}


export function getDevicesApi(token){
  return Axios.get(
    M_BASE + '/things',
    {
      headers:{
        "Content-Type": "application/json",
        "Authorization": token,
      }
    }
  ).then(res => res)
  .catch(err => console.log(err))
}

export function deleteDevicesApi(token, thingId){
  return Axios.delete(
    M_BASE + '/things/'+thingId,
    {
      headers:{
        "Content-Type": "application/json",
        "Authorization": token,
      }
    }
  ).then(res => res)
  .catch(err => console.log(err))
}
