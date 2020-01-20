import React, {PureComponent} from 'react';
import {ActionSheet, Button, Container, Content, Footer, Left, ListItem, Root, Text} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ContactView from '../../components/contacts/ContactView';
import {deleteShare} from '../../redux/actions/shares';
import Loading from '../../components/network/Loading';
import {axiosAlert} from '../../utils/axios';
import ContactRole, {ContactRoleHuman} from '../../values/ContactRole';
import UTIL_STYLES from '../../styles/common';
import { print } from '../../utils/list';

class Share extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.share.user.fullName,
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          marginLeft: 15,
          marginTop: 15,
        },
        headerStyle: {
          backgroundColor: '#3F51B5',
          height: 70
        }
    });

    state = {loading: false};

    authorizedToRemove = role => role === ContactRole.PI;

    deleteShare = async(share, study) => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        const response = await dispatch(deleteShare(share, study));
        this.setState({loading: false});

        if (response.error) {
            axiosAlert('Unable to remove person.', response.error);
        }
        else {
            navigation.goBack();
        }
    };

    render() {
        const {share, study} = this.props.navigation.state.params;
        return this.state.loading ? <Loading/>
            : <Root>
                <Container>
                    <Content>
                        <ListItem>
                            <Left><Text note style={UTIL_STYLES.ALIGN_LEFT}>Role</Text></Left>
                            <Text>{ContactRoleHuman[share.role] || share.role}</Text>
                        </ListItem>
                        <ContactView contact={share.user}/>
                    </Content>
                </Container>
                {share.role !== ContactRole.PI && this.authorizedToRemove(study.role) && <Footer>
                    <Button block danger onPress={() =>
                        ActionSheet.show({
                            options: ['Cancel', 'Remove from Study'],
                            cancelButtonIndex: 0,
                            destructiveButtonIndex: 1
                        },
                        buttonIndex => {
                            if (buttonIndex === 1) {
                                this.deleteShare(share, study);
                            }
                        })} transparent>
                        <Text>Remove from Study</Text>
                    </Button>
                </Footer>}
            </Root>;
    }
}

Share.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                share: PropTypes.object.isRequired,
                study: PropTypes.object.isRequired
            })
        })
    }).isRequired
};

export default connect()(Share);