import React ,{ useEffect, useRef ,useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title, category}) => {

const [ApiData, setApiData] = useState([]);
const cardsRef=useRef();


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDI3MDZkNGM2ODE4MTYzYWI5MjI0YWM0YTAxNTAzYiIsIm5iZiI6MTc1NzAyMzQzNi43MjMsInN1YiI6IjY4YmEwY2NjODg0MGU3OTc2NDk4YWY2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GNEwvNywfxVS744UOAAp-LG-5WmNfcYQ42sK899c1t0'
  }
};


const handleWheel =(event)=>{

  event.preventDefault();
  cardsRef.current.scrollLeft+= event.deltaY;
                           }

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel' , handleWheel);

},[])


  return (
    <div className='title-cards'>

      <h2> {title?title: "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {ApiData.map((card, index)=>{

       return <Link to={`/player/${card.id}`}className="card" key={index}>
        <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""/>
        <p>{card.original_title}</p>
        </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
