import React, { Component } from "react";
import axios from 'axios';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            attachments: 0,
            files: [],
            disableForm: false
        };
    
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onFileChange(event) {
        this.setState({files:event.target.files});
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    handleRememberMeChange(event) {
        this.setState({rememberMe: event.target.checked});
    }

    handleSubmit(event) {
      event.preventDefault();
      this.setState({
        disableForm: true
        })
        const userId = this.props.getUser().id;
        const config = {
            headers: { 
                Authorization: `Bearer ${this.state.token}`,
            }
          };
        axios.post('http://127.0.0.1/api/post', {
            userId: userId,
            postTitle: this.state.title,
            postDescription: this.state.description,
            numAttachments: this.state.files.length
          }, config)
            .then((response) => {
                const postId = response.data.id;
                this.uploadFiles(postId).then(responses => {
                    console.log('responses', responses);
                    window.location.href = "/posts";

                }).catch(error => console.error(error));
                this.setState({
                    disableForm: false
                    })
            }).catch((error) => {
                this.setState({
                    disableForm: false
                    })
                console.log(error);
            });
    }
    uploadFiles(postId) {
        const config = {
            headers: { 
                Authorization: `Bearer ${this.state.token}`,
                "Content-Type": "multipart/form-data"
            }
          };
        const promises = Array.from(this.state.files).map(file => {
            return axios.post('http://127.0.0.1/api/fileUpload', {
                params: {
                    postId: postId
                }
            },{
                name: file.name,
                file: file
            },config).then((response)=> {
                console.log("file upload response",response);
            }).catch(error => {
                console.error(error);
            })
        })
        return Promise.all(promises);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <h3>Create Post</h3>

            <div className="form-group" style={{textAlign: "left"}}>
                <label>Title</label>
                <input type="text" disabled={this.state.disableForm} value={this.state.title} onChange={this.handleTitleChange} className="form-control" placeholder="Enter title for post" />
            </div>

            <div className="form-group" style={{textAlign: "left"}}>
                <label>Description</label>
                <input type="text" disabled={this.state.disableForm} value={this.state.description} onChange={this.handleDescriptionChange} className="form-control" placeholder="Enter description for post" />
            </div>

            <div className="form-group">
                <label>File</label>
                <input type="file" disabled={this.state.disableForm} onChange={this.onFileChange} multiple/>
            </div>


            <button type="submit" disabled={this.state.disableForm} className="btn btn-primary btn-block">Submit</button>
        </form>
        );
    }
}