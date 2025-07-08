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