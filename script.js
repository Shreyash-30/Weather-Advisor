const image = document.querySelectorAll('.carousel-image');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const fortName = document.getElementsByTagName('h4')[0];
const names = ['Pratapgad', 'Raigad', 'Sinhgad', 'Rajgad'];
let current =0;

function showImage(current){
  image.forEach((img, i)=>{
    img.classList.toggle('active', i ===current);
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


const districtNames = {
  'Pune': ['Sinhgad', 'Rajgad'],
  'Satara': ['Pratapgad'],
  'Raigad':['Raigad']
}

const district = document.getElementById('district');
const placeSelect = document.getElementById('place')

for(districts in districtNames){
  const option = document.createElement('option');
  option.value = districts;
  option.textContent = districts;
  district.appendChild(option);
}

district.addEventListener("change", function () {
  const selectedDistrict = this.value;
 

  if (districtNames[selectedDistrict]) {
    districtNames[selectedDistrict].forEach(place => {
      const option = document.createElement("option");
      option.value = place;
      option.textContent = place;
      placeSelect.appendChild(option);
    });
  }
});