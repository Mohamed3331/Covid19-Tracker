import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    let changeableUrl = url

    if (country) {
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const { data } = await axios.get(changeableUrl);

        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }

        return modifiedData  
        
    } catch (error) {
        console.log(error); 
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)
        
        const modifiedData = data.map(item => ({
          confirmed: item.confirmed.total,
          deaths: item.deaths.total,
          date: item.reportDate
        }));

        return modifiedData

    } catch (error) {
        
    }
}

export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`)

        return countries.map((country) => country.name)
    } catch (error) {
        
    }
}