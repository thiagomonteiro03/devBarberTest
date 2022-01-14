import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../contexts/UserContext';
import {
  Container,
  ProfileArea,
  LogoutButton,
  ProfileText,
  TextArea,
  ProfileTextMain,
} from './styles';

import LogoutIcon from '../../assets/logout_icon.svg';
import ProfileIcon from '../../assets/account.svg';

import Api from '../../Api';

export default () => {
  const navigation = useNavigation();

  const {state: user} = useContext(UserContext);

  console.log('user', user);

  const handleLogoutClick = async () => {
    await Api.logout();
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <Container>
      <ProfileArea>
        <ProfileIcon width="140" height="140" fill="#4eadbb" />
      </ProfileArea>
      <TextArea>
        <ProfileTextMain>Thiago Monteiro</ProfileTextMain>
        <ProfileText>Mobile Developer</ProfileText>
        <ProfileText>https://www.linkedin.com/in/thiagomonteiro03/</ProfileText>
        <ProfileText>https://github.com/thiagomonteiro03</ProfileText>
      </TextArea>
      <LogoutButton onPress={handleLogoutClick}>
        <LogoutIcon width="24" height="24" fill="#ffffff" />
      </LogoutButton>
    </Container>
  );
};
