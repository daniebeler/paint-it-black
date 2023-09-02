

const storeData = (countries: ICountries) => {
    localStorage.setItem('fief', JSON.stringify(countries))
}

const getData = (): ICountries | null => {
    const fuf = localStorage.getItem('fief')

    return fuf ? JSON.parse(fuf) as ICountries : null
}

const Storage = {
    storeData,
    getData
}

export default Storage