import React , { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';

const postsPerPage = 3;
let arrayForHoldingPosts = [];

const MovieList = (props) => {
  const [postsToShow, setPostsToShow] = useState([]);
  const [next, setNext] = useState(3);
  const loopWithSlice = (start, end) => {
    const slicedPosts = props.movies.slice(start, end);
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    setPostsToShow(arrayForHoldingPosts);
  };
  useEffect(() => {
    loopWithSlice(0, postsPerPage);
  }, []);
  const handleShowMorePosts = () => {
    loopWithSlice(next, next + postsPerPage);
    setNext(next + postsPerPage);
  };

    const truncateOverview = (string, maxLength) => {
        if (!string) return null;
        if (string.length <= maxLength ) return string;
        return `${string.substring(0, maxLength)} ...`;
    }
    
  
        return (
            <div className="row">

                {props.movies.map((movie, i) => (

                    <div className="col-lg-4" key={i}>
                        <div className="card mb-4 shadow-sm">
                            <img src={movie.imageURL} className="card-img-top" alt="Sample Movie" />
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text">{truncateOverview(movie.overview, 100)}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                <Link type="button"
                                className="btn btn-primary"
                                to={`edit/${movie.id}`}
                                >İncele </Link>
                                    <h2><span className="badge badge-info">{movie.rating}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
         {/* <button onClick={handleShowMorePosts}>Load more</button> */}
          <div className='container'>
          <Link
                                to="/add"
                                type="button" 
                                className="btn btn-md btn-success"
                                style={{float:'right'}}>Film Öner
                        </Link>

          </div>
                
            </div>
        )
}

export default MovieList;