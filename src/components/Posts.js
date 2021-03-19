import React, { Component } from "react";
import Post from './Post';
import axios from 'axios';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            posts: []
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
        return axios.get('http://127.0.0.1/api/posts', {
            params: {
                userId: userId
            }
        }).then((responseData) => {
            this.setState({
                posts: responseData.data
            });
        });
    }

    render() {
        const noPosts = this.state.posts.length === 0;
        return(
            <div>
                <ul>
                    {noPosts && <div>You do not have any posts.</div>}
                    {this.state.posts.map((post, index) => {
                        return <Post key={index} post={post}/>;
                    })}
                </ul>
                {/* <button
                    className="center-text btn btn-lg btn-danger center modal-button"
                    onClick={this.showModal}
                    >
                    Create Post
                </button> */}
            </div>

           

        );
    }
}

