import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, ScrollView} from 'react-native';
import {Body, Button, Content, Icon, Item, Input, Left, ListItem, Right, Text} from 'native-base';
import {connect} from 'react-redux';
import UTIL_STYLES from '../../styles/common';
import commonColor from '../../theme/variables/commonColor';

class CriteriaFormModal extends PureComponent {
    constructor(props) {
        super(props);

        this.criteriaFormModalInputs = {};
        this.state = {criteria: this.props.list, text: ''};
    }

    static getDerivedStateFromProps(props, state) {
        return {...state, criteria: props.list};
    }

    updateText = text => {
        this.setState(() => ({
            text: text
        }));
    };

    addItem = () => {
        this.setState({text: ''});
        this.props.onChange([...this.state.criteria, this.state.text]);
    };

    editItem = (index, text) => {
        this.setState(prevState => ({
            criteria: prevState.criteria.fill(text, index, index + 1)
        }));
        this.props.onChange(this.state.criteria);
    };

    deleteItem = index => {
        this.setState(prevState => ({
            criteria: prevState.criteria.splice(index, 1)
        }));
        this.props.onChange(this.state.criteria);
    };

    focusField = () => {
        this.criteriaFormModalInputs.criteriaInput._root.focus();
    };

    reOrderUp = index => {
        if (index === 0) {
            return;
        }

        const newCriteria = this.state.criteria;
        const holder1 = newCriteria[index];
        const holder2 = newCriteria[index - 1];

        newCriteria[index - 1] = holder1;
        newCriteria[index] = holder2;

        this.props.onChange(this.state.criteria);
    };

    reOrderDown = index => {
        if (this.state.criteria.length - 1 === index) {
            return;
        }

        const newCriteria = this.state.criteria;
        const holder1 = newCriteria[index];
        const holder2 = newCriteria[index + 1];

        newCriteria[index + 1] = holder1;
        newCriteria[index] = holder2;

        this.props.onChange(this.state.criteria);
    };

    onPressAddButton = () => {
        this.addItem();
        this.focusField();
    };

    renderCriterion = (criterion, index) =>
        <ListItem key={`${index}-${this.state.criteria.length}`}>
            <Left
                style={{
                    flex: 0.3
                }}>
                <Button disabled={index === 0}
                    onPress={() => this.reOrderUp(index)}
                    small
                    transparent
                >
                    <Icon active name='arrow-up'
                        style={{
                            marginRight: 10,
                            marginLeft: 0
                        }}
                    />
                </Button>
                <Button
                    disabled={index === this.state.criteria.length - 1}
                    onPress={() => this.reOrderDown(index)}
                    small
                    transparent
                >
                    <Icon active name='arrow-down'
                        style={{
                            marginRight: 0,
                            marginLeft: 0
                        }}
                    />
                </Button>
            </Left>
            <Body>
                <Input
                    autoCorrect={false}
                    /*
                     * Do not remove the style 'padding vertical: 0'. Otherwise the input text will not show in an
                     * android device.
                     */
                    multiline
                    onChangeText={text => {
                        this.editItem(index, text);
                    }}
                    style={{paddingVertical: 0}}
                    value={criterion}
                />
            </Body>
            <Right>
                <Icon
                    name='trash'
                    onPress={() =>
                        this.deleteItem(index)
                    }
                    style={{color: commonColor.brandDanger}}
                />
            </Right>
        </ListItem>;

    render() {
        const {criteriaName, refObject, setModalVisible} = this.props;
        return (
            <SafeAreaView style={UTIL_STYLES.FULL_HEIGHT}>
                <Content contentContainerStyle={UTIL_STYLES.FULL_HEIGHT} padder>
                    <Text style={UTIL_STYLES.TEXT_CENTER}>{criteriaName}</Text>
                    <ListItem>
                        <Left>
                            <Item noBorder>
                                <Input
                                    autoCorrect={false}
                                    blurOnSubmit={false}
                                    multiline
                                    onChangeText={text => this.updateText(text)}
                                    ref={input => {
                                        this.criteriaFormModalInputs.criteriaInput = input;
                                    }}
                                    style={UTIL_STYLES.CRITERIA_FORM_MODAL_INPUT_STYLES}
                                    value={this.state.text}
                                />
                            </Item>
                        </Left>
                        <Right>
                            {this.state.text === '' &&
                                <Button
                                    disabled
                                    onPress={this.onPressAddButton}
                                    transparent
                                >
                                    <Text>Add</Text>
                                </Button>
                            }
                            {this.state.text !== '' &&
                            <Button
                                onPress={this.onPressAddButton}
                                primary
                                transparent
                            >
                                <Text>Add</Text>
                            </Button>
                            }
                        </Right>
                    </ListItem>
                    <ScrollView>
                        {this.state.criteria.map(this.renderCriterion)}
                    </ScrollView>
                    <Button
                        block
                        bordered
                        info
                        onPress={() => setModalVisible(false, refObject.criteriaModalHideButton)}
                        ref={input => {
                            refObject.criteriaModalHideButton = input;
                        }}
                        rounded
                        style={UTIL_STYLES.CRITERIA_FORM_MODAL_BUTTON_CENTERED}
                    >
                        <Text>Done</Text>
                    </Button>
                </Content>
            </SafeAreaView>
        );
    }
}

CriteriaFormModal.propTypes = {
    criteriaName: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    refObject: PropTypes.object.isRequired,
    setModalVisible: PropTypes.func.isRequired
};

export default connect()(CriteriaFormModal);