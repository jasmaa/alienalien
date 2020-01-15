// popup.js
// Popup script

/**
 * Style button based on enabled
 * @param {*} enabled 
 */
const setEnableButton = (enabled) => {
    if (enabled) {
        $('#alienToggle')
            .removeClass('btn-danger')
            .addClass('btn-success');
        $('#alienToggle').html('On');
    }
    else {
        $('#alienToggle')
            .removeClass('btn-success')
            .addClass('btn-danger');
        $('#alienToggle').html('Off');
    }
}

const setCountButton = (count) => {
    $('#aliensCount').html(count);
}

chrome.runtime.getBackgroundPage(
    page => {
        // Set enabled
        let aliensEnabled = page.getAliensEnabled();
        setEnableButton(aliensEnabled);
        let aliensCount = page.getAliensCount();
        setCountButton(aliensCount);

        $('#incAliens').click(() => {
            if(aliensCount >= 30){
                return;
            }

            aliensCount++;
            page.setAliensCount(aliensCount);
            setCountButton(aliensCount);
            
            chrome.tabs.query({}, (tabs) => {
                for (const tab of tabs) {
                    chrome.tabs.sendMessage(tab.id, {
                        type: 'inc',
                        message: { aliensEnabled: aliensEnabled },
                    });
                }
            });
        });
        $('#decAliens').click(() => {
            if(aliensCount <= 0){
                return;
            }

            aliensCount--;
            page.setAliensCount(aliensCount);
            setCountButton(aliensCount);
            
            chrome.tabs.query({}, (tabs) => {
                for (const tab of tabs) {
                    chrome.tabs.sendMessage(tab.id, {
                        type: 'dec',
                        message: { aliensEnabled: aliensEnabled },
                    });
                }
            });
        });

        $('#alienToggle').click(() => {
            aliensEnabled = !aliensEnabled;
            page.setAliensEnabled(aliensEnabled);
            setEnableButton(aliensEnabled);
            
            chrome.tabs.query({}, (tabs) => {
                for (const tab of tabs) {
                    chrome.tabs.sendMessage(tab.id, {
                        type: 'toggle',
                        message: { aliensEnabled: aliensEnabled, aliensCount: aliensCount },
                    });
                }
            });
        });
    }
);

$('body').on('click', 'a', function () {
    chrome.tabs.create({ url: $(this).attr('href') });
    return false;
});