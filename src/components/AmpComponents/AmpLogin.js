import {
  Authenticator,
  Flex,
  Grid,
  Image,
  useTheme,
  View,
} from '@aws-amplify/ui-react';

import { Header } from './AmpHead';
import { Footer } from './AmpFoot';
import { SignInHeader } from './AmpSignInHead';
import { SignInFooter } from './AmpSignInFoot';

import svg from '../../Pictures/undraw_online_test_re_kyfx.svg';
import './AmpLogin.css';

const components = {
  Header,
  SignIn: {
    Header: SignInHeader,
    Footer: SignInFooter,
  },
  Footer,
};

export function AmpLogin() {
  const { tokens } = useTheme();

  return (
    <Grid templateColumns={{ base: '1fr 0', medium: '1.2fr 0.8fr' }}>
      <View height="100vh" className="svgPic">
        <Image src={svg} width="50%" height="50%" objectFit="cover" />
      </View>
      <Flex
        // backgroundColor={tokens.colors.background.secondary}
        backgroundColor="#1f1f1f"
        justifyContent="center"
      >
        <Authenticator components={components}>
          {({ signOut, user }) => (
            <main>
              <h1>Hello {user.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          )}
        </Authenticator>
      </Flex>
    </Grid>
  );
}
