import React, { useEffect , useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {

 const{id} = useParams();
 const navigate= useNavigate();



const[ApiData ,setApiData] =useState({

  name: "",
  key: "",
  published_at: "",
  typeof: ""

})

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDI3MDZkNGM2ODE4MTYzYWI5MjI0YWM0YTAxNTAzYiIsIm5iZiI6MTc1NzAyMzQzNi43MjMsInN1YiI6IjY4YmEwY2NjODg0MGU3OTc2NDk4YWY2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GNEwvNywfxVS744UOAAp-LG-5WmNfcYQ42sK899c1t0'
  }
};

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));

},[])




  return (
    <div className='player'>
      <img src={back_arrow_icon} alt=""  onClick={()=>{navigate(-2)}} />
      <iframe width ='90%' height='90%'
      src= {`https://www.youtube.com/embed/${ApiData.key}`}
      title='trailer' frameBorder='0'allowFullScreen>

      </iframe>
      <div className="player-info">
        <p>{ApiData.published_at.slice(0,10)}</p>
        <p>{ApiData.name}</p>
        <p>{ApiData.type}</p>
      </div>
      
    </div>
  )
}

export default Player
