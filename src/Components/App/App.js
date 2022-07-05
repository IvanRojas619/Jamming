
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { //Arreglo de objetos de resultados
      searchResults: [], /*[{ name: 'name1', artist: 'artist1', album: 'album1', id: 1 },
      { name: 'name2', artist: 'artist2', album: 'album2', id: 2 },
      { name: 'name3', artist: 'artist3', album: 'album3', id: 3 }],*/

      playlistName: 'My playlist', //Pass down Playlist to TrackList seccion : Nombre de Playlist y arreglo de playlistracks
      playlistTracks: [] /*[{ name: 'playlistName1', artist: 'playlistArtist1', album: 'playlistAlbum1', id: 4 },
      { name: 'playlistName2', artist: 'playlistArtist2', album: 'playlistAlbum2', id: 5 },
      { name: 'playlistName3', artist: 'playlistArtist3', album: 'playlistAlbum3', id: 6 }]*/

    } 

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search= this.search.bind(this);
  }//End of the constructor

  addTrack(track) { //se le pasa un objeto de tipo playlist
    let tracks = this.state.playlistTracks // guardamos el state inicial de la playlisttracks
    if (tracks.find(savedTrack => savedTrack.id === track.id)) { // valida si el track id es igual al tracks id del state
      return alert('ya esta esta cancion no la puedes volver a agregar');// namas es return;
    }
    tracks.push(track); // si no existe ya en la lista lo agrega hasta el final
    this.setState({ playlistTracks: tracks }); // actualizamos en state con la nueva track agregada

  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });

  }
  savePlayList() {
    //alert("this method is linked to the button correctly");
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(()=>{
      this.setState({
        playlistName: 'New PlayList',
        playlistTracks: []
      })
    })
  }

  search(term){
Spotify.search(term).then(searchResults =>{
  this.setState({searchResults:searchResults});
})
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} /> {/*1)Le paso el state searchResults al componente searchResults */}
            <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName} 
            onSave={this.savePlayList}
            />{/*Pass down Playlist to TrackList seccion : le paso las playlistTracks y el playlistName al componente <Playlist/> */}
          </div>
        </div>
      </div>
    );

  }
}

export default App;
