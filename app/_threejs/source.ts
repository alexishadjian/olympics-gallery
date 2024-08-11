const images = require.context('@/public/gallery-img', true);
const imageList = images.keys().map((path: string, i: number) => {
    return {
        name: 'image' + i,
        type: 'texture',
        path: '/gallery-img/' + path.replace('./', '')
    }
})

export default imageList;