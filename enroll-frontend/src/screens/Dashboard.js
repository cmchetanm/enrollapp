import React, {PureComponent} from 'react';
import { findIndex } from 'lodash';
import PropTypes from 'prop-types';
import {Button as DefaultButton, SectionList, Dimensions, TouchableOpacity, Platform } from 'react-native';
import {Body, Button, Container, Content, Footer, Icon, Left, ListItem, Right, Text, View, ScrollView} from 'native-base';
import styled from 'styled-components/native';
import {setFCMToken, signOut} from '../redux/actions/authentication';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import commonColor from '../theme/variables/commonColor';
import { print, sortListAb } from '../utils/list';

class Dashboard extends PureComponent {
    static navigationOptions = {
        title: "Studies",
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          marginLeft: Platform.OS === 'ios' ? -150 : 72,
          marginTop: 15,
        },
        headerStyle: {
          backgroundColor: '#3F51B5',
          height: 70
        },
    };

    renderItem(arg) {
        const {studies, navigation} = this.props;
        return (
            <>
                {arg.item.index !== 0 && <Underline />}
                <TouchableOpacity
                    onPress={() => {
                        const studyIndex = findIndex(studies, s => s.id === arg.item.id);
                        const study = studies[studyIndex];
                        navigation.navigate('Study', {study});
                    }}
                >
                    <ItemContainer>
                        <ItemLogo source={{ uri: `${arg.item.logo}` }} />
                        <ItemRight>
                            <ItemTitle numberOfLines={1}>{arg.item.title}</ItemTitle>
                            <ItemSecondary>{arg.item.secondary}</ItemSecondary>
                            <ItemSecondary>{arg.item.footer}</ItemSecondary>
                        </ItemRight>
                    {/*<Icon type="FontAwesome" name="right" style={{ alignSelf: 'flex-end' }} />*/}
                    </ItemContainer>
                </TouchableOpacity>
                <></>
            </>
        );
    }

    renderHeader(arg) {
        return (
            <HeaderContainer>
                <HeaderText>{arg.section.title}</HeaderText>
            </HeaderContainer>
        );
    }

    studiesToSections = (studies) => {
        const unsortedSections = [];
        studies.forEach(study => {
            let topicIndex = findIndex(unsortedSections, t => t.title === study.topic.name);
            if (topicIndex === -1) {
                topicIndex = unsortedSections.length;
                unsortedSections.push({
                    data: [],
                    index: topicIndex,
                    title: study.topic.name,
                    id: study.topic.id,
                });
            }
            unsortedSections[topicIndex].data.push({
                index: unsortedSections[topicIndex].data.length,
                title: study.name || 'STUDY',
                id: study.id || '11111',
                secondary: study.protocol || 'GENFIT | GFT600-333-1',
                footer: study.agent || 'Kinamonim',
                logo: study.studyIcon || 'https://image.shutterstock.com/image-vector/sign-button-free-icon-260nw-1039733560.jpg',
                icon: study.icon || 'pills'
            });
        });
        const sections = sortListAb(unsortedSections, s => s.title);
        sections.forEach(sec => {
            sec.data = sortListAb(sec.data, s => s.title);
        })
        return sections;
    }

    render() {
        const {studies, topics, comparisonList, dispatch, navigation} = this.props;
        const sections = this.studiesToSections(studies);

        return (
            <Container>
                <Content>
                    <SectionList
                        contentInset={{ bottom: 20 }}
                        maxToRenderPerBatch={15}
                        initialNumToRender={15}
                        sections={sections}
                        renderItem={(arg) => this.renderItem(arg)}
                        renderSectionHeader={this.renderHeader}
                        keyExtractor={({ id }) => `${id}`}
                    />
                </Content>
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

const mapStateToProps = ({comparison, topics, studies}) => {
    return {
        comparisonList: comparison.list,
        topics: topics.list,
        studies: studies.list
    }
};

export default connect(mapStateToProps)(Dashboard);

const FooterContainer = styled.View`
    display: flex;
    flex-direction: row;
`;

const FooterButton = styled.View`
    flex: 1;
`;

const HeaderContainer = styled.View`
    margin: 5px;
    padding: 5px;
    border-bottom-width: 1px;
    border-bottom-color: #DCDBE0;
    background-color: #F0F0F0;
`;

const HeaderText = styled.Text`
    font-size: 14px;
    color: #6E6D72;
    margin-top: 5px;
    margin-bottom: 3px;
    margin-left: 7px
`;

const ItemContainer = styled.View`
    display: flex;
    flex-direction: row;
    max-width: 75%;
`;

const Underline = styled.View`
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 1px;
    width: 100%;
    border-bottom-width: 1px;
    border-bottom-color: #D0CFD4;
`;

const ItemLogo = styled.Image`
    width: 50px;
    height: 50px;
    margin: 12px;
    border-radius: 25px
    border-color: #838383;
    border-width: 1px;
`;

const ItemRight = styled.View`
    display: flex;
    flex-direction: column;
`;

const ItemTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin: 1px;
`;

const ItemSecondary = styled.Text`
    font-size: 14px;
    margin: 1px;
    color: #838383;
`;
