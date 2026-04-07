

function initVisualizerTracker (vis) {
    if (!vis || vis.dataset.trackerAttached) return;
    vis.dataset.trackerAttached = "true";

    const userID = getOrCreateUserID();

    vis.addEventListener('click', (event) => {
        if (!event.isTrusted) return; // Only human clicks

        const path = event.composedPath();
        const button = path.find(element => element && element.tagName === 'BUTTON');
        if (!button || !button.id) return;

        const targetId = button.id;
        const exampleId = vis.getAttribute('example');
        const userVisualizerKey = `${userID}_vis_${exampleId}`;
        let key = null;

        if (targetId === 'jmpFirstInstr') key = `first_step_${userVisualizerKey}`;
        else if (targetId === 'jmpLastInstr') key = `last_step_${userVisualizerKey}`;
        else if (targetId === 'jmpStepBack') key = `step_back_${userVisualizerKey}`;
        else if (targetId === 'jmpStepFwd') key = `step_forward_${userVisualizerKey}`;
        else return;

        const correctUser = `correct_${userVisualizerKey}`;
        if (key && localStorage.getItem(correctUser) !== 'true') {
            console.log("GA4 Event Sent:", key);
            gtag('event', 'visualizer_attempts', {
                event_category: 'c_visualizer',
                event_label: key,
                debug_mode: true
            });
        }
    }, true);
}

function startVisualizerTracking() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('c-visualizer').forEach(initVisualizerTracker);
        });
    } else {
        document.querySelectorAll('c-visualizer').forEach(initVisualizerTracker);
    }
}