import React, { useEffect, useState } from 'react';
import axios from './axios';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';


const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title,fetchUrl,isLargeRow}) {
    const [movies,setMovies]=useState([]);
    const[trailerUrl,setTrailerUrl]= useState("");
    // a sniper of code which runs based on a specific condition/variable//
    useEffect(()=>{
        //if [] is blank,run once when the row loads and dont run again//
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;

        }
        fetchData()
    }, [fetchUrl]);

    const opts={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1,
        },
    }


    console.table(movies);
    const handleClick = (movie)=>{
        if(trailerUrl){
            setTrailerUrl('')
        }else {
            movieTrailer(movie?.name||"")
            .then((url)=>{
            
                    const urlParams =new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                    //this is used to get the id of video i.e www.youtube.com/watch?v=Xtdjsk, in this link the id comes in v=
                })
             .catch(error=> console.log(error));
        }
    }

    return(
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                 {/* several row__posters */}
                 {movies.map(movie => (
                   <img
                     key={movie.id}/*when the row moves this helps react to move particulary to that thing and not entire row since every poster has particular id*/
                     onClick={()=>handleClick(movie)}
                     className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                     src={` ${base_url}${
                         isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`} 
                     alt={movie.name}/>
                 ))}
            </div>
           {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

    
export default Row;
