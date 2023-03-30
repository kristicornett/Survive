//google maps embed api key: Ai7kT5WWzJevXn4ryYiJsWZwO7Hdl0GQSQmntQf0
const parksKey = 'Ai7kT5WWzJevXn4ryYiJsWZwO7Hdl0GQSQmntQf0'
const baseUrl = 'https://developer.nps.gov/api/v1/'
const apiKeyQueryString = 'api_key=Ai7kT5WWzJevXn4ryYiJsWZwO7Hdl0GQSQmntQf0'
const getHeader = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': `${parksKey}`
    }
}

export const getParks = () => {
    return fetch(`${baseUrl}parks?${apiKeyQueryString}`, getHeader )
            .then(response => response.json())
}

export const getParksByState = (stateCode) => {

    return fetch(`${baseUrl}parks?stateCode=${stateCode}&${apiKeyQueryString}`, getHeader )
    .then(response => response.json())
}