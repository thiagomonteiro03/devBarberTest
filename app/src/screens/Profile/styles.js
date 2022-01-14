import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #63c2d1;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileArea = styled.SafeAreaView`
  width: 100px;
  height: 100px;
  margin: 70px;
  background-color: #ffffff;
  border-radius: 140px;
  align-items: center;
  justify-content: center;
`;

export const ProfileTextMain = styled.Text`
  width: 180px;
  margin: 40px;
  font-size: 24px;
  font-weight: bold;
`;

export const ProfileText = styled.Text`
  font-size: 16px;
`;

export const TextArea = styled.View`
  align-items: center;
  justify-content: center;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin: 50px;
  align-items: center;
  justify-content: center;
  background-color: #4eadbb;
  border-radius: 50px;
`;
