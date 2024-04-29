window.dotify.components.createPlaylistList = (songs = []) => {
    console.log(songs);
    const songsToRows = songs.map(song => {
        return `
        <tr>
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.duration}</td>
        </tr>`
    });
    return  `
    <div class="column is-8">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
            ${songsToRows.join()}
            </tbody>
        </table>
    </div>`
}
