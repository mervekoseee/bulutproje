import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



class EditMovie extends React.Component {

    state = {
        name: "",
        rating: "",
        overview: "",
        imageURL: ""
    }



    async componentDidMount() {

        const id = this.props.match.params.id;
        //console.log(id)

        const response = await axios.get(`http://localhost:3003/movies/${id}`);
        //console.log(response.data);

        const movie = response.data;

        this.setState({
            name: movie.name,
            rating: movie.rating,
            overview: movie.overview,
            imageURL: movie.imageURL
        })

    }

    onInputChange = (e) => {
    //    console.log(e.target.name);
    //    console.log(e.target.value);

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    gomenu =() =>{
        this.props.history.push("/")
    }

     handleFormSubmit = (e) => {
        e.preventDefault();
/* 
        const name = this.state.name;
        const rating = this.state.rating;
        const overview = this.state.overview;
        const imageURL = this.state.imageURL; */

        const { name, rating, overview, imageURL } = this.state;

        const id = this.props.match.params.id;

        const updatedMovie = {
            name,
            rating,
            overview,
            imageURL
        }

        this.props.onEditMovie(id, updatedMovie);
        this.props.history.push('/');

    }


    render() {

        return  (
            <div>
                <p className="h1">Film Bilgisi</p>
            <form className="mt-5" onSubmit={this.handleFormSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName">Adı</label>
                        <input  type="text" 
                                className="form-control" 
                                name="name"
                                value={this.state.name}
                                onChange={this.onInputChange} disabled/>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRating">Puan</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                name="rating"
                                value={this.state.rating}
                                onChange={this.onInputChange} disabled/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Resim Kaynağı</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                name="imageURL"
                                value={this.state.imageURL}
                                onChange={this.onInputChange} disabled/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="overviewTextarea">Açıklama</label>
                        <textarea 
                                className="form-control" 
                                name="overview" 
                                rows="5"
                                value={this.state.overview}
                                onChange={this.onInputChange} disabled ></textarea>
                    </div>
                </div>
            </form>
            <button  className="btn btn-md btn-primary"
            onClick={() => this.gomenu()}>Ana Menüye Dön</button>
        </div>
  
        )

    }
}


export default EditMovie;