import React, {useState} from 'react';
import { StyleSheet } from 'react-native'
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';
const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [email,setEmail] = useState('');
    const [password,setPassowrd] = useState('');
    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            <Spacer />
            <Input 
                autoCapitalize = "none"
                autoCorrect = {false}
                label="Email" 
                value={email} 
                onChangeText = {setEmail} 
                />
            <Spacer />
            <Input 
                autoCapitalize = "none"
                autoCorrect = {false}
                label="Password" 
                value={password} 
                onChangeText = {setPassowrd}
                secureTextEntry
                />
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <Spacer>
                <Button title={submitButtonText} 
                onPress = {() => {
                    onSubmit({ email, password })
                }} />
            </Spacer>
        </>
    );
};

const styles=StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 16,
        marginLeft: 15,
        marginTop: 15
    },
});

export default AuthForm;