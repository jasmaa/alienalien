// background.js
// Persistant background data

let aliensEnabled = true;

function getAliensEnabled() {
    return aliensEnabled
}

function setAliensEnabled(v) {
    aliensEnabled = v;
}

chrome.runtime.onMessage.addListener(({ type }, sender) => {
    switch (type) {
        case 'init':
            chrome.tabs.sendMessage(
                sender.tab.id,
                {
                    type: 'init',
                    message: { aliensEnabled: aliensEnabled },
                });
            break;
    }
});
