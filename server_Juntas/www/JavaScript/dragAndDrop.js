function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('drop-area').classList.add('highlight');
  }

  function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('drop-area').classList.remove('highlight');
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('drop-area').classList.remove('highlight');

    const files = event.dataTransfer.files;
    handleFiles(files);
  }

  function handleFiles(files) {
    const fileList = document.getElementById('file-list');

    // Clear previous files
    fileList.innerHTML = '';

    // Display the new files
    for (const file of files) {
      const listItem = document.createElement('li');

      // Get file extension
      const extension = file.name.split('.').pop().toLowerCase();

      // Use a default icon if the extension is not mapped
      const iconSrc = getFileIconSrc(extension) || 'default-icon.png';

      // Create an image element for the icon
      const icon = document.createElement('img');
      icon.src = iconSrc;
      icon.alt = 'File Icon';
      icon.className = 'file-icon';

      // Append the icon and file name to the list item
      listItem.appendChild(icon);
      listItem.textContent = file.name;

      // Append the list item to the file list
      fileList.appendChild(listItem);
    }
  }

  // Clicking the drop area triggers the hidden file input
  document.getElementById('drop-area').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  // Handle file selection using the file input
  document.getElementById('fileInput').addEventListener('change', function() {
    const files = this.files;
    handleFiles(files);
  });

  function getFileIconSrc(extension) {
    // Map file extensions to corresponding icons
    const iconMap = {
      'pdf': 'pdf-icon.png',
      'jpg': 'jpg-icon.png',
      'png': 'png-icon.png',
      // Add more mappings as needed
    };

    return iconMap[extension];
  }