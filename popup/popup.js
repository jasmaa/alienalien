// popup.js
// Popup script

/**
 * Style button based on enabled
 * @param {*} enabled 
 */
const setEnableButton = (enabled) => {
    if (enabled) {
        $('#alienToggle')
            .removeClass('btn-outline-danger')
            .addClass('btn-outline-success');
        $('#alienToggle').html('Aliens On');
    }
    else {
        $('#alienToggle')
            .removeClass('btn-outline-success')
            .addClass('btn-outline-danger');
        $('#alienToggle').html('Aliens Off');
    }
}

chrome.runtime.getBackgroundPage(
    page => {
        // Set enabled
        let aliensEnabled = page.getAliensEnabled();
        setEnableButton(aliensEnabled);

        $('#alienToggle').click(() => {

            aliensEnabled = !aliensEnabled;
            page.setAliensEnabled(aliensEnabled);
            setEnableButton(aliensEnabled);

            chrome.tabs.query({}, (tabs) => {
                for (const tab of tabs) {
                    chrome.tabs.sendMessage(tab.id, {
                        type: 'update',
                        message: { aliensEnabled: aliensEnabled },
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