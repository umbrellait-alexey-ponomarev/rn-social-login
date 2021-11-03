// import React, {useState} from 'react';
// import {Button, Text, View, NativeModules, StyleSheet} from 'react-native';
// import {LoginManager} from 'react-native-fbsdk-next';
// import LinkedInModal from 'react-native-linkedin';
// const {RNTwitterSignIn} = NativeModules;

// const Constants = {
//   //Dev Parse keys
//   TWITTER_COMSUMER_KEY: 'qWPj1TXbreMX1SsDvdiQTaF7Y',
//   TWITTER_CONSUMER_SECRET: '4t0cRfGWXZvySIa5sS0M38AnT8a8B8hwcX2lZiaStSWStD4B4Z',
// };

// class TwitterButton extends React.Component {
//   state = {
//     isLoggedIn: false,
//   };

//   _twitterSignIn = () => {
//     RNTwitterSignIn.init(
//       Constants.TWITTER_COMSUMER_KEY,
//       Constants.TWITTER_CONSUMER_SECRET,
//     );
//     RNTwitterSignIn.logIn()
//       .then(loginData => {
//         console.log(loginData);
//         const {authToken, authTokenSecret} = loginData;
//         if (authToken && authTokenSecret) {
//           this.setState({
//             isLoggedIn: true,
//           });
//         }
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   handleLogout = () => {
//     console.log('logout');
//     RNTwitterSignIn.logOut();
//     this.setState({
//       isLoggedIn: false,
//     });
//   };

//   render() {
//     const {isLoggedIn} = this.state;
//     return (
//       <View style={this.props.style}>
//         {isLoggedIn ? (
//           <TouchableOpacity onPress={this.handleLogout}>
//             <Text>Log out</Text>
//           </TouchableOpacity>
//         ) : (
//           <Button
//             name="logo-twitter"
//             style={styles.button}
//             onPress={this._twitterSignIn}
//             title="Login with Twitter"
//           />
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#1b95e0',
//     color: 'white',
//     width: 200,
//     height: 50,
//   },
// });

// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   androidClientId:
//     '973128116635-kc176qeinutdlr0hgbr3h8090tureu2l.apps.googleusercontent.com',
//   iosClientId:
//     '973128116635-rjqoirj53tofeabchco723g4j9kbcocq.apps.googleusercontent.com',
// });

// async function signIn() {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     //If login is successful you'll get user info object in userInfo below I'm just printing it to console. You can store this object in a usestate or use it as you like user is logged in.
//     console.log(userInfo);
//   } catch (error) {
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       alert('You cancelled the sign in.');
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       alert('Google sign In operation is in process');
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       alert('Play Services not available');
//     } else {
//       alert(
//         'Something unknown went wrong with Google sign in. ' + error.message,
//       );
//     }
//   }
// }

// function App() {
//   const [linkedinToken, setLinkedinToken] = useState('');
//   const linkedRef = React.createRef();
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Facebook Login React Native Example</Text>
//       <Button
//         title={'Login with Facebook'}
//         onPress={() => {
//           LoginManager.logInWithPermissions(['public_profile', 'email']).then(
//             function (result) {
//               console.log(result);

//               if (result.isCancelled) {
//                 alert('Login Cancelled ' + JSON.stringify(result));
//               } else {
//                 alert(
//                   'Login success with  permisssions: ' +
//                     result.grantedPermissions.toString(),
//                 );
//                 alert('Login Success ' + result.toString());
//               }
//             },
//             function (error) {
//               alert('Login failed with error: ' + error);
//             },
//           );
//         }}
//       />
//       <Button title={'Sign in with Google'} onPress={signIn} />

//       <LinkedInModal
//         ref={linkedRef}
//         clientID="78vrpg6ydvo6og"
//         clientSecret="qAp2qcfXwZbtYpeI"
//         redirectUri="http://localhost:8080/rnlilogin/auth/linkedin"
//         onSuccess={res => {
//           console.log(res);
//           setLinkedinToken(res.access_token);
//         }}
//       />

//       <Button
//         title="fetch linkenIn"
//         onPress={() => {
//           console.log(linkedinToken);
//           fetch('https://api.linkedin.com/v2/me', {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${linkedinToken}`,
//             },
//           })
//             .then(response => console.log(response))
//             .catch(err => console.log(err));
//         }}
//       />
//       <TwitterButton />
//     </View>
//   );
// }
// export default App;
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                console.log(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
