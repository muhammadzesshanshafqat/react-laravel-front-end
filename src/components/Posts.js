import React, { Component } from "react";
import Post from './Post';
import axios from 'axios';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            posts: [],
            loadingPosts: false
        }

        this.getPostsForUser = this.getPostsForUser.bind(this);
    } 

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('localUserData'));
        this.setState({
            user: userData.user
        });

        if(userData) {
            this.getPostsForUser(userData.user.id);
        }
    }

    getPostsForUser(userId) {
        this.setState({
            loadingPosts: true,
        });
        return axios.get('http://127.0.0.1/api/posts', {
            params: {
                userId: userId
            }
        }).then((responseData) => {
            this.setState({
                posts: responseData.data,
                loadingPosts: false
            });
        });
    }

    render() {
        const noPosts = !this.state.loadingPosts && this.state.posts.length === 0;
        const loadingPosts = this.state.loadingPosts;
        return(
            <div className="container" style={{overflowY: "scroll"}}>
                <ul>
                    {loadingPosts && <div style={{position: "absolute" , right: "540px", top: "349px"}}>Loading posts...</div>}
                    {noPosts && <div style={{position: "absolute" , right: "540px", top: "349px"}}>You do not have any posts.</div>}
                    {this.state.posts.map((post, index) => {
                        return <Post key={index} post={post} style={{backgroundColor: "white"}}/>;
                    })}
                </ul>
            </div>

           

        );
    }
}

