const { app, BrowserWindow } = require('electron');
const path = require('path');

app.allowRendererProcessReuse = true;


const windowsCount = 10;
let index = 0;

function createWindows () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html');

  ++index;

  if (index < windowsCount) {
    setTimeout(() => {
      win.close();
      createWindows();
    }, 1000);
  }
  else {
    setTimeout(() => {
      process.takeHeapSnapshot(path.join(__dirname, 'browser.heapsnapshot'));
    }, 10000);
  }
}

app.whenReady().then(createWindows);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows()
  }
})