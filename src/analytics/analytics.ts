export const analyticsData = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_LOCATION_URL as RequestInfo | URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    response.text().then(text => {
      const postData = {
        name: 'Cards (Quiz)',
        ip: '',
        country: '',
        city: '',
        provider: '',
        timezone: '',
        current_time: '',
      }

      postData.ip = JSON.parse(text).ip_address
      postData.country = JSON.parse(text).country
      postData.city = JSON.parse(text).city
      postData.provider = JSON.parse(text).connection.isp_name
      postData.timezone = JSON.parse(text).timezone.name
      postData.current_time = JSON.parse(text).timezone.current_time
      fetch(process.env.REACT_APP_ABOUT_URL as RequestInfo | URL, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    })
  } catch {
    console.log('location error occured')
  }
}

if (process.env.REACT_APP_LOCATION_URL !== '') analyticsData()
