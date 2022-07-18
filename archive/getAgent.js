const injectables = {
    UNIQUE_APP_POSTFIX,
    GET_MUSIC_API_STATUS,
};

const VAR_REGEX = /(?:(?!'\$).)([a-zA-z]*?)(?:(?=\$').)/g;
const VAR_MASK_REGEX = /\$/g;

function getAgent(agentName) {
    const agent = this[agentName];
    const agentString = agent.toString();
    let agentBody = agentString;

    // Get injectables from agent's code e.x '$GET_MUSIC_API_STATUS$'
    const injectablesMasks = agentString.match(VAR_REGEX);

    injectablesMasks.forEach((mask) => {
        // Mask '$GET_MUSIC_API_STATUS$' into key 'GET_MUSIC_API_STATUS'
        const key = mask.replace(VAR_MASK_REGEX, '');
        agentBody = agentBody
            .replace(mask, `${injectables[key]}`);
    });

    // Return new function with injected arguments
    return new Function(`return ${agentBody}`)(); // eslint-disable-line no-new-func
}
