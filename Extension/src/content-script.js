/* eslint-disable no-undef, no-console */
console.log('CONTENT-SCRIPT');

window.addEventListener('TEST-EVENT', (e) => {
    const paramsToSave = e.detail;
    console.log(paramsToSave);
});
