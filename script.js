const image = document.querySelectorAll('.carousel-image');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const fortName = document.getElementsByTagName('h4')[0];
const names = ['Pratapgad', 'Raigad', 'Sinhgad', 'Rajgad'];
let current = 0;

// Carousel logic

function showImage(current) {
  image.forEach((img, i) => {
    img.classList.toggle('active', i === current);
  });
  fortName.textContent = names[current];
}

nextBtn.addEventListener('click', () => {
  current = (current + 1) % image.length;
  showImage(current);
});

prevBtn.addEventListener('click', () => {
  current = (current - 1 + image.length) % image.length;
  showImage(current);
});

document.addEventListener('DOMContentLoaded', function () {
  const districtNames = {
    Pune: ['Sinhgad', 'Rajgad'],
    Satara: ['Pratapgad'],
    Raigad: ['Raigad'],
  };

    const fortToCityMap = {
    Pratapgad: 'Mahabaleshwar',
    Raigad: 'Mahad',
    Sinhgad: 'Pune',
    Rajgad: 'Pune',
  };

  const district = document.getElementById('district');
  const placeSelect = document.getElementById('place');

    const img = document.getElementById('image');
  const fortText = document.getElementById('fort-name');
  const temperature = document.getElementById('temperature');
  const summary = document.getElementById('summary');
  const suggestion = document.getElementById('suggestion');
  const card = document.getElementById('card');
  const errorMessage = document.getElementById('error-message');

      card.classList.add('hidden');
  errorMessage.classList.add('hidden');


  // Populate districts
  for (const districts in districtNames) {
    const option = document.createElement('option');
    option.value = districts;
    option.textContent = districts;
    district.appendChild(option);
  }

  // Populate places on district change
  district.addEventListener('change', function () {
    const selectedDistrict = this.value;
    placeSelect.innerHTML = '<option value="">Place</option>'; // Clear previous
     card.classList.add('hidden');
    errorMessage.classList.add('hidden');

    if (districtNames[selectedDistrict]) {
      districtNames[selectedDistrict].forEach((place) => {
        const option = document.createElement('option');
        option.value = place;
        option.textContent = place;
        placeSelect.appendChild(option);
      });
    }

    //Hide card if district changed (and place not selected yet)
   
    
  });

  // Weather card elements
  const imgSrc = {
    Raigad: 'Images/Raigad-2.avif',
    Rajgad: 'Images/rajgad.png',
    Sinhgad: 'Images/sinhgad-4.jpg',
    Pratapgad: 'Images/pratapgad.jpg',
  };

  // Hide card initially

  placeSelect.addEventListener('change', async function () {
  const fort = this.value;
  const city = fortToCityMap[fort];
  if (!city) {
    
    return;
  }

  try {
    const weatherData = await fetchWeatherData(city);
    displayWeatherData(fort, weatherData);
  } catch (error) {
    showErrorMessage();
    console.error(error);
  }
});


  // async function fetchCityData(city) {
  //   const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  //   const response = await fetch(url);
  //   if (!response.ok) throw new Error('Failed to fetch location data');
  //   const data=  await response.json();
  //   console.log(data);
  //   return data;
  // }

async function fetchWeatherData(city) {
  const WEATHER_API_KEY = "376d9e4fa14546b4a2734921251107";
  const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data: ' + response.status);
  }
  const data = await response.json();
  console.log(data);
  return data;
}


 function displayWeatherData(fort, data) {
  const current = data.current;

  img.innerHTML = '';
  const newImage = document.createElement('img');
  newImage.src = imgSrc[fort];
  newImage.alt = fort;
  newImage.style.width = '300px';
  newImage.style.height = '300px';
  newImage.style.objectFit = 'cover';
  newImage.style.borderRadius = '30px';
  img.appendChild(newImage);

  fortText.textContent = fort;
  temperature.textContent = `Temperature: ${current.temp_c}°C`;
  summary.textContent = `Summary: ${current.condition.text}`;

  const rain = current.precip_mm || 0;
  const clouds = (current.cloud || 0) / 100;
  const humidity = (current.humidity || 0) / 100;

  const severity = 0.3 * humidity + 0.4 * rain + 0.3 * clouds;

  if (severity >= 0.7) {
    suggestion.textContent =
      'Travel not recommended today due to heavy rainfall and possible disruptions. Consider rescheduling.';
  } else if (severity >= 0.4) {
    suggestion.textContent =
      'Possible rain during the day. Carry an umbrella or raincoat and proceed with caution.';
  } else {
    suggestion.textContent = 'Perfect weather for travel! Enjoy your day exploring.';
  }

  card.classList.remove('hidden');
  errorMessage.classList.add('hidden');
}


  function showErrorMessage() {
    img.innerHTML = '';
    temperature.textContent = '';
    summary.textContent = '';
    suggestion.textContent = '';
    
    card.classList.remove('hidden');
    errorMessage.classList.remove('hidden');
  }
});
