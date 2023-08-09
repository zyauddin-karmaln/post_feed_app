import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const CommentItem = ({item, user, onPress = () => {}, index = 0}) => {
  const {
    id,
    createdAt,
    body,
    author: {username, image},
  } = item;
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.topContainer}>
          <Image source={{uri: image}} style={styles.authorImage} />
          <Text style={[styles.author, {marginLeft: 10}]}>{username}</Text>
        </View>
        {user?.username == username ? (
          <Text style={[styles.content, {color: 'red'}]} onPress={onPress}>
            DELETE
          </Text>
        ) : null}
      </View>
      <Text style={styles.content}>{body}</Text>
      <Text style={styles.author}>Created At: {createdAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginVertical: 5,
  },
  author: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
  },
  authorImage: {
    height: 30,
    width: 30,
    borderRadius: 25,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CommentItem;
