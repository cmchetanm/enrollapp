import React, {PureComponent} from 'react';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Fab,
    Icon,
    Input,
    Item,
    Left,
    List,
    ListItem,
    Right,
    Tab,
    Tabs,
    Text,
    View
} from 'native-base';
import PropTypes from 'prop-types';
import UTIL_STYLES from '../../styles/common';
import ContactRole, {ContactRoleHumanPlural} from '../../values/ContactRole';
import memoize from 'memoize-one';
import commonColor from '../../theme/variables/commonColor';
import {TouchableOpacity} from 'react-native';
import {createMessage} from '../../redux/actions/messages';
import {axiosAlert} from '../../utils/axios';
import {connect} from 'react-redux';
import {print, sortListAb} from '../../utils/list';

class StudyView extends PureComponent {
    constructor(props) {
        super(props);
        const id = props.profile.id;
        const thisShares = props.study.shares;
        const myShare = thisShares.find(c => c.user.id === id);
        this.mySite = myShare && myShare.site && myShare.site.id;
        this.messageField = null;
    }

    state = {showMoreIncl: false, showMoreExcl: false, shareEnabled: false, text: ''};

    filterShares = memoize((shares, role) => {
        return shares.filter(share => {
            const returnValue =
                (share.role === role
                || role === ContactRole.OTHER
                && !Object.keys(ContactRole).includes(share.role))
                && share.site && share.site.id === this.mySite;
            return returnValue;
        });
    });

    addItem = () => {
        this.setState(prevState => ({
            criteria: prevState.criteria.unshift({text: prevState.text}),
            text: ''
        }));
    };

    authorizedToViewTeam = role => {
        const myRole = this.props.study.role;
        return true;


        if (myRole === ContactRole.PI) {
            return true;
        }
        else if (myRole === ContactRole.NURSE) {
            if (role === ContactRole.PI) {
                return true;
            }
        }
        else if (myRole === ContactRole.SUB) {
            return true;
        }
        else if (myRole === ContactRole.COLLEAGUE) {
            if (role !== ContactRole.SUB && role !== ContactRole.COLLEAGUE) {
                return true;
            }
        }
        else if (role === ContactRole.PI) {
            return true;
        }

        return false;
    };

    authorizedToShare = () => {
        const {study} = this.props;
        const myRole = study.role;

        if (this.state.shareEnabled &&
            (myRole === ContactRole.PI || myRole === ContactRole.SUB)) {
            return true;
        }

        return false;
    };

    submitMessage = () => {
        const {dispatch, study} = this.props;
        dispatch(createMessage(study.id, this.state.text)).then(response => {
            if (response.error) {
                axiosAlert('Unable to save message.', response.error);
            }
            else {
                this.messageField._root.blur();
                this.setState({text: ''});
            }
        });
    };

    renderCriteria = study =>
        <Tab activeTextStyle={{fontSize: 12}}
            heading='Incl/Excl'
            textStyle={{fontSize: 12}}
        >
            <List>
                <ListItem itemDivider>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Inclusion Criteria
                        </Text>
                    </View>
                </ListItem>
                {study.inclusionCriteria && study.inclusionCriteria.length === 0 && <ListItem>
                    <Text>None</Text>
                </ListItem>}
                {study.inclusionCriteria &&
                study.inclusionCriteria.slice(0, this.state.showMoreIncl ? study.inclusionCriteria.length : 5)
                    .map((criterion, index) =>
                        // eslint-disable-next-line react/no-array-index-key
                        <ListItem key={`${criterion}${index}inclusion_criteria_short_list`}>
                            <Text>{criterion}</Text>
                        </ListItem>)}
                {!this.state.showMoreIncl && study.inclusionCriteria &&
                study.inclusionCriteria.length > 5 && <Button
                    block onPress={() => this.setState({showMoreIncl: true})} primary transparent>
                    <Text>Show More</Text>
                </Button>}
                <ListItem itemDivider>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Exclusion Criteria
                        </Text>
                    </View>
                </ListItem>
                {study.exclusionCriteria && study.exclusionCriteria.length === 0 && <ListItem>
                    <Text>None</Text>
                </ListItem>}

