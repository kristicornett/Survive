import config from '../../config.json'


export const Map = ({origin, destination, width, height, mode}) => {

    const apiKey = config.googleMapKey
    

    const buildQueryString = () => {
        if(mode == 'place'){
            return `q=${origin}`
        }
        else if (mode == 'directions'){
            return `origin=${origin}&destination=${destination}&avoid=tolls|highways`

        }
    }


    return <>
    
    { origin && <iframe
    width={width ? width: "600"}
    height={height ? height : "450"}
    style={{border:0}}
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    src={`https://www.google.com/maps/embed/v1/${mode}?key=${apiKey}&${buildQueryString()}`}
      >
  </iframe>
    }
  </>
}