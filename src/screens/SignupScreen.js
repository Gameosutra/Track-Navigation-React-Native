import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);
    
    return (
        <View style={styles.view}>
        <NavigationEvents onWillBlur={ clearErrorMessage } />
            <AuthForm 
                headerText = "Sign Up"
                errorMessage = {state.errorMessage}
                submitButtonText = "Sign Up"
                onSubmit = {signup}
            />
            <NavLink 
                routeName="Signin" 
                text="Already have an account? Sign in" 
            />
        </View>
    );
};

SignupScreen.navigationOptions = () => {
    return {
        header: () => false
    };
};

const styles = StyleSheet.create({
    view: {
        flex:1,
        justifyContent: "center",
        marginBottom: 200
    },
});

export default SignupScreen;