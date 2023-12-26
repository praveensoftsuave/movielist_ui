import './styles.scss'
import { useNavigate } from "react-router-dom";

const MovieCard = ({data}:any)=>{
    const navigate = useNavigate()

    return(
        <div className="Movie-Card" onClick={()=>navigate(`/movie/edit/${data.id}`)}>
         <img alt='' src={data?.imgUrl} draggable="false" />
         <div>
         <h3>{data?.title}</h3>
         <p>{data?.year}</p>
         </div>
         
        </div>
    )
}

export default MovieCard;