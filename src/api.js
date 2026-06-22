const BASE = 'https://jsonplaceholder.typicode.com'

export async function downloadPosts(page = 1) {
    const res = await fetch(`${BASE}/posts?_page=${page}`)
    if (!res.ok) throw new Error('Failed to fetch posts')
    return res.json()
}

export async function downloadComments(postId) {
    const res = await fetch(`${BASE}/posts/${postId}/comments`)
    if (!res.ok) throw new Error('Failed to fetch comments')
    return res.json()
}

export async function getUserName(userId) {
    const res = await fetch(`${BASE}/users/${userId}`)
    if (!res.ok) throw new Error('Failed to fetch user')
    const data = await res.json()
    return data.name
}
