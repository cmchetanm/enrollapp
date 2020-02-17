import React, {PureComponent} from 'react';
import {Button, Content, Form, Input, Item, Label, Left, ListItem, Text, View} from 'native-base';
import {Modal} from 'react-native';
import PropTypes from 'prop-types';
import UTIL_STYLES from '../../styles/common';
import CriteriaFormModal from './CriteriaFormModal';

class StudyForm extends PureComponent {
    constructor(props) {
        super(props);

        this.inputs = {};
        this.studyFormElementNames = {
            inclusionCriteria: 'Inclusion Criteria',
            exclusionCriteria: 'Exclusion Criteria'
        };
    }

    state = {inclusionCriteriaModalVisible: false, exclusionCriteriaModalVisible: false};

    focusNextField = id => {
        this.inputs[id]._root.focus();
    };

    setModalVisible = (boolean, modalShowButtonRef) => {
        switch (modalShowButtonRef) {
        case this.inputs.inclusionCriteriaModalShowButton:
            this.setState({inclusionCriteriaModalVisible: boolean});
            break;
        case this.inputs.exclusionCriteriaModalShowButton:
            this.setState({exclusionCriteriaModalVisible: boolean});
            break;
        case this.inputs.criteriaModalHideButton:
            this.setState({exclusionCriteriaModalVisible: boolean, inclusionCriteriaModalVisible: boolean});
            break;
        default:
            this.setState({inclusionCriteriaModalVisible: false, exclusionCriteriaModalVisible: false});
        }
    };

    countCriteriaElements = criteria => criteria ? criteria.length : 0;

