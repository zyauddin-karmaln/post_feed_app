import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  Button,
  Alert,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import screens, {windowHeight, windowWidth} from '../Utility';
import PostItem from '../Utility/PostItem';
import CustomLoader from '../Utility/CustomLoader';
import {
  deleteFeedPostCommentAction,
  getFeedPostAction,
  getFeedPostCommentsAction,
  postComment,
  updatePostDetails,
} from '../Redux/Actions/appAction';
import CommentItem from '../Utility/CommentItem';

const PostDetails = props => {
  const {isLoading, screen} = useSelector(state => state?.loaderReducer);
  const {selectedPost, comments, user} = useSelector(
    state => state?.appReducer,
  );
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    dispatch(
      getFeedPostAction(props?.route?.params?.slug, () =>
        dispatch(getFeedPostCommentsAction(props?.route?.params?.slug)),
      ),
    );
    return () => {
      dispatch(updatePostDetails(null));
    };
  }, []);

  const handlePostComment = () => {
    if (commentText.trim() === '') {
      return;
    } else {
      const params = {comment: {body: commentText}};
      dispatch(
        postComment(props?.route?.params?.slug, params, () => {
          ref?.current?.scrollToOffset({animated: true, offset: 0});
          setCommentText('');
          Keyboard.dismiss();
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.viewContainer}
        ref={ref}
        contentContainerStyle={{backgroundColor: '#F2F2F2', paddingBottom: 50}}
        data={comments}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => (
          <CommentItem
            item={item}
            index={index}
            user={user}
            onPress={() =>
              dispatch(
                deleteFeedPostCommentAction(
                  props?.route?.params?.slug,
                  item?.id,
                ),
              )
            }
          />
        )}
        ListEmptyComponent={() =>
          screen === screens.post && isLoading ? null : (
            <View style={styles.centerContainer}>
              <Text>No Comment Found</Text>
            </View>
          )
        }
        ListHeaderComponent={() =>
          selectedPost ? <PostItem item={selectedPost} /> : null
        }
        // ListFooterComponent={() => (
        //   <View style={{flexDirection: 'row', alignItems: 'center'}}>
        //     <TextInput
        //       style={styles.input}
        //       placeholder="Write comment here..."
        //       value={commentText}
        //       onChangeText={text => setCommentText(text)}
        //     />
        //     <Button title="Send" onPress={handlePostComment} />
        //   </View>
        // )}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          marginHorizontal: 16,
        }}>
        <TextInput
          style={styles.input}
          placeholder="Write comment here..."
          value={commentText}
          onChangeText={text => setCommentText(text)}
        />
        <Button title="Send" onPress={handlePostComment} />
      </View>
      {screen === screens.post && isLoading ? <CustomLoader /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  viewContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  centerContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    marginRight: 5,
    paddingHorizontal: 8,
  },
});

export default PostDetails;
