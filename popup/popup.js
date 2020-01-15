/*
chrome.tabs.query(
    { active: true, currentWindow: true },
    (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { message: "hello" })
    }
);
*/

$('#alienToggle').change(() => {
    chrome.tabs.query(
        { active: true, currentWindow: true },
        (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { message: $('#alienToggle').prop("checked") });
        }
    );
});