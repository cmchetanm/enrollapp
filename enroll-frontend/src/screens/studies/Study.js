import React, {PureComponent} from 'react';
import {Button as DefaultButton, SafeAreaView, TouchableHighlight, View} from 'react-native';
import {Badge, Button, Body, Icon, Left, ListItem, Right, Text} from 'native-base';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import commonColor from '../../theme/variables/commonColor';
import {addToCompareList, removeFromCompareList} from '../../redux/actions/comparison';
import StudyView from '../../components/studies/StudyView';
import UTIL_STYLES from '../../styles/common';
import ContactRole from '../../values/ContactRole';
import {axiosAlert} from '../../utils/axios';
import {fetchMessages} from '../../redux/actions/messages';
import {print} from '../../utils/list';

class Study extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (() => {
            return (
                <View style={{
                    flexDirection: 'row'
                }}>
                    <ItemLogo source={{ uri: `${navigation.state.params.study.studyIcon}` }} />
                    <Text style={{
                        marginTop: 29,
                        fontSize: 22,
                        color: '#FFFFFF'
                    }}>
                        {navigation.state.params.study.name}
                    </Text>
                </View>
            );
        }),
        headerTintColor: '#FFFFFF',
        headerStyle: {
          backgroundColor: '#3F51B5',
          height: 70
        },
        headerRight: (() => navigation.state.params.study.role === ContactRole.PI && (
            <TouchableHighlight
                onPress={() => navigation.navigate('EditStudy', {study: navigation.state.params.study})}
                style={{ marginTop: 12, marginRight: 12 }}
            >
                <Text style={{ color: '#FFFFFF' }}>Edit</Text>
            </TouchableHighlight>
        ))
    });

    static getDerivedStateFromProps(nextProps, prevState) {
        return {...prevState, study: nextProps.study};
    }

    state = {study: this.props.navigation.state.params.study};

    componentDidMount() {
        this.props.dispatch(fetchMessages(this.state.study.id)).then(response => {
            if (response.error) {
                axiosAlert('Unable to fetch messages.', response.error);
            }
        });
    }

    render() {
        const {comparisonList, dispatch, navigation} = this.props;
        return (
            <SafeAreaView style={UTIL_STYLES.FLEX}>
                <StudyView messageList={this.props.messageList} navigation={navigation} study={this.props.study}/>
                {comparisonList.length > 0 ? <ListItem iconLeft noBorder noIndent
                    style={{backgroundColor: '#AAAAFF'}}>
                    <Left>
                        <Button style={ButtonStyle, {alignText: 'center', alignItems: 'center'}} onPress={() => navigation.navigate('Comparison')} small>
                            <Text style={{fontSize: 12}}>Compare studies</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Badge info style={{marginRight: 10}}>
                            <Text>{comparisonList.length}</Text>
                        </Badge>
                    </Right>
                    <Body>
                        {comparisonList.indexOf(this.state.study.id) >= 0
                            ? <Button style={ButtonStyle, { marginLeft: 40, color: '#FF8888' }} block iconLeft onPress={() =>
                                dispatch(removeFromCompareList(this.state.study))} small>
                                <Icon style={{ alignSelf: 'flex-start', justifyContent: 'center' }} name='close-circle-outline'/>
                                <Text style={{fontSize: 12, alignSelf: 'flex-end'}}>Remove</Text>
                            </Button>
                            : <Button style={ButtonStyle, { marginLeft: 40, color: '#88FF88' }} block iconLeft onPress={() =>
                                dispatch(addToCompareList(this.state.study))} small>
                                <Icon style={{ alignSelf: 'flex-start', justifyContent: 'center', marginRight: 7 }} name='add-circle'/>
                                <Text style={{fontSize: 12, alignSelf: 'flex-end' }}>Add</Text>
                            </Button>}
                    </Body>
                </ListItem>
                    : <Button iconLeft onPress={() => dispatch(addToCompareList(this.state.study))}
                        rounded small style={{...UTIL_STYLES.ALIGN_CENTER, marginBottom: 10, marginTop: 10}} success>
                        <Icon name='add-circle'/>
                        <Text>Add study to compare list</Text>
                    </Button>}
            </SafeAreaView>
        );
    }
}

Study.propTypes = {
    comparisonList: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    messageList: PropTypes.array,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                study: PropTypes.object.isRequired
            })
        })
    }).isRequired,
    study: PropTypes.object.isRequired
};

const mapStateToProps = ({comparison, messages, studies}, ownProps) => ({
    comparisonList: comparison.list,
    messageList: messages.list[ownProps.navigation.state.params.study.id],
    study: studies.list.find(study => study.id === ownProps.navigation.state.params.study.id)
});

export default connect(mapStateToProps)(Study);

const ButtonStyle = {
    width: 150
};

const ItemLogo = styled.Image`
    background-color: #FFFFFF;
    width: 50px;
    height: 50px;
    margin: 12px;
    border-radius: 25px
    border-color: #838383;
    border-width: 1px;
`;