const IP = document.getElementById('IP');
const cityName = document.getElementById('city');
const regionName = document.getElementById('region');
const timeZone = document.getElementById('timeZone');
const ISPName = document.getElementById('ISP');
const input = document.getElementById('inputIp');
const search = document.getElementById('search');
const geoName = document.getElementById('geoName');

let mymap = L.map('mapid').setView([37.40, -122], 13);
   

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZWxpYWNvaGVuIiwiYSI6ImNrbHV4NHN1azEzdmgyd3AzbWN5N2VxOHEifQ.P9mN4JC55xJlUmTZPl-ANw'
}).addTo(mymap);

search.addEventListener('click', async function(){
    
    const addressPromise = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_I6GClPsM9ThKk2ZL16C6HqryF6GxA&ipAddress=${input.value}`);
    if (addressPromise.ok && input.value !== '0'){
        let address = await addressPromise.json();
        console.log(address);
        IP.innerText = input.value;
        cityName.innerHTML = `${address.location.city}, `;
        regionName.innerHTML = address.location.country;
        geoName.innerHTML = address.location.geonameId;
        timeZone.innerHTML = `UTC${address.location.timezone}`;
        ISPName.innerHTML = address.isp;
    
        mymap.remove();
        mymap = L.map('mapid').setView([address.location.lat, address.location.lng], 13);
    
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZWxpYWNvaGVuIiwiYSI6ImNrbHV4NHN1azEzdmgyd3AzbWN5N2VxOHEifQ.P9mN4JC55xJlUmTZPl-ANw'
        }).addTo(mymap);
    } else {
        alert('please enter a valid IP address')
    }
    
 
})


   
    


