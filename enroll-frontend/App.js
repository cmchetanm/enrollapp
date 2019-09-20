import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import {Platform} from 'react-native';
import redux from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {StyleProvider} from 'native-base';
import getTheme from './src/theme/components';
import commonColor from './src/theme/variables/commonColor';
import AppWrapper from './src/AppWrapper';
import SplashScreen from 'react-native-splash-screen';

class App extends PureComponent {
    componentDidMount() {
        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }
    }

    render() {
        return (
            <Provider store={redux.store}>
                <PersistGate loading={null} persistor={redux.persistor}>
                    <StyleProvider style={getTheme(commonColor)}>
                        <AppWrapper/>
                    </StyleProvider>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;