let quickCoords = false
let copyCoords = false 
let x = document.getElementById("qcoords-x");
let y = document.getElementById("qcoords-y");
let z = document.getElementById("qcoords-z");
let h = document.getElementById("qcoords-h");

let close = document.getElementById("close");

let coordsContainer = document.getElementById("coords-container");

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

window.addEventListener("message", (event)=>{
  let data = event.data;

  if(data.quickCoords){
    quickCoords = true
  }else if(data.quickCoords === false){
    quickCoords = false
  }

  if(data.coords && data.heading){
    x.innerHTML = `X: <span class="text-white">${data.coords.x}</span>`;
    y.innerHTML = `Y: <span class="text-white">${data.coords.y}</span>`;
    z.innerHTML = `Z: <span class="text-white">${data.coords.z}</span>`;
    h.innerHTML = `Z: <span class="text-white">${data.heading}</span>`;
  }

  if(data.copyCoords === true){
    copyCoords = true;
    let coords = [
      `vec3(${data.cCoords.x.toFixed(2)},${data.cCoords.y.toFixed(2)},${data.cCoords.z.toFixed(2)})`,
      `vector3(${data.cCoords.x.toFixed(2)},${data.cCoords.y.toFixed(2)},${data.cCoords.z.toFixed(2)})`,
      `vec4(${data.cCoords.x.toFixed(2)},${data.cCoords.y.toFixed(2)},${data.cCoords.z.toFixed(2)},${data.cHeading.toFixed(2)})`,
      `vector4(${data.cCoords.x.toFixed(2)},${data.cCoords.y.toFixed(2)},${data.cCoords.z.toFixed(2)},${data.cHeading.toFixed(2)})`,
      `{${data.cCoords.x.toFixed(2)},${data.cCoords.y.toFixed(2)},${data.cCoords.z.toFixed(2)}}`,
      `{${data.cCoords.x.toFixed(2)},${data.cCoords.y.toFixed(2)},${data.cCoords.z.toFixed(2)},${data.cHeading.toFixed(2)}}`,
      `{x=${data.cCoords.x.toFixed(2)},y=${data.cCoords.y.toFixed(2)},z=${data.cCoords.z.toFixed(2)}}`,
      `{x=${data.cCoords.x.toFixed(2)},y=${data.cCoords.y.toFixed(2)},z=${data.cCoords.z.toFixed(2)},h=${data.cHeading.toFixed(2)}}`
    ]
    coordsContainer.innerHTML = "";
    coords.forEach((text)=>{
      const option = document.createElement("div");
      option.className = "flex flex-row items-center mb-2";
      option.innerHTML = `<div class="p-[1vh] bg-black rounded h-[4.5vh] w-[35vh]">${text}</div>`;

      const button  = document.createElement("button");
      button.classList = "button ml-2";
      button.innerHTML = '<i class="fad fa-copy"></i>';
      button.addEventListener("click", ()=>{
        copyToClipboard(text);
      });
      option.appendChild(button);
      coordsContainer.appendChild(option);
    })
  }else if(data.copyCoords === false){
    copyCoords = false;
  }

  if(quickCoords){
    document.getElementById("quick-coords").classList.remove("hidden");
  }else if(quickCoords === false){
    document.getElementById("quick-coords").classList.add("hidden");
  }  

  if(copyCoords){
    document.getElementById("copy-coords").classList.remove("hidden");
  }else if(copyCoords === false){
    document.getElementById("copy-coords").classList.add("hidden");
  } 
});

close.addEventListener('click', function(event){
  fetch('https://prx_coords/closeCopy', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(false)
  })
});