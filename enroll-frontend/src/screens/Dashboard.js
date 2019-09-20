import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button as DefaultButton} from 'react-native';
import {Body, Button, Container, Content, Footer, Icon, Left, ListItem, Right, Text} from 'native-base';
import {setFCMToken, signOut} from '../redux/actions/authentication';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import commonColor from '../theme/variables/commonColor';

class Dashboard extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerRight:
            <DefaultButton onPress={() => navigation.navigate('Profile')} title='Profile'/>
    });

    componentDidMount() {
        this.checkPermission();
    }

    // 3
    async getToken() {
        const {dispatch} = this.props;
        const fcmToken = await firebase.messaging().getToken();

        if (fcmToken) {
            dispatch(setFCMToken(fcmToken));
        }
    }

    // 1
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();

        if (enabled) {
            this.getToken();
        }
        else {
            this.requestPermission();
        }
    }

    // 2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        }
        catch (error) {
            // User has rejected permissions
        }
    }

    render() {
        const {comparisonList, dispatch, navigation} = this.props;
        return (
            <Container>
                <Content>
                    <ListItem icon onPress={() => navigation.navigate('Contacts')}>
                        <Left>
                            <Icon name='people' style={{color: commonColor.brandSuccess}}/>
                        </Left>
                        <Body>
                            <Text>Study Team Directory</Text>
                        </Body>
                        <Right>
                            <Icon name='arrow-forward'/>
                        </Right>
                    </ListItem>
                    <ListItem icon onPress={() => navigation.navigate('Topics')}>
                        <Left>
                            <Icon name='flask' style={{color: commonColor.brandWarning}}/>
                        </Left>
                        <Body>
                            <Text>Open Topics/Studies</Text>
                        </Body>
                        <Right>
                            <Icon name='arrow-forward'/>
                        </Right>
                    </ListItem>
                    {comparisonList.length > 1 && <ListItem icon onPress={() => navigation.navigate('Comparison')}>
                        <Left>
                            <Icon name='swap' style={{color: commonColor.brandDanger}}/>
                        </Left>
                        <Body>
                            <Text>Compare Studies ({comparisonList.length})</Text>
                        </Body>
                        <Right>
                            <Icon name='arrow-forward'/>
                        </Right>
                    </ListItem>}
                    <ListItem icon onPress={() => navigation.navigate('HowToShareStudies')}>
                        <Left>
                            <Icon name='share-alt' style={{color: commonColor.brandDark}}/>
                        </Left>
                        <Body>
                            <Text>How To Share a Study</Text>
                        </Body>
                        <Right>
                            <Icon name='arrow-forward'/>
                        </Right>
                    </ListItem>
                    <ListItem icon onPress={() => navigation.navigate('Disclaimer')}>
                        <Left>
                            <Icon name='warning' style={{color: commonColor.brandDark}}/>
                        </Left>
                        <Body>
                            <Text>Disclaimer</Text>
                        </Body>
                        <Right>
                            <Icon name='arrow-forward'/>
                        </Right>
                    </ListItem>
                    <ListItem icon onPress={() => navigation.navigate('ContactUs')}>
                        <Left>
                            <Icon name='mail' style={{color: commonColor.brandInfo}}/>
                        </Left>
                        <Body>
                            <Text>Contact Us</Text>
                        </Body>
                        <Right>
                            <Icon name='arrow-forward'/>
                        </Right>
                    </ListItem>
                </Content>
                <Footer>
                    <Button block danger iconLeft onPress={() =>
                        dispatch(signOut())} transparent>
                        <Icon name='power'/>
                        <Text>Sign Out</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}

Dashboard.propTypes = {
    comparisonList: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = ({comparison}) => ({
    comparisonList: comparison.list
});

export default connect(mapStateToProps)(Dashboard);