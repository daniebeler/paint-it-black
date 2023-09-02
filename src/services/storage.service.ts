import { ISOCode } from "react-svg-worldmap"


const storeData = (countries: ISOCode[]) => {
    localStorage.setItem('foof', JSON.stringify(countries))
}

const getData = (): ISOCode[] => {
    const fuf = localStorage.getItem('foof')

    return fuf ? JSON.parse(fuf) as ISOCode[] : []
}

const Storage = {
    storeData,
    getData
}

export default Storage