    render() {
        const {study, topic, onChange} = this.props;
        return <Form>
            <ListItem noBorder>
                <Left>
                    <Text note>Topic</Text>
                </Left>

                <Text>{topic.name}</Text>
            </ListItem>
            <ListItem itemDivider>
                <View>
                    <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                        Study Name
                    </Text>
                </View>
            </ListItem>
            <Item>
                <Input
                    autoCorrect={false}
                    autoFocus={typeof study.id === 'undefined'}
                    onChangeText={text => onChange({...study, name: text})}
                    ref={input => {
                        this.inputs.name = input;
                    }}
                    value={study.name}
                />
            </Item>
            <ListItem itemDivider>
                <View>
                    <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                        Inclusion Criteria
                    </Text>
                </View>
            </ListItem>
            <Content padder>
                <Button
                    block
                    bordered
                    info
                    onPress={() => this.setModalVisible(true, this.inputs.inclusionCriteriaModalShowButton)}
                    ref={button => {
                        this.inputs.inclusionCriteriaModalShowButton = button;
                    }}
                >
                    <Modal
                        animationType='slide'
                        transparent={false}
                        visible={this.state.inclusionCriteriaModalVisible}
                    >
                        <CriteriaFormModal
                            criteriaName={this.studyFormElementNames.inclusionCriteria}
                            list={study.inclusionCriteria || []}
                            onChange={list => onChange({...study, inclusionCriteria: list})}
                            refObject={this.inputs}
                            setModalVisible={this.setModalVisible}
                        />
                    </Modal>
                    <Text>
                        {this.countCriteriaElements(study.inclusionCriteria)} Criteria
                    </Text>
                </Button>
            </Content>
            <ListItem itemDivider>
                <View>
                    <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                        Exclusion Criteria
                    </Text>
                </View>
            </ListItem>
            <Content padder>
                <Button
                    block
                    bordered
                    info
                    onPress={() => this.setModalVisible(true, this.inputs.exclusionCriteriaModalShowButton)}
                    ref={button => {
                        this.inputs.exclusionCriteriaModalShowButton = button;
                    }}
                >
                    <Modal
                        animationType='slide'
                        transparent={false}
                        visible={this.state.exclusionCriteriaModalVisible}
                    >
                        <CriteriaFormModal
                            criteriaName={this.studyFormElementNames.exclusionCriteria}
                            list={study.exclusionCriteria || []}
                            onChange={list => onChange({...study, exclusionCriteria: list})}
                            refObject={this.inputs}
                            setModalVisible={this.setModalVisible}
                        />
                    </Modal>
                    <Text>
                        {this.countCriteriaElements(study.exclusionCriteria)} Criteria
                    </Text>
                </Button>
            </Content>
            <ListItem itemDivider>
                <View>
                    <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                        Patient Queries
                    </Text>
                </View>
            </ListItem>
            <Item stackedLabel>
                <Label>Protocol Name/Number</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, protocol: text})}
                    ref={input => {
                        this.inputs.protocol = input;
                    }}
                    value={study.protocol}/>
            </Item>
            <Item stackedLabel>
                <Label>Agent/Intervention</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, agent: text})}
                    ref={input => {
                        this.inputs.agent = input;
                    }}
                    value={study.agent}/>
            </Item>
            <Item stackedLabel>
                <Label>Principal Mechanism of Action</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, mechanism: text})}
                    ref={input => {
                        this.inputs.mechanism = input;
                    }}
                    value={study.mechanism}
                />
            </Item>
            <Item stackedLabel>
                <Label>Route & Frequency of Administration</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, administration: text})}
                    ref={input => {
                        this.inputs.administration = input;
                    }}
                    value={study.administration}
                />
            </Item>
            <Item stackedLabel>
                <Label>Side Effects/Risks of Intervention</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, sideEffects: text})}
                    ref={input => {
                        this.inputs.sideEffects = input;
                    }}
                    value={study.sideEffects}
                />
            </Item>
            <Item stackedLabel>
                <Label>Drug/Placebo Randomization</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, randomization: text})}
                    ref={input => {
                        this.inputs.randomization = input;
                    }}
                    value={study.randomization}
                />
            </Item>
            <Item stackedLabel>
                <Label>Duration of Treatment/Study</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, duration: text})}
                    ref={input => {
                        this.inputs.duration = input;
                    }}
                    value={study.duration}
                />
            </Item>
            <Item stackedLabel>
                <Label>Frequency of Clinic Visits</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, assessmentFrequency: text})}
                    ref={input => {
                        this.inputs.assessmentFrequency = input;
                    }}
                    value={study.assessmentFrequency}
                />
            </Item>
            <Item stackedLabel>
                <Label>Invasive Procedures</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, interventions: text})}
                    ref={input => {
                        this.inputs.interventions = input;
                    }}
                    value={study.interventions}
                />
            </Item>
            <Item stackedLabel>
                <Label>Travel and Parking Costs</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, travelParkingCosts: text})}
                    ref={input => {
                        this.inputs.travelParkingCosts = input;
                    }}
                    value={study.travelParkingCosts}
                />
            </Item>
            <Item stackedLabel>
                <Label>Sponsor</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, sponsorName: text})}
                    ref={input => {
                        this.inputs.sponsorName = input;
                    }}
                    value={study.sponsorName}
                />
            </Item>
            <Item stackedLabel>
                <Label>Sponsor Contact</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, sponsorContact: text})}
                    ref={input => {
                        this.inputs.sponsorContact = input;
                    }}
                    value={study.sponsorContact}
                />
            </Item>
            <Item stackedLabel>
                <Label>CRO Contact</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, croContact: text})}
                    ref={input => {
                        this.inputs.croContact = input;
                    }}
                    value={study.croContact}
                />
            </Item>
            <Item stackedLabel>
                <Label>Site Budget</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, budget: text})}
                    ref={input => {
                        this.inputs.budget = input;
                    }}
                    value={study.budget}
                />
            </Item>
            <Item stackedLabel>
                <Label>Patients Enrolled/Site Commitment</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, enrolledOrCommitted: text})}
                    ref={input => {
                        this.inputs.enrolledOrCommitted = input;
                    }}
                    value={study.enrolledOrCommitted}
                />
            </Item>
            <Item stackedLabel>
                <Label>Comments</Label>
                <Input
                    autoCorrect={false}
                    multiline
                    onChangeText={text => onChange({...study, comments: text})}
                    ref={input => {
                        this.inputs.comments = input;
                    }}
                    value={study.comments}
                />
            </Item>
        </Form>;
    }
}

StudyForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    study: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired
};

export default StudyForm;