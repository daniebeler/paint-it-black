const storeData = (countries: string[]) => {
    localStorage.setItem('fooff', JSON.stringify(countries))
}

const getData = (): string[] => {
    const fuf = localStorage.getItem('fooff')
    console.log(fuf)
    return fuf ? JSON.parse(fuf) as string[] : []
}

const Storage = {
    storeData,
    getData
}

export default Storage