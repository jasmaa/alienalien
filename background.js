// background.js
// Persistant background data

let aliensEnabled = true;
function getAliensEnabled() {
    return aliensEnabled
}
function setAliensEnabled(v) {
    aliensEnabled = v;
}

let aliensCount = 8;
function getAliensCount() {
    return aliensCount
}
function setAliensCount(v) {
    aliensCount = v;
}

chrome.runtime.onMessage.addListener(({ type }, sender) => {
    switch (type) {
        case 'init':
            chrome.tabs.sendMessage(
                sender.tab.id,
                {
                    type: 'init',
                    message: {
                        aliensEnabled: aliensEnabled,
                        aliensCount: aliensCount,
                    },
                });
            break;
    }
});
