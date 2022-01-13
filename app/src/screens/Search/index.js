import React, {useEffect, useState} from 'react';
import {Platform, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import Api from '../../Api';

import {
  Container,
  Scroller,
  SearchArea,
  SearchInput,
  SearchFinder,
  LoadingIcon,
  ListArea,
} from './styles';

import SearchIcon from '../../assets/search.svg';
import BarberItem from '../../components/BarberItem';

export default () => {
  const [locationText, setLocationText] = useState('');
  const [searchTerm, setSearchTerm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleLocationFinder = async () => {
    let result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (result == 'granted') {
      setLoading(true);
      setLocationText('');
      setList([]);

      Geolocation.getCurrentPosition(info => {
        getBarbers();
      });
    }
  };

  const getBarbers = async () => {
    setLoading(true);
    setList([]);

    let lat = null;
    let lng = null;

    let res = await Api.getBarbers(lat, lng, locationText);
    if (res.error == '') {
      if (res.loc) {
        setLocationText(res.loc);
      }
      // Check if searched text is not blank
      if (searchTerm) {
        const newData = res.data.filter(function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = searchTerm.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        console.log('newData', newData);
        console.log('searchTerm', searchTerm);
        setList([]);
        setList(newData);
        setSearchTerm(searchTerm);
      } else {
        setList(res.data);
        setSearchTerm(searchTerm);
      }
    } else {
      alert('Erro: ' + res.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getBarbers();
  }, []);

  const onRefresh = () => {
    getBarbers();
    setRefreshing(false);
  };

  const handleBarberSearch = () => {
    getBarbers();
  };

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <SearchArea>
          <SearchInput
            placeholder="Procure por algum barbeiro..."
            placeholderTextColor="#FFFFFF"
            onChangeText={t => setSearchTerm(t)}
            onEndEditing={handleBarberSearch}
          />
          <SearchFinder onPress={handleBarberSearch}>
            <SearchIcon width="24" height="24" fill="#FFFFFF" />
          </SearchFinder>
        </SearchArea>
        {loading && <LoadingIcon size="large" color="#FFFFFF" />}

        <ListArea>
          {list.map(item => (
            <BarberItem key={`barber-item${item.id}`} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};
