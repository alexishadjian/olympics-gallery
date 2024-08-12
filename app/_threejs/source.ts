const images = require.context('@/public/images/gallery', true);
const imageList = images.keys().map((path: string, i: number) => {
    return {
        name: 'image' + i,
        type: 'texture',
        path: '/images/gallery/' + path.replace('./', '')
    }
})

export default imageList;