import React, { Component } from "react";

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.post.id,
            userId: this.props.post.user_id,
            postTitle: this.props.post.post_title,
            postDescription: this.props.post.post_description,
            createdAt: this.props.post.created_at,
            updatedAt: this.props.post.updated_at,
            numAttachments: this.props.post.attachments,
            files: this.props.post.files
        };
    }

    render() {
        return(
            <div>
                <h3 style={{textAlign: "left"}}>Title: {this.state.postTitle}</h3>
                <p style={{textAlign: "left"}}>Description: {this.state.postDescription}</p>
                <p style={{textAlign: "left"}}>Attachments: {this.state.files.length}</p>
                {this.state.files.map((file)=>{
                    console.log('file: ', file);
                    return <img src={`'http://127.0.0.1/${file.url}`} alt="image"  />
                })}
                <hr />
            </div>
        )
    }
}