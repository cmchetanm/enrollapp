import React from 'react';
import {Container, Content, Icon, Left, List, ListItem, Right, Text} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Callout from '../../components/Callout';

const Topics = ({navigation, topics}) =>
    <Container>
        <Content>
            {topics.length > 0
                ? <List>{topics.map(topic =>
                    <ListItem key={topic.name} onPress={() =>
                        navigation.navigate('Studies', {topic})}>
                        <Left>
                            <Text>{topic.name}</Text>
                        </Left>
                        <Right>
                            <Icon name='arrow-forward'/>
                        </Right>
                    </ListItem>)}
                </List>
                : <Content padder>
                    <Callout>You have not created any topics, or no one has shared any studies with
                        you.</Callout>
                </Content>}
        </Content>
    </Container>;

Topics.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    topics: PropTypes.array.isRequired
};

const mapStateToProps = ({topics}) => ({
    topics: topics.list
});

export default connect(mapStateToProps)(Topics);