module.exports = function(name) {
    return `
import { createApp } from 'vue';
import ${name} from './${name}.vue';

export function load() {
    const selector = '${name.toLowerCase().replace(/ /g, '-')}';

    // Is the custom Vue root element in the DOM?

    if (!document.querySelector(selector)) {
        return;
    }

    // Create a new Vue app with the imported component

    const app = createApp(${name}, {
        props: { ...window[selector] }
    })
    app.mount(selector)
}
`
}  