                {study.exclusionCriteria && study.exclusionCriteria.slice(0, this.state.showMoreExcl
                    ? study.exclusionCriteria.length : 5)
                    .map((criterion, index) =>
                        // eslint-disable-next-line react/no-array-index-key
                        <ListItem key={`${criterion}${index}exclusion_criteria_short_list`}>
                            <Text>{criterion}</Text>
                        </ListItem>)}
                {!this.state.showMoreExcl && study.exclusionCriteria &&
                study.exclusionCriteria.length > 5 && <Button
                    block onPress={() => this.setState({showMoreExcl: true})} primary transparent>
                    <Text>Show More</Text>
                </Button>}
            </List>
        </Tab>;

    renderDetails = study =>
        <Tab activeTextStyle={{fontSize: 12}} heading='Study Details' textStyle={{fontSize: 12}}>
            <List>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Agent/Intervention
                        </Text>
                        <Text style={UTIL_STYLES.ALIGN_LEFT}>{study.agent}</Text>
                    </View>
                </ListItem>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Principal Mechanism of Action
                        </Text>
                        <Text style={UTIL_STYLES.ALIGN_LEFT}>{study.mechanism}</Text>
                    </View>
                </ListItem>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Route & Frequency of Administration
                        </Text>
                        <Text style={UTIL_STYLES.ALIGN_LEFT}>{study.administration}</Text>
                    </View>
                </ListItem>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Side Effects/Risks of Intervention
                        </Text>
                        <Text style={UTIL_STYLES.ALIGN_LEFT}>{study.sideEffects}</Text>
                    </View>
                </ListItem>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Drug/Placebo Randomization
                        </Text>
                        <Text style={UTIL_STYLES.ALIGN_LEFT}>{study.randomization}</Text>
                    </View>
                </ListItem>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Duration of Treatment/Study
                        </Text>
                        <Text style={UTIL_STYLES.ALIGN_LEFT}>{study.duration}</Text>
                    </View>
                </ListItem>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Frequency of Clinic Visits
                        </Text>
                        <Text style={UTIL_STYLES.ALIGN_LEFT}>
                            {study.assessmentFrequency}
                        </Text>
                    </View>
                </ListItem>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Invasive Procedures
                        </Text>
                        <Text style={UTIL_STYLES.ALIGN_LEFT}>{study.interventions}</Text>
                    </View>
                </ListItem>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Travel and Parking Costs
                        </Text>
                        <Text style={UTIL_STYLES.ALIGN_LEFT}>{study.travelParkingCosts}</Text>
                    </View>
                </ListItem>
                <ListItem noBorder>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Comments
                        </Text>
                        <Text style={UTIL_STYLES.ALIGN_LEFT}>{study.comments}</Text>
                    </View>
                </ListItem>
            </List>
        </Tab>;

    renderStudyTeam = (study, navigation) =>
        <Tab activeTextStyle={{fontSize: 11}} heading='Contact & Share' textStyle={{fontSize: 12}}>
            {this.authorizedToShare() && <ListItem style={{ alignSelf: 'center', margin: -10 }}>
                <Button
                block onPress={() => navigation.navigate('ManageContacts', {study})} primary transparent>
                    <Icon name='add' />
                    <Text style={{ marginLeft: -20 }}>Share this study with a colleague to this study</Text>
                </Button>
            </ListItem>
            }
            {Object.keys(ContactRole).map(role =>
                this.authorizedToViewTeam(role) && <List key={role}>
                    <ListItem itemDivider key={`${role}-title`}>
                        <Text>{ContactRoleHumanPlural[role]}</Text>
                    </ListItem>
                    {this.filterShares(study.shares, role).length > 0 ? <List key={`${role}-contact`}>
                        {sortListAb(this.filterShares(study.shares, role), s => s.user.fullName).map(share =>
                            <ListItem icon key={share.id} onPress={() =>
                                navigation.navigate('Person', {share, study})}>
                                <Left>
                                    <Icon name='contact' style={{color: commonColor.brandInfo}}/>
                                </Left>
                                <Body>
                                    <Text>{share.user.fullName}</Text>
                                </Body>
                                <Right>
                                    <Icon name='arrow-forward'/>
                                </Right>
                            </ListItem>)}
                    </List>
                        : <ListItem>
                            <Text note>There is no one in this category.</Text>
                        </ListItem>
                    }
                </List>)}
        </Tab>;

