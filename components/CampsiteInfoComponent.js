import React, { Component } from 'react';
import { Text, View ,Modal,Button,StyleSheet} from 'react-native';
import { Card ,Icon,Rating,Input} from 'react-native-elements';
import { ScrollView, FlatList } from 'react-native';
import { postComment, postFavorite } from '../redux/ActionCreators';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { comment } from '../redux/comments';



const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites,
        comment:state.comment
       
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment:comment=>(postComment(campsiteId,rating,Auther,text))
};

function RenderCampsite(props)
{
    const {campsite} = props;

    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}}>
            
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
            <View>
                <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ? 
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
                <Icon
                    name="pencil"
                    type='font-awesome'
                    color='#5637DD' 
                    raised
                    reverse
                    onPress={() => props.onShowModal()}
                    />
            </View>
            </Card>
        );
    }
    return <View />;
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}


class CampsiteInfo extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            rating : 5,
             author:'',
              text :'',
            showModal: false
        }
}

    static navigationOptions = {
        title: 'Campsite Information'
    }
    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
    }
    //toggle model
     toggleModal() {
        this.setState({showModal: !this.state.showModal});
     }
    handleComment(campsiteId)
    {
       this.postComment(campsiteId)
        this.toggleModal();   
    }
    resetForm() {
        this.setState({
            rating : 5,
             author:'',
              text :'',
            showModal: false
        });
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites .campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
            <ScrollView>
                  <RenderCampsite campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={() => this.toggleModal()}
                />
             
                 <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                <View style={styles.modal}>
                        <Rating
                          
                            ratingCount={5}
                          readonly
                            startingValue={this.state.rating}
                            
                            imageSize={40}
                            howRating
                            onFinishRating={rating => this.setState({rating: rating})} 
                        style={{paddingVertical:10}}
                        
                    />
                        
                          <Input
                         placeholder='Auther'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={Auther=>{this.setState({Auther:Auther})}}
                      />
                        <Input
                           
                         placeholder='Comment'
                         leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                         leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={text => { this.setState({ text: text })}}

                    />
                    <Button
                            onPress={() =>
                            {
                                this.handleComment();
                                this.resetForm();
                            }}
                            color='#5637DD'
                          
                            title='Submit'
                        />
                        
                    </View>
   
                 <View>  
                        <Button
                            onPress={() =>
                            {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color='#808080'
                            backgroundColor='green'
                            title='Cansel'
                        />
                    </View>
                </Modal>
                <RenderComments comments={comments} />
            </ScrollView>
        );

    }

}
const styles = StyleSheet.create({
    
    CardRow:{

        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin:20

    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }

});


export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);

