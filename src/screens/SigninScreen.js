import React, { useContext } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context as AuthContext } from '../context/AuthContext';

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);
    return (
        <View style={styles.view}>
            <NavigationEvents onWillBlur={ clearErrorMessage } />
            <AuthForm 
                headerText = "Sign In"
                errorMessage = {state.errorMessage}
                submitButtonText = "Sign In"
                onSubmit = {signin}
            />
            <NavLink 
                routeName="Signup" 
                text="Don't have an account? Sign Up"
            />
        </View>
    );
}
SigninScreen.navigationOptions = () => {
    return {
        header: () => false
    }
}

const styles = StyleSheet.create({
    view: {
        flex:1,
        justifyContent: "center",
        marginBottom: 200
    },
});

export default SigninScreen;