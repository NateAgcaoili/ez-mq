chrome.runtime.onInstalled.addListener(() => {
  // Set default credentials only if they aren't already set
  chrome.storage.local.get(["ezmqLogin"], (result) => {
    if (!result.ezmqLogin) {
      chrome.storage.local.set(
        {
          ezmqLogin: { username: "rabbitmq", password: "rabbitmq" },
          autoLogin: true,
        },
        () => {
          console.log("Default credentials set: rabbitmq / rabbitmq");
          console.log("Autologin set to true");
        }
      );
    }
  });
});
