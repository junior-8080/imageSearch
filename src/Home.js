import React, { Component } from 'react'
import MasonryGrid from "masonry-grid"
import {Link} from "react-router-dom"

import Header from './Header'
import Features from './Features'
import Footer from './Footer'
import './home.css'


const api_key = process.env.REACT_APP_API_KEY

class Home extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      images : [],
      query:"",
      isLoading:false,
      pageNumber:1
    }
  }

  componentDidMount(){

    this.setState({isLoading: true})
    fetch(`https://api.unsplash.com/photos/?per_page=30&client_id=`+api_key)
      .then(res => res.json())
      .then(data => {
          this.setState({
            images:data,
            isLoading: false
          })
      })
  }

  handleChange = (event) => (
    this.setState({
      query:event.target.value,
    })
  )

  handleClick = (param) => {
     this.setState({
        query: param
     })
 }
 handleSubmit = (event) =>{
   event.preventDefault()
  this.props.history.push(`/photos/${this.state.query}`)
 }

  render() {
   let post = this.state.images.length !==0?
     this.state.images.map(post => {
            return(
              <div className="masonry-item">
                <div>
                <Link  to= {`/photo/preview/${post.id}`}  className="link">
                   <h5 onClick={this.handlePreview}>View</h5>
                </Link>
                </div>
                  <img className="image" key={post.id} src= {`${post.urls.small}`} alt={`${post.id}`} width="400px" height="auto" />
                </div>
            )
    })
    :null
    return ( 
          this.state.images.length !== 0?
          <div className="home">
            <Header 
                handleClick = {this.handleClick} 
                handleChange = {this.handleChange}
                handleSubmit = {this.handleSubmit}
                 /> 
            <main className="main">
              <Features className="features" handleClick={this.handleClick}  />
              <div className="grid">
                <MasonryGrid gap="2px" minWidth="400">
                    {
                      post
                    }
                </MasonryGrid>
              </div>
             
              
            </main>   
            <Footer />
          </div>
          :
          null
    );
  }

  
}

export default Home;