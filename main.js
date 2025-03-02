const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev"); // Detects if running in development mode

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // Security best practice
    },
  });

  // Load React app
  const startURL = isDev
    ? "http://localhost:3000" // Development mode
    : `file://${path.join(__dirname, "build", "index.html")}`; // Production mode

  win.loadURL(startURL);

  win.webContents.openDevTools(); // Opens DevTools for debugging (optional)
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
