function download(url, filename = 'screenshot') {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}
let countItem = 1;
let rowItem = 1;
let imgBefore = false;

document.onpaste = function (pasteEvent) {
  var item = pasteEvent.clipboardData.items[0];
  const imgContainer = document.getElementById('container');
  const historyContainer = document.getElementById('history');
  const customName = document.getElementById('customName');
  const textImgName = document.getElementById('textImgName');

  if (item.type.indexOf('image') === 0) {
    var blob = item.getAsFile();
    var reader = new FileReader();
    reader.onload = function (event) {
      imgContainer.src = event.target.result;
      const dateNow = Date.now();
      const filename = customName.value
        ? `${customName.value}_${dateNow}`
        : `screenshot_${dateNow}`;

      const filenameWithFileType = `${filename}.${blob.type.split('/')[1]}`;

      const imgHistory = document.createElement('img');
      const br = document.createElement('br');

      if (countItem > 4) {
        historyContainer.appendChild(br);
        rowItem += 1;
        countItem = 1;
      }
      if (rowItem > 1) {
        imgHistory.classList.add('mt-3');
      }
      imgHistory.id = dateNow;
      imgHistory.classList.add('ms-3');
      imgHistory.src = event.target.result;

      imgHistory.addEventListener('click', () => {
        imgContainer.src = event.target.result;
        textImgName.innerText = filenameWithFileType;

        imgContainer.scrollIntoView();
        if (imgBefore) {
          imgBefore.classList.remove('selectedImg');
        }
        imgBefore = imgHistory;
        imgHistory.classList.add('selectedImg');
      });

      textImgName.innerText = filenameWithFileType;

      historyContainer.appendChild(imgHistory);
      countItem += 1;

      download(reader.result, filenameWithFileType);
    };
    reader.readAsDataURL(blob);
  }
};
