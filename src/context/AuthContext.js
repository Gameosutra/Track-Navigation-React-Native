import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signout':
            return { token: '', errorMessage: ''}
        case 'clear_error_message':
            return { ...state, errorMessage: ''}
        case 'signin' :
            return { errorMessage: '', token: action.payload}
        case 'add_error': 
            return { ...state, errorMessage: action.payload }
        default: 
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if(token){
        dispatch({ type: 'signin', payload: token });
        navigate('TrackList');
    } else {
        navigate('loginFlow');
    }
}

const clearErrorMessage = dispatch => () => {
    console.log("enetered");
    dispatch({ type: 'clear_error_message' })
}

const signup = (dispath) => async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispath({type: 'signin', payload: response.data.token });

            //navigate to main flow
            navigate('TrackList');

        } catch (err) {
            dispath({ type: 'add_error', payload: 'Something went wrong with Sign Up'});
        };
    };

const signin = (dispath) => async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signin', {email, password});
            console.log("response",response.data);
            await AsyncStorage.setItem('token', response.data.token);
            dispath({type: 'signin', playload: response.data.token});

            navigate('TrackList');
        } catch (err) {
            console.log("err",err);
            dispath({ type: 'add_error', payload: 'Something went wrong with Sign In'});
        }
    }

const signout = (dispatch) => async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'signout'});
        navigate('Signin');
    }


export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
)