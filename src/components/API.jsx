// This file is reused (i made it and used it for another exercise)

const baseURL = "http://localhost:4000/"

export async function get(endpoint) {
    const res = await fetch(baseURL + endpoint);
    const data = await res.json();
    return data
}

export async function getOne(endpoint, id) {
    const c = {
        method: 'GET',
        mode: 'no-cors'
    }
    console.log(baseURL + endpoint + "/" + id)
    const httpRes = await fetch(baseURL + endpoint + "/" + id, c);
    const data = await httpRes.json();
    return { httpRes, data }
}

export async function deleteOne(endpoint, id) {
    const c = {
        method: 'DELETE',
        mode: 'no-cors'
    }
    console.log(baseURL + endpoint + "/" + id)
    const httpRes = await fetch(baseURL + endpoint + "/" + id, c);
    const data = await httpRes.json();
    return { httpRes, data }
}

export async function post(endpoint, data) { // data = obj (json)
    const c = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf8'
        },
        body: JSON.stringify(data)
    }
    console.log("in post")
    console.log(data)
    const httpRes = await fetch(baseURL + endpoint, c);
    const resData = await httpRes.json();
    return { httpRes, resData };
}

export async function put(endpoint, id, newData) { // data = obj (json)
    const c = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    }
    const httpRes = await fetch(baseURL + endpoint + "/" + id, c);
    const resData = await httpRes.json()
    return { httpRes, resData };
}