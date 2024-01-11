const dropArea = document.getElementById('drop-area');
  const fileInput = document.getElementById('fileElem');
  const fileNamesContainer = document.getElementById('file-names');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight() {
    dropArea.classList.add('highlight');
  }

  function unhighlight() {
    dropArea.classList.remove('highlight');
  }

  dropArea.addEventListener('drop', handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
  }

  function handleFiles(files) {
    const fileNames = [...files].map(file => file.name);
    appendFileNames(fileNames);
  }

  function appendFileNames(fileNames) {
    fileNames.forEach(fileName => {
      const fileNameElement = document.createElement('p');
      fileNameElement.textContent = fileName;
      fileNamesContainer.appendChild(fileNameElement);
    });
  }

  dropArea.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    const fileNames = [...files].map(file => file.name);
    appendFileNames(fileNames);
  });