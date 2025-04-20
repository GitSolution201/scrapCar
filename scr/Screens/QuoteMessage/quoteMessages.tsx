import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getQuoteRequest, resetQuote} from '../../redux/slices/qouteDataSlice';
import {resetQuoteState} from '../../redux/slices/qouteSlice';

const QuoteMessages = () => {
  const dispatch = useDispatch();
  const qoutes = useSelector((state: any) => state?.quoteData?.quotes); // Match slice name
  console.log('@quotes', qoutes);
  const {token} = useSelector((state: any) => state.auth);
  const {userData} = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(getQuoteRequest({userId: userData?.userId, token}));

    return () => dispatch(resetQuoteState());
  }, []);

  //   if (loading) return <Text>Loading quotes...</Text>;
  //   if (error) return <Text>Error: {error}</Text>;

  return (
    <Text>hjk</Text>
    //   <FlatList
    //     data={quotes}
    //     // renderItem={({ item }) => <QuoteItem quote={item} />}
    //   />
  );
};
export default QuoteMessages;

const styles = StyleSheet.create({});
