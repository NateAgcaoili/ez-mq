// 1) Function to detect if the MQ login form exists on the page
function detectMqLoginPage() {
  const form = document.querySelector('form[action="#/login"][method="put"]');
  if (!form) return false;

  const usernameInput = form.querySelector('input[name="username"]');
  const passwordInput = form.querySelector('input[name="password"]');
  const loginButton = form.querySelector('input[type="submit"][value="Login"]');

  return usernameInput && passwordInput && loginButton;
}

/**
 * Extracts the portion of the subdomain before the first dash.
 */
function getSubdomainBeforeDash() {
  const host = window.location.hostname;
  const subdomain = host.split(".")[0];
  return subdomain.split("-")[0];
}

/**
 * Given a subdomain portion, returns an object { clientCode, envSuffix }.
 */
function parseClientAndEnv(subdomainPart) {
  const clientCodeRaw = subdomainPart.slice(0, 4);
  const envSuffix = subdomainPart.slice(4);
  return { clientCode: clientCodeRaw.toUpperCase(), envSuffix };
}

/**
 * Converts an environment suffix into a human-readable name.
 */
function getEnvironmentLabel(envSuffix) {
  if (!envSuffix) return "";
  const letter = envSuffix[0];
  const digits = envSuffix.slice(1);

  switch (letter) {
    case "p":
      return "Prod" + (digits ? ` ${digits}` : "");
    case "s":
      return "Stage" + (digits ? ` ${digits}` : "");
    case "d":
      return "Dev" + (digits ? ` ${digits}` : "");
    case "v":
      return "VPT" + (digits ? ` ${digits}` : "");
    default:
      return envSuffix;
  }
}

/**
 * Stores recent MQ environments, keeping only the latest 12 unique entries.
 */
function storeRecentMQ(label, url) {
  chrome.storage.local.get({ recentMQs: [] }, (data) => {
    let recents = data.recentMQs;
    const normalizedUrl = url.split(".com")[0] + ".com/#/";

    recents = recents.filter(
      (entry) => entry.label !== label && entry.url !== normalizedUrl
    );

    recents.unshift({ label, url: normalizedUrl });

    if (recents.length > 12) {
      recents = recents.slice(0, 12);
    }

    chrome.storage.local.set({ recentMQs: recents });
  });
}

/**
 * Updates the environment label in the UI.
 */
function updateVersions() {
  const versionsSpan = document.querySelector("#versions");
  if (!versionsSpan) return;

  const subdomainPart = getSubdomainBeforeDash();
  const { clientCode, envSuffix } = parseClientAndEnv(subdomainPart);
  const envLabel = getEnvironmentLabel(envSuffix);
  const finalLabel = envLabel ? `${clientCode} ${envLabel}` : clientCode;

  storeRecentMQ(finalLabel, window.location.href);

  const newAbbr = document.createElement("abbr");
  newAbbr.style.backgroundColor = "#ff6600";
  newAbbr.style.color = "white";
  newAbbr.textContent = finalLabel;

  versionsSpan.prepend(newAbbr);
}

// Ensure version labels always update
updateVersions();

// 2) Main logic
(async () => {
  const { autoLogin } = await new Promise((resolve) => {
    chrome.storage.local.get(["autoLogin"], (result) => resolve(result));
  });

  if (!autoLogin) return; // Only disable auto-login, but allow everything else to run

  if (!detectMqLoginPage()) return;

  const { ezmqLogin } = await new Promise((resolve) => {
    chrome.storage.local.get(["ezmqLogin"], (result) => resolve(result));
  });

  if (ezmqLogin?.username && ezmqLogin?.password) {
    const form = document.querySelector('form[action="#/login"][method="put"]');
    const usernameInput = form.querySelector('input[name="username"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const loginButton = form.querySelector(
      'input[type="submit"][value="Login"]'
    );

    usernameInput.value = ezmqLogin.username;
    passwordInput.value = ezmqLogin.password;

    loginButton.click();
    updateVersions();
  }
})();
