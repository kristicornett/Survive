export const createNewUser = (user) => {
    return fetch('http://localhost:8088/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
}

export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
            .then(response => response.json())
}

export const getTowns = () => {
    return fetch('http://localhost:8088/towns')
            .then(response => response.json())
}

export const getTradeOffers = () => {
    return fetch('http://localhost:8088/trades')
            .then(response => response.json())
}

export const getZombieSightings = () => {
    return fetch('http://localhost:8088/zombieSightings?_expand=town&_expand=zombieSightingType&_expand=zombieSightingDistance&_expand=zombieSightingStatus')
            .then(response => response.json())
}

export const getSingleZombieSighting = (sightingId) => {
    return fetch(`http://localhost:8088/zombieSightings/${sightingId}?_expand=town&_expand=zombieSightingType&_expand=zombieSightingDistance&_expand=zombieSightingStatus&_expand=zombieSightingDistance`)
            .then(response => response.json())
}

export const getSingleTown = (townId) => {
    return fetch(`http://localhost:8088/towns/${townId}`)
            .then(response => response.json())
}

export const getUser = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`)
            .then(response => response.json())
}

export const getTrade = (tradeId) => {
    return fetch(`http://localhost:8088/trades/${tradeId}`)
            .then(response => response.json())
}

export const getUsers = () => {
    return fetch('http://localhost:8088/users')
           .then(response => response.json())
}

export const getStates = () => {
    return fetch('http://localhost:8088/states')
            .then(response => response.json())
}

export const getParkDescription = () => {
    return fetch('http://localhost:8088/parks')
            .then(response => response.json())
}

export const getSupplies = () => {
    return fetch('http://localhost:8088/supplies')
           .then(response => response.json())
}

export const getSupplyTypes = () => {
    return fetch('http://localhost:8088/supplyType')
           .then(response => response.json())
}

export const getZombieSightingStatuses = () => {
    return fetch('http://localhost:8088/zombieSightingStatuses')
        .then(response => response.json())
}

export const createZombieSighting = (zombieSightingToSendToAPI) => {
    return fetch('http://localhost:8088/zombieSightings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(zombieSightingToSendToAPI)
    })
        .then(response => response.json())

}

export const updateZombieSighting = (zombieSighting) => {
    return fetch(`http://localhost:8088/zombieSightings/${zombieSighting.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(zombieSighting)
    })
        .then(response => response.json())
}


export const updateTradeOffers = (trade) => {
    return fetch(`http://localhost:8088/trades/${trade.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(trade)
    })
        .then(response => response.json())
}

export const deleteZombieSighting = (zombieSightingId) => {
    return fetch(`http://localhost:8088/zombieSightings/${zombieSightingId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        
}

export const deleteTrade = (tradeId) => {
    return fetch (`http://localhost:8088/trades/${tradeId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
}

export const deleteTown = (townId) => {
    return fetch(`http://localhost:8088/towns/${townId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
}

export const getDistances = () => {
    return fetch('http://localhost:8088/zombieSightingDistances')
        .then(response => response.json())
}

export const getZombieSightingTypes = () => {
    return fetch('http://localhost:8088/zombieSightingTypes')
           .then(response => response.json())
}

export const createNewTown = (newTownToSendToAPI) => {
    return fetch('http://localhost:8088/towns', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTownToSendToAPI)
    })
        .then(response => response.json())
}

export const createNewTrade = (newTradeToSendToAPI) => {
    return fetch('http://localhost:8088/trades', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTradeToSendToAPI)
    })
        .then(response => response.json())
}

export const getStatusLogs = () => {
    return fetch('http://localhost:8088/zombieSightingStatusLog')
           .then(response => response.json())
}

export const getStatusLogBySighting = (sightingId) => {
    return fetch(`http://localhost:8088/zombieSightingStatusLog?zombieSightingId=${sightingId}`)
            .then(response => response.json())
}

export const createStatusLog = (newStatusLogToSendToAPI) => {
    return fetch('http://localhost:8088/zombieSightingStatusLog', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStatusLogToSendToAPI)
    })
        .then(response => response.json())
}

export const updateZombieSightingStatus = (sightingId, newStatusId) => {
    return  fetch(`http://localhost:8088/zombieSightings/${sightingId}`)
            .then(response => response.json())
            .then((data) => {
                data.zombieSightingStatusId = newStatusId
               return fetch(`http://localhost:8088/zombieSightings/${sightingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json()) 
            })

}

export const getNationalParks = () => {
    return fetch('https://developer.nps.gov/api/vi/parks?api_key=cWE2MD4znLibsTmfFGoSgUBw9Gbq29vefLagjtVM')
            .then(response => response.json())
}

//google maps embed api key: AIzaSyAtumI41jxAaR0yiTeCh49BQGEqB0h-094