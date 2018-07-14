
import React, { Component } from 'react';
import { Container, ListItem, Body, Text, Header, Content, List, Thumbnail, Spinner } from 'native-base';
import { View } from 'react-native';


export default class Home extends Component{

    constructor(){
        super();
        this.state = {
          posts: [],
          isLoading: true
        }
      }
    
      componentDidMount(){
        return fetch('https://jsonplaceholder.typicode.com/photos')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
                isLoading: false,
                posts: responseJson,
            });
          })
          .catch((error) =>{
            this.setState({
                isLoading: false,
                posts: []
            });
            console.error(error);
          }).done();
      }

    render(){
        let postList;
        if(this.state.posts){
            postList = this.state.posts.map(post=>{
                return (
                    <ListItem key={post.id}>
                        <Thumbnail
                            square
                            size={80}
                            source ={{uri: post.thumbnailUrl}}
                            />
                        <Body>
                            <Text>{post.title}</Text>
                        </Body>
                    </ListItem>
                );
            });
        }

        return (
            <Container>
                <Header>
                    <Body>
                        <Text>Post List</Text>
                    </Body>
                </Header>
                <Content>
                    {
                    this.state.isLoading ?
                    <View>
                        <Spinner color='red'/>
                    </View>
                    :
                    <List>
                        {postList}
                    </List>
                    }
                </Content>
            </Container>
        );
    }
}