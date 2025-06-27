for (let i = 1; i <= 100; i++) {
  const div = document.createElement('div');
  div.innerText = `Box${i}`;
  div.style.width='100px';
  div.style.height='100px';
  div.style.margin='50px';
  div.style.textAlign = 'center';
  if (i%2==0) {
    div.style.backgroundColor = 'green';
    div.style.color='white';
  }
  else{
    div.style.backgroundColor = 'orange';
    div.style.color='aqua';
  }
  document.body.appendChild(div);
}