    renderMessageBoard = () =>
        <Tab activeTextStyle={{fontSize: 12}} heading='Bulletin Board' textStyle={{fontSize: 12}}>
            <Item noBorder>
                <Input
                    maxLength={1024}
                    multiline
                    onChangeText={text => this.setState({text})}
                    placeholder='Type message to study staff here...'
                    ref={input => {
                        this.messageField = input;
                    }}
                    style={UTIL_STYLES.MESSAGE_INPUT}
                    value={this.state.text}
                />
            </Item>
            {this.state.text.length > 0 && <Button full onPress={this.submitMessage}>
                <Text>Post Message</Text>
            </Button>}
            {this.props.messageList && this.props.messageList.map(message =>
                <TouchableOpacity key={message.id} onPress={() => {
                    this.props.navigation.navigate('Message', {message});
                }}>
                    <Card style={UTIL_STYLES.MESSAGE_CONTAINER}>
                        <CardItem>
                            <Body>
                                <View style={UTIL_STYLES.MESSAGE_HEADER}>
                                    <View style={{width: '50%'}}>
                                        <Text>{message.fullName}</Text>
                                    </View>
                                    <View style={{width: '50%'}}>
                                        <Text note style={{textAlign: 'right'}}>{message.createdAt}</Text>
                                    </View>
                                </View>
                                <Text note>{message.text}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </TouchableOpacity>)}
        </Tab>;

    renderAdminIssues = study =>
        <Tab activeTextStyle={{fontSize: 12}}
            heading='Admin Issues'
            textStyle={{fontSize: 12}}
        >
            <List>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Sponsor
                        </Text>
                        <Text>{study.sponsorName}</Text>
                    </View>
                </ListItem>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Protocol Name/Number
                        </Text>
                        <Text>{study.protocol}</Text>
                    </View>
                </ListItem>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            CRO Contact
                        </Text>
                        <Text>{study.croContact}</Text>
                    </View>
                </ListItem>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Site Budget
                        </Text>
                        <Text>{study.budget}</Text>
                    </View>
                </ListItem>
                <ListItem>
                    <View>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Patients Enrolled/Site Commitment
                        </Text>
                        <Text>{study.enrolledOrCommitted}</Text>
                    </View>
                </ListItem>
            </List>
        </Tab>;

    render() {
        const {navigation, study} = this.props;
        return (
            <Container>
                <Content>
                    <Tabs onChangeTab={tab => this.setState({shareEnabled: tab.i === 2})}>
                        {this.renderCriteria(study)}
                        {this.renderDetails(study)}
                        {this.renderStudyTeam(study, navigation)}
                        {this.renderMessageBoard(study)}
                        {study.role === ContactRole.PI && this.renderAdminIssues(study)}
                    </Tabs>
                </Content>
                {/* {this.authorizedToShare() && <Fab
                    onPress={() => navigation.navigate('ManageContacts', {study})}
                    position='bottomRight' style={{backgroundColor: commonColor.brandSuccess}}>
                    <Text style={UTIL_STYLES.FAB_TEXT}>Invite Colleague</Text>
                </Fab>} */}
            </Container>
        );
    }
}

StudyView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    messageList: PropTypes.array,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    study: PropTypes.object.isRequired
};

const mapStateToProps = ({authentication: {profile}, contacts}) => ({profile, contacts});

export default connect(mapStateToProps)(StudyView);