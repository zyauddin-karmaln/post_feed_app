import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

const PostItem = ({item, onPress = () => {}, index = 0}) => {
  const {
    title,
    description,
    author: {username, image},
    tagList,
    favoritesCount,
  } = item;
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={{uri: image}} style={styles.authorImage} />
          <Text style={[styles.author, {marginLeft: 10}]}>{username}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{description}</Text>
        <Text style={styles.author}>Tags: {tagList.toString()}</Text>
        <Text style={styles.author}>Favorites Count: {favoritesCount}</Text>
      </View>
    </Pressable>
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
  },
  author: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
  },
  authorImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PostItem;
