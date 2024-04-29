window.dotify.components.createPlaylistItem = (playlist) => {
    return `
    <div class="column is-4">
      <section class="card has-text-centered">
        <header class="card-header">
          <p class="card-header-title is-size-4 is-centered">
            ${playlist.name}
          </p>
        </header>
        <div class="card-image">
          <figure class="image">
            <img src="${playlist.imageUrl}" alt="Image">
          </figure>
        </div>
        <article class="card-content">
          <p class="content is-size-4">
            ${playlist.description}
          </p>
        </article>
        <footer class="card-footer">
          <a class="card-footer-item button has-background-grey-lighter">Play</a>
          <a href="/playlist/?name=${playlist.name}" class="card-footer-item button has-background-grey-lighter">Open</a>
          <a class="card-footer-item button has-background-grey-lighter">Remove</a>
        </footer>
      </section>
    </div>`
}