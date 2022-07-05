import React from "react";
import './TrackList.css'; 
import Track from '../Track/Track'

class TrackList extends React.Component {

    render(){

        return(
            <div className="TrackList">
    {
        this.props.tracks.map(track =>{ //3)Utilizando la funcion map por cada track en el arreglo  retorna un componente <Track/> pasandole como props una track de arreglo
            return <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>;
        })
    }
</div>

        );
    }


}

export default TrackList;

