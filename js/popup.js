function renderRecentMQs() {
  chrome.storage.local.get({ recentMQs: [] }, (data) => {
    const recents = data.recentMQs;
    const container = document.getElementById("mq-scroll-container");

    if (!container) return;

    // Clear existing items
    container.innerHTML = "";

    if (recents.length === 0) {
      // Show placeholder text when no MQs exist
      container.innerHTML = `<p class="mq-placeholder">Your recent MQs will appear here.</p>`;
      return;
    }

    // Populate recent MQs
    recents.forEach((item) => {
      const mqDiv = document.createElement("div");
      mqDiv.className = "mq-item";
      mqDiv.textContent = item.label;

      // On click, open the MQ link in a new tab
      mqDiv.addEventListener("click", () => {
        chrome.tabs.create({ url: item.url });
      });

      container.appendChild(mqDiv);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderRecentMQs();

  const saveButton = document.getElementById("saveButton");
  const autoLoginContainer = document.querySelector(".toggle-container");
  const leftArrow = document.getElementById("mq-left-arrow");
  const rightArrow = document.getElementById("mq-right-arrow");
  const scrollContainer = document.getElementById("mq-scroll-container");
  const logoImg = document.getElementById("logo");
  const ezText = document.querySelector(".title-container .ez");
  const fadeLeft = document.createElement("div");
  const fadeRight = document.createElement("div");
  const extensionId = chrome.runtime.id;

  let isEditMode = false;
  let autoLoginSwitch;

  // Load auto-login preference and dynamically insert the switch
  chrome.storage.local.get({ autoLogin: true }, (data) => {
    autoLoginSwitch = document.createElement("div");
    autoLoginSwitch.classList.add("toggle-switch");

    const autoLoginInner = document.createElement("div");
    autoLoginInner.classList.add("toggle-inner");
    autoLoginSwitch.appendChild(autoLoginInner);
    autoLoginContainer.appendChild(autoLoginSwitch);

    if (data.autoLogin) {
      autoLoginSwitch.classList.add("active");
      autoLoginInner.style.left = "26px";
    } else {
      autoLoginSwitch.classList.remove("active");
      autoLoginInner.style.left = "3px";
    }

    setHeaderColor(data.autoLogin); // Set initial header color
    updateToggleState();

    autoLoginSwitch.addEventListener("click", () => {
      if (!isEditMode) return;
      const isActive = autoLoginSwitch.classList.toggle("active");

      autoLoginInner.style.transition = "left 0.3s ease-in-out";
      autoLoginInner.style.left = isActive ? "26px" : "3px";
      autoLoginSwitch.style.backgroundColor = isActive ? "#ff6600" : "#666";

      updateToggleState();
    });
  });

  function updateExtensionIcon(isEnabled) {
    const iconPath = isEnabled
      ? {
          16: `chrome-extension://${extensionId}/assets/icons/icon16.png`,
          48: `chrome-extension://${extensionId}/assets/icons/icon48.png`,
          128: `chrome-extension://${extensionId}/assets/icons/icon128.png`,
        }
      : {
          16: `chrome-extension://${extensionId}/assets/icons/icon16_black.png`,
          48: `chrome-extension://${extensionId}/assets/icons/icon48_black.png`,
          128: `chrome-extension://${extensionId}/assets/icons/icon128_black.png`,
        };

    chrome.action.setIcon({ path: iconPath });
  }

  function updateToggleState() {
    if (!autoLoginSwitch) return;

    if (isEditMode) {
      autoLoginSwitch.classList.remove("disabled");

      // Fix: Ensure proper orange when edit mode is enabled and switch is active
      if (autoLoginSwitch.classList.contains("active")) {
        autoLoginSwitch.style.backgroundColor = "#ff6600"; // Correct orange
      } else {
        autoLoginSwitch.style.backgroundColor = "#666"; // Default gray
      }
    } else {
      autoLoginSwitch.classList.add("disabled");
      autoLoginSwitch.style.backgroundColor =
        autoLoginSwitch.classList.contains("active")
          ? "#ffb266" // Faded orange when disabled
          : "#666"; // Default gray
    }
  }

  function setHeaderColor(isActive, withTransition = false) {
    if (withTransition) {
      logoImg.style.transition = "filter 0.5s ease-in-out";
      ezText.style.transition = "color 0.5s ease-in-out";
    } else {
      logoImg.style.transition = "none";
      ezText.style.transition = "none";
    }

    if (isActive) {
      logoImg.style.filter = "none";
      ezText.style.color = "#ff6600";
    } else {
      logoImg.style.filter = "brightness(0)";
      ezText.style.color = "#000";
    }
  }

  function shakeElement(element) {
    element.classList.add("shake");
    setTimeout(() => {
      element.classList.remove("shake");
    }, 500);
  }

  leftArrow.addEventListener("click", () => {
    if (scrollContainer.scrollLeft <= 0) {
      shakeElement(scrollContainer);
    } else {
      scrollContainer.scrollLeft -= 200;
    }
  });

  rightArrow.addEventListener("click", () => {
    if (
      scrollContainer.scrollLeft + scrollContainer.clientWidth >=
      scrollContainer.scrollWidth
    ) {
      shakeElement(scrollContainer);
    } else {
      scrollContainer.scrollLeft += 200;
    }
  });

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  logoImg.src = `chrome-extension://${extensionId}/assets/images/rabbitmq.svg`;

  function setEditMode(edit) {
    isEditMode = edit;
    usernameInput.disabled = !edit;
    passwordInput.disabled = !edit;
    passwordInput.type = edit ? "text" : "password";
    saveButton.textContent = edit ? "Save" : "Edit";
    updateSaveButtonState();
    updateToggleState();
  }

  function updateSaveButtonState() {
    if (!isEditMode) {
      saveButton.disabled = false;
    } else {
      const usernameVal = usernameInput.value.trim();
      const passwordVal = passwordInput.value.trim();
      saveButton.disabled = usernameVal === "" || passwordVal === "";
    }
  }

  usernameInput.addEventListener("input", updateSaveButtonState);
  passwordInput.addEventListener("input", updateSaveButtonState);

  chrome.storage.local.get(["ezmqLogin"], (result) => {
    const storedLogin = result.ezmqLogin;
    if (storedLogin) {
      usernameInput.value = storedLogin.username || "";
      passwordInput.value = storedLogin.password || "";
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  });

  saveButton.addEventListener("click", () => {
    if (!isEditMode) {
      setEditMode(true);
    } else {
      const usernameVal = usernameInput.value.trim();
      const passwordVal = passwordInput.value.trim();

      if (usernameVal && passwordVal) {
        chrome.storage.local.set(
          { ezmqLogin: { username: usernameVal, password: passwordVal } },
          () => {
            console.log("ez mq credentials saved:", {
              username: usernameVal,
              password: passwordVal,
            });
            setEditMode(false);
          }
        );

        const isAutoLoginActive = autoLoginSwitch.classList.contains("active");
        chrome.storage.local.set({ autoLogin: isAutoLoginActive }, () => {
          setHeaderColor(isAutoLoginActive, true);
          updateExtensionIcon(isAutoLoginActive);
        });
      } else {
        console.warn("Both fields must be filled before saving.");
      }
    }
  });
});
