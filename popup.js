document.addEventListener('DOMContentLoaded', function () {
  const resultElement = document.getElementById('result');

  document.getElementById('findSource').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: findVideoSource
      }, function (result) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          resultElement.textContent = 'Error occurred';
        } else {
          resultElement.textContent = (result[0].result || 'Not found');
        }
      });
    });
  });
});

function findVideoSource() {
  const sourceElement = document.querySelector('video > source');
  if (sourceElement) {
    return sourceElement.getAttribute('src');
  }
  return "No video > source element found";
}
