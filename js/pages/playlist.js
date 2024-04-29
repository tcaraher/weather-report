document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playlistName = urlParams.get('name');

    // const weatherData = dotify.dataStore.list().find(item => item.name === playlistName);
    const weatherData = dotify.dataStore.list().find(item => item.name === playlistName);
    document.getElementById('page-heading').textContent = weatherData.name;

    const main = document.querySelector('main');
    main.innerHTML = main.innerHTML + dotify.components.createPlaylistItem(weatherData);
    main.innerHTML = main.innerHTML + dotify.components.createPlaylistList(weatherData.songs);
});