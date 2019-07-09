const MARKER_PARAMS = {
    titleTextColor: 'black',
    valueTextColor: 'black',
    planeColor: 'white'
};

fetch('/tags.json')
    .then(response => response.json())
    .then(renderTags)
    .then(connectToWincc)
    .catch(alert);


function renderTags(tags) {
    const scene = document.querySelector('a-scene');
    tags.forEach(tag => {
        scene.insertAdjacentHTML('afterbegin', getTagHtml(tag));
    });

    return tags;
}

function getTagHtml(tag) {
    return `<a-marker type='barcode' value='${tag.id}'>
                <a-plane position='0 0 0' rotation='-90 0 0' color='${MARKER_PARAMS.planeColor}' height='3' width='3.8'></a-plane>
                <a-entity rotation='-90 0 0' position='1.5 1 -0.25' scale='5 5 5' text='value: ${tag.title}; color: ${MARKER_PARAMS.titleTextColor};'></a-entity>
                <a-entity rotation='-90 0 0' id='tag-${tag.id}' position='1.5 1 0' scale='5 5 5' text='value: Current value - # (${tag.metres}); color: ${MARKER_PARAMS.valueTextColor};'>
                </a-entity></a-marker>`;
}

function connectToWincc(tags) {
    const socket = io();

    socket.on('connect', () => {
        tags.forEach(tag => {
            socket.emit('reg-tag', tag);
        });
    });

    socket.on('wincc-error', (error) => {
        console.error(error);
        socket.disconnect();
        alert(error);
    });

    socket.on('new-tag-value', (tag) => {
        const el = document.querySelector('#tag-' + tag.id);
        el.setAttribute('text', `value: Current value -  ${Math.round(tag.value * 100) / 100} (${tag.metres}); color: ${MARKER_PARAMS.valueTextColor};`);
    });

}
