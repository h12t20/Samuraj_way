import {profile_reducer, initialState} from "./profile_reducer";

const newPost = {
    id: 5,
    message: 'some text',
    likesCount: 0
}
const newPosts = profile_reducer(initialState,
    {
        type: 'PROFILE/ADD_POST',
        newPost: 'some text'
    })
const afterDeletePost = profile_reducer(initialState,
    {
        type: 'PROFILE/DELETE_POST',
        id: 4
    })
test('addPostTest', () => {
    expect(newPosts)
        .toStrictEqual({
            ...initialState,
            postsData: [...initialState.postsData, newPost]
        })
    expect(newPosts.postsData.length).toBe(5)
    expect(newPosts.postsData[4].message).toBe('some text')

})
test('deletePostTest', () => {
    expect(afterDeletePost.postsData.length).toBe(3)
    expect(afterDeletePost.postsData[0].message).toBe('Hi! How are you?!')
})