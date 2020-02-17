import React, {PureComponent} from 'react';
import {Container, Content, Icon, Left, List, ListItem, Right, Text} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Callout from '../../components/Callout';

class Studies extends PureComponent {
    static navigationOptions = () => ({
        headerTitle: 'Studies'
    });

    render() {
        const {navigation, studies} = this.props;
        return (
            <Container>
                <Content>
                    {studies.length > 0
                        ? <List>{studies.map(study =>
                            <ListItem key={study.id} onPress={() =>
                                navigation.navigate('Study', {study})}>
                                <Left>
                                    <Text>{study.name}</Text>
                                </Left>
                                <Right>
                                    <Icon name='arrow-forward'/>
                                </Right>
                            </ListItem>)}</List>
                        : <Content padder>
                            <Callout>There are no studies under this topic.</Callout>
                        </Content>}
                </Content>
            </Container>
        );
    }
}

Studies.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                topic: PropTypes.object.isRequired
            })
        })
    }).isRequired,
    studies: PropTypes.array
};

const mapStateToProps = ({studies}, ownProps) => ({
    studies: studies.list.filter(study => ownProps.navigation.state.params.topic.ids.includes(study.topic.id))
});

export default connect(mapStateToProps)(Studies);