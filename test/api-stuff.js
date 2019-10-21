    // npm install node-fetch --save
    const fetch = require("node-fetch");

    const url1 = "https://postman-echo.com/get?foo1=bar1&foo2=bar2"
    const url2 = 'https://jsonplaceholder.typicode.com/todos/1'
    // SimpleHTTPServer

    // hosted locally via:
    //   http-server -c-1--cors

    // url (required), options (optional)
    // fetch('https://davidwalsh.name/some/url', {
    // fetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2", {
    //   method: 'get',
    //   mode: 'no-cors',
    // }).then(function(response) {
    //   console.log(response);
      
    // }).catch(function(err) {
    //   console.log(err);
    //   // Error :(
    // });



    // fetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2", {
    //   method: 'get',
    //   mode: 'no-cors',
    // }).then(function(response) {
    //   console.log(response);
      
    // }).catch(function(err) {
    //   console.log(err);
    //   // Error :(
    // });

    // fetch(url2)
    // .then(response => response.json())// somehow needs this extra step instead of logging directly
    // .then(json => console.log(json))




    // fetch(url1, {
    //   // method: 'get',
    //   // mode: 'cors',
    // })
    // // .then(response => response.json())// somehow needs this extra step instead of logging directly
    // .then(response => {
    //   if (!response.ok) {
    //     console.log('\nNOT OK /////////////////\n')
    //     console.error(response)
    //   }
    //   // response.json()
    //   return response.json()
    // })
    // .then(json => {
    //     console.log('\nOK\n')
    //     console.log(json)
    // })

    // POST TEST
    // const post_url = 'https://postman-echo.com/post'
    // fetch(post_url, {
    //     method: 'post',
    //     // mode: 'cors',

    //     headers: {
    //       'Content-Type': 'application/json'
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: JSON.stringify({
    //         this: 'thaty'
    //     })
    // })
    // // .then(response => response.json())// somehow needs this extra step instead of logging directly
    // .then(response => {
    //   if (!response.ok) {
    //     console.log('\nNOT OK /////////////////\n')
    //     console.error(response)
    //   }
    //   // response.json()
    //   return response.json()
    // })
    // .then(json => {
    //     console.log('\nOK\n')
    //     console.log(json)
    // })




    const HUBSPOT_GET = "https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=3ce49820855f14f765b1237ff770"
    const HUBSPOT_POST = "https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=3ce49820855f14f765b1237ff770"
    const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

    // fetch(url2, {
    fetch(HUBSPOT_GET, {
      // method: 'get',
      // mode: 'cors',
    })
    // .then(response => response.json())// somehow needs this extra step instead of logging directly
    .then(response => {
      if (!response.ok) {
        console.error(response)
      }
      // response.json()
      return response.json()
    })
    .then(json => {
      console.log(json)
      const partnerData = json.partners

      // group available dates by county
      // key=country Value=availableDates

      // rename "fisrt dates" to "startDates"

      const daysByCountry = {};//dayCountByCountry is meant to replace this
      const dayCountByCountry = {};// move to: {Country: {dayA: count, dayB: count}}
      const partnerEmailByDate = {};//available that day & the next

      // const daysByCountry = new Map();
      partnerData.forEach(p => {
        const country = p.country;

        // inneficient to check each iter?
        if (!dayCountByCountry.hasOwnProperty(country)) dayCountByCountry[country] = {}


        // const datesObj = {};//day

        // only count the dates where they can also show up the next day
        const dates = [];//partner available this day and the next
        for (let i = 0; i < p.availableDates.length-1; i++) {
          const first = Date.parse(p.availableDates[i]) / MILLISECONDS_PER_DAY
          const second = Date.parse(p.availableDates[i+1]) / MILLISECONDS_PER_DAY
          // console.log(first)
          if (second - first === 1) {
            const date = p.availableDates[i]
            dates.push(date)

            if (dayCountByCountry[country].hasOwnProperty(date)) dayCountByCountry[country][date]++
            else dayCountByCountry[country][date] = 1

            if (partnerEmailByDate[date]) partnerEmailByDate[date].push(p.email);
            else partnerEmailByDate[date] = [p.email]
          }
        }


        if (daysByCountry.hasOwnProperty(country)) daysByCountry[country].push(...dates);
        else daysByCountry[country] = dates;
      })

      // ISO 8601 date strings are pretty stable 
      for (const days of Object.values(daysByCountry)) days.sort();

      // I'm assuming it's the same for two people going on one day 

      console.log(daysByCountry)
      console.log(' ')
      console.log(partnerEmailByDate)
      console.log(' ')
      console.log(dayCountByCountry)

      const bestDayByCountry = {}
      const response = []
      for (let [country, partnersPerDate] of Object.entries(dayCountByCountry)) {
        const bestDate = dateWithMost(partnersPerDate)
        bestDayByCountry[country] = bestDate
        response.push({
          "attendeeCount": partnerEmailByDate[bestDate].length,
          "attendees": partnerEmailByDate[bestDate],
          "name": country,
          "startDate": bestDate
        })
      }

      console.log(bestDayByCountry)
      console.log('response:', response)

      chuckResponseIntoPit({"countries": response})
    })


    function parsePartnerData(partnerData) {
      ;
    }

    //assumes dates are ordered?
    function dateWithMost(dateHeadCountObj) {
      let mostPeople = 0;
      let date = null;
      for (let [dateString, headcount] of Object.entries(dateHeadCountObj))  {

        if (headcount > mostPeople) {
          mostPeople = headcount
          date = dateString
        }

      }
      return date
    }


    function chuckResponseIntoPit(res) {
      fetch(HUBSPOT_POST, {
          method: 'post',
          // mode: 'cors',

          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(res)
      })
      // .then(response => response.json())// somehow needs this extra step instead of logging directly
      .then(response => {
        if (!response.ok) {
          console.log('\nNOT OK /////////////////\n')
          console.error(response)
        }
        // response.json()
        return response.json()
      })
      .then(json => {
          console.log('\nOK\n')
          console.log(json)
      })
    }












































    


    
    // try {
    //   const data = await postData('http://example.com/answer', { answer: 42 });
    //   console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
    // } catch (error) {
    //   console.error(error);
    // }

    // async function postData(url = '', data = {}) {
    //   // Default options are marked with *
    //   const response = await fetch(url, {
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //       'Content-Type': 'application/json'
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrer: 'no-referrer', // no-referrer, *client
    //     body: JSON.stringify(data) // body data type must match "Content-Type" header
    //   });
    //   return await response.json(); // parses JSON response into native JavaScript objects
    // }
