const waitPageLoad = (trigger) => {
    browser.executeScript(function () {
        window['__href'] = location.href;
        window['__loaded'] = (document.readyState === 'complete');

        document.addEventListener('readystatechange', function () {
            window['__loaded'] = (document.readyState === 'complete');
        }, false);
    });

    trigger.call();

    let changed = false;
    browser.wait(function () {
        browser.executeScript(function () {
            var loadedVarIsLost = typeof window['__loaded'] == 'undefined';
            var locationHasChanged = window['__href'] !== window.location.href;
            var angularIsPresent = !!window.angular;

            return (loadedVarIsLost || locationHasChanged) && angularIsPresent;
        }).then(function (changed_) {
            changed = changed_;
        });

        return changed;
    });
};

module.exports = waitPageLoad;
