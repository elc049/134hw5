const analytics = firebase.analytics();

window.addEventListener("DOMContentLoaded", () => {
    firebase.analytics().logEvent('page_view');
});