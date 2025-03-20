# ez mq  
### Never type rabbitmq rabbitmq again  

## Features  

**ez mq** is designed to enhance the efficiency of working with RabbitMQ pages by bypassing the redundant login screen across all environments. Below is a detailed overview of its key features:  

### 1. Auto-Login  
- Automatically fills in and submits login credentials for RabbitMQ environments, eliminating the need to repeatedly enter them.  
- Credentials are securely stored using Chrome's local storage, ensuring privacy and easy access.  
- Can be enabled or disabled at any time via the extension popup for flexibility.  

### 2. Environment Labeling  
- Dynamically detects and labels the current RabbitMQ environment (e.g., **LEVI Stage 2, GXOL Prod**).  
- Displays the environment label prominently at the top of the page for quick reference.  
- Ensures users always know which instance they are working in, reducing accidental operations in the wrong environment.  

### 3. Recently Visited RabbitMQs  
- Tracks and displays the last **12 unique RabbitMQ environments** you’ve accessed.  
- Provides a quick-access section in the popup, allowing users to instantly navigate between frequently used instances.  

---

## Demo Video  

*(Coming soon!)*  

---

## Usage Guide  

### Auto-Login & Environment Labeling  
- As soon as **ez mq** is installed, these features **automatically take effect** when accessing any RabbitMQ environment.  
- The extension detects RabbitMQ login pages and **bypasses the login screen** by auto-filling saved credentials and submitting the form.  
- If credentials are stored, the login process is seamless, reducing the time spent manually logging in.  
- The **environment label** is dynamically extracted from the RabbitMQ URL and displayed at the top of the page, providing clear context on which instance you’re working in (e.g., **LEVI Stage 2**, **GXOL Prod**).  
- No setup is required—just install **ez mq** and start using RabbitMQ pages more efficiently.  

### View Recently Visited MQ Pages  
1. Click on the **ez mq** Chrome extension icon in the browser toolbar to open the popup.  
2. The **"Recently Visited"** section will display up to **12 of the most recently accessed RabbitMQ instances**.  
3. Click on any of the listed environments to **instantly navigate** to that RabbitMQ page.  
4. If no recent MQs exist, a placeholder message will indicate that recent pages will be displayed once visited.  

### Toggling Auto-Login  
1. Click on the **ez mq** Chrome extension icon in the browser toolbar to open the popup.  
2. Click **Edit** to enable editing of the login settings.  
3. Locate the **Auto-Login** toggle switch in the settings section.  
4. Click the switch to enable or disable **Auto-Login**:  
   - **Enabled:** The toggle turns **orange**, and the extension will continue auto-filling login credentials.  
   - **Disabled:** The toggle turns **gray**, and the login screen will require manual entry.  
5. Click **Save** to apply changes.  
6. When **Auto-Login is disabled**, the **ez mq** logo at the top of the popup and the extension icon in the Chrome toolbar will turn **black**, indicating that the feature is off.  

---

## Download  

[Click to download ez mq v1.0.zip](#)  

### Date | Version | Release Notes  
---|---|---  
**1.0** | Initial release  

---

## Installation Guide  

Follow these step-by-step instructions to install the **ez mq** Chrome Extension on your Google Chrome browser.  

### Prerequisites  
- **Google Chrome** installed on your computer.  
- Note: Also compatible with **any Chromium-based browsers** (Edge, Chrome, etc.), though installation steps may slightly differ.  

### Steps to Install  

1. **Download the ZIP file:**  
   - Navigate to the **Download** section and download the latest version of the **ez mq Chrome Extension ZIP file**.  

2. **Extract the ZIP file:**  
   - Locate the ZIP file on your computer, **right-click** on it, and select **"Extract All"** (if on Mac, **double-click** the ZIP file to extract).  
   - Choose a location where you want to save the extracted folder.  

3. **Enable Developer Mode in Google Chrome:**  
   - Open **Google Chrome**.  
   - Click on the **three dots** in the upper-right corner to open the menu.  
   - Go to **Extensions > Manage Extensions**.  
   - In the top-right corner of the Extensions page, toggle the **Developer Mode** switch to enable it.  

4. **Load the Extracted Extension:**  
   - On the **Extensions** page in Chrome, click on the **"Load Unpacked"** button (which appears in the top left corner after enabling Developer Mode).  
   - Navigate to the location where you extracted the **ez mq** folder.  
   - Within the extracted **ez mq** folder, select the folder named **‘ez mq release’** (not the ZIP file or the `ez mq [version]` folder) and click **Select** or **OK** to load the extension into Chrome.  

5. **Verify Installation:**  
   - After loading the folder, the **ez mq** extension should appear in the list of installed extensions.  
   - You should see the **ez mq** icon in your browser’s extension toolbar, indicating that the extension is active and ready to use.  

6. **(Optional) Pin extension for future easy access:**  
   - Click on the **Extensions** icon in the Chrome toolbar.  
   - Find **ez mq** and click the **pin icon** to keep it visible for quick access.  

---

## Using the Extension  

Now that you've installed the **ez mq** extension, you can begin using it to enhance your experience on RabbitMQ.  
Simply navigate to a **RabbitMQ page**, and the extension will automatically provide its features.  

---

## Troubleshooting  

If you encounter issues during installation:  

- Ensure that you have **extracted the ZIP file** before attempting to load the extension in Chrome.  
- Make sure that you select the **correct folder** that contains the extension files when loading it in Chrome.  
- Check that you have the **latest version of Google Chrome** installed on your computer.  

---

## Contact  

For support, feature suggestions, or to report bugs, contact:  

📧 **Email:** [nagcaoili@manh.com](mailto:nagcaoili@manh.com)  
🔗 **Confluence:** [Confluence Page](https://manhattanassociates.atlassian.net/wiki/spaces/ActivePSO/pages/edit-v2/6031081474)  
💬 **Teams:** Nathan Agcaoili  
