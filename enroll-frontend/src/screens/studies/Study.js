import React, {PureComponent} from 'react';
import {Button as DefaultButton, SafeAreaView} from 'react-native';
import {Badge, Button, Body, Icon, Left, ListItem, Right, Text} from 'native-base';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import commonColor from '../../theme/variables/commonColor';
import {addToCompareList, removeFromCompareList} from '../../redux/actions/comparison';
import StudyView from '../../components/studies/StudyView';
import UTIL_STYLES from '../../styles/common';
import ContactRole from '../../values/ContactRole';
import {axiosAlert} from '../../utils/axios';
import {fetchMessages} from '../../redux/actions/messages';

class Study extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.study.name,
        headerRight:
            navigation.state.params.study.role === ContactRole.PI &&
            <DefaultButton onPress={() => navigation.navigate('EditStudy', {study: navigation.state.params.study})}
                title='Edit'/>
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
                <StudyView messageList={this.props.messageList} navigation={navigation} study={this.state.study}/>
                {comparisonList.length > 0 ? <ListItem iconLeft noBorder noIndent
                    style={{backgroundColor: commonColor.brandWarning}}>
                    <Left>
                        <Button onPress={() => navigation.navigate('Comparison')} primary small>
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
                            ? <Button block danger iconLeft onPress={() =>
                                dispatch(removeFromCompareList(this.state.study))} small>
                                <Icon name='close-circle-outline'/>
                                <Text style={{fontSize: 12}}>Remove</Text>
                            </Button>
                            : <Button block iconLeft onPress={() =>
                                dispatch(addToCompareList(this.state.study))} small success>
                                <Icon name='add-circle'/>
                                <Text style={{fontSize: 12}}>Add</Text>
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