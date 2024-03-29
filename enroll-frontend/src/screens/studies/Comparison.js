import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import UTIL_STYLES from '../../styles/common';
import StudyView from '../../components/studies/StudyView';
import {Button as DefaultButton, TouchableOpacity} from 'react-native';
import {resetCompareList} from '../../redux/actions/comparison';
import {Container, Content, Footer, FooterTab, Button, Text} from 'native-base';

class Comparison extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (navigation.getParam('study') || {}).name,
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          marginLeft: 15,
          marginTop: 15,
        },
        headerStyle: {
          backgroundColor: '#3F51B5',
          height: 70
        },
        headerRight: (() => (
            <TouchableOpacity
                onPress={navigation.getParam('stopComparison')}
                style={{ marginTop: 12, marginRight: 12 }}
            >
                <Text style={{ fontSize: 17, color: '#FFFFFF' }}>End Comparison</Text>
            </TouchableOpacity>
        ))
    });

    state = {activeStudy: this.props.list.length > 0 ? this.props.list[0] : null};

    componentDidMount() {
        this.props.navigation.setParams({stopComparison: this.stopComparison});

        if (this.props.list.length > 0) {
            this.props.navigation.setParams({study: this.props.list[0]});
        }
    }

    changeActiveStudy = study => {
        this.setState({activeStudy: study});
        this.props.navigation.setParams({study});
    };

    stopComparison = () => {
        this.props.navigation.goBack();
        this.props.dispatch(resetCompareList());
    };

    render() {
        const {list, navigation} = this.props;
        const {activeStudy} = this.state;
        return (
            <Container>
                <Content>
                    {activeStudy && <StudyView navigation={navigation} study={activeStudy}/>}
                </Content>
                <Footer>
                    <FooterTab>
                        {list.map(study =>
                            <Button active={study.id === activeStudy.id} key={study.id}
                                onPress={() => this.changeActiveStudy(study)}>
                                <Text style={UTIL_STYLES.TEXT_CENTER, {fontSize: 16}}>{study.name}</Text>
                            </Button>)}
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

Comparison.propTypes = {
    dispatch: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        setParams: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = ({comparison, studies}) => ({
    list: studies.list.filter(study => comparison.list.indexOf(study.id) >= 0)
});

export default connect(mapStateToProps)(Comparison);