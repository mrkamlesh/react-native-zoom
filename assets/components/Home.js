import React, { Component } from 'react'
import { Text, Alert, StyleSheet, View, Dimensions, Animated, Image, Button, ActivityIndicator, TouchableHighlight, Modal } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

const { width } = Dimensions.get('window')

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            iconAnimating: false,
            imageURL: '',
            modalVisible: false,
        }
    }

    scale = new Animated.Value(1)

    onZoomEvent = Animated.event(
        [
            {
                nativeEvent: { scale: this.scale }
            }
        ],
        {
            useNativeDriver: true
        }
    )

    onZoomStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(this.scale, {
                toValue: 1,
                useNativeDriver: true
            }).start()
        }
    }

    fetchImage() {
        this.setState({ modalVisible: true });

        fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status == "success") {
                    this.setState({
                        imageURL: responseJson.message,
                        modalVisible: false
                    })
                } else {
                    console.log("Something went wrong!");
                }
            })
            .catch(error => {
                console.log("Error loading data", error);
            });
    }

    componentDidMount() {
        this.fetchImage();
    }

    render() {
        return (
            <View style={styles.container}>
                <PinchGestureHandler
                    onGestureEvent={this.onZoomEvent}
                    onHandlerStateChange={this.onZoomStateChange}>
                    <Animated.Image
                        source={this.state.imageURL ? { uri: this.state.imageURL } : null}
                        style={{
                            width: width - 10,
                            height: 300,
                            transform: [{ scale: this.scale }]
                        }}
                        resizeMode='contain'
                    />
                </PinchGestureHandler>
                {/* <Image source={this.state.imageURL ? { uri: this.state.imageURL } : null} style={styles.imageBox} resizeMode='contain' /> */}

                <View style={styles.butnContainer}>
                    <Button
                        onPress={() => this.fetchImage()}
                        title="Next Image"
                    />
                </View>

                <Modal transparent={true} animationType="none"
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: `rgba(0,0,0,0.6)`
                        }}
                    >
                        <View
                            style={{
                                padding: 13,
                                backgroundColor: "white",
                                borderRadius: 13
                            }}
                        >
                            <ActivityIndicator animating={true} color='black' size="large" />
                            <Text style={{ color: "black" }}>Loading...</Text>
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        paddingTop: 50,
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    imageBox: {
        height: 350,
    },
    butnContainer: {
        position: "absolute",
        width: width - 60,
        bottom: 20
    }